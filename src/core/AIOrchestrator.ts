/**
 * ==========================================================
 * LÉLU
 * AI ORCHESTRATOR
 * ==========================================================
 */

import { type AIProvider, default as ProviderRegistry } from "./ProviderRegistry";
import ProviderHealthManager from "./ProviderHealthManager";
import appLog from "./APIEventLog";
import AIRouter from "./AIRouter";
import MemorySystem from "./MemorySystem";
import KnowledgeRegistry from "./KnowledgeProvider";
import {
  arxivProvider,
  crossrefProvider,
  nominatimProvider,
  openStreetMapProvider,
  overpassProvider,
  rssProvider,
  wikipediaProvider,
  wikidataProvider,
  wikiquoteProvider,
  wikimediaCommonsProvider,
  wiktionaryProvider,
} from "./KnowledgeProviders";

export interface OrchestratorNotification {
  type: "info" | "warning" | "error";
  message: string;
  provider?: AIProvider;
}

export interface OrchestratorRuntimeState {
  activeProvider: AIProvider | null;
  currentRequestId: string | null;
  paused: boolean;
  queueSize: number;
  notifications: OrchestratorNotification[];
  recentRequests: string[];
  recentResponses: string[];
  recentErrors: string[];
  failoverEvents: string[];
  switchHistory: Array<{ from: AIProvider | null; to: AIProvider }>;
}

interface OrchestratorQueueEntry {
  requestId: string;
  request: string;
  controller: AbortController;
  resolve: (value: string) => void;
  reject: (reason?: any) => void;
  canceled: boolean;
  task: () => Promise<string>;
}

export default class AIOrchestrator {
  private readonly registry = new ProviderRegistry();
  private readonly router = new AIRouter();
  private readonly health = new ProviderHealthManager();
  private readonly memory = new MemorySystem();
  private readonly knowledge = new KnowledgeRegistry();
  private queue: OrchestratorQueueEntry[] = [];
  private running = false;
  private paused = false;
  private activeProvider: AIProvider | null = null;
  private activeItem: OrchestratorQueueEntry | null = null;
  private currentRequestId: string | null = null;
  private readonly notifications: OrchestratorNotification[] = [];
  private readonly recentRequests: string[] = [];
  private readonly recentResponses: string[] = [];
  private readonly recentErrors: string[] = [];
  private readonly failoverEvents: string[] = [];
  private readonly switchHistory: Array<{ from: AIProvider | null; to: AIProvider }> = [];

  constructor() {
    const providers = this.registry.all();
    this.health.initialize(providers, "gpt-4o-mini");

    [
      wikipediaProvider,
      wikidataProvider,
      wiktionaryProvider,
      wikiquoteProvider,
      wikimediaCommonsProvider,
      rssProvider,
      arxivProvider,
      crossrefProvider,
      openStreetMapProvider,
      nominatimProvider,
      overpassProvider,
    ].forEach((provider) => this.knowledge.register(provider));
  }

  async initialize(): Promise<void> {
    appLog.append({
      type: "startup",
      provider: "orchestrator",
      message: "AI orchestrator initialized",
    });

    this.registry.ordered().forEach((provider) => {
      this.health.markOnline(provider, 0, this.registry.getConfig(provider).model);
      appLog.append({
        type: "health-change",
        provider,
        message: "Provider initialized",
      });
    });
  }

  async process(input: string, requestId?: string): Promise<string> {
    const id = requestId ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const request = this.normalize(input);
    this.recentRequests.push(request);
    if (this.recentRequests.length > 20) {
      this.recentRequests.shift();
    }

    return await this.enqueue(request, id);
  }

  pause(): void {
    this.paused = true;
    if (this.activeItem) {
      this.activeItem.controller.abort();
    }
    this.notify("Orchestrator paused", "info");
  }

  resume(): void {
    if (!this.paused) return;
    this.paused = false;
    this.notify("Orchestrator resumed", "info");
    if (!this.running && this.queue.length > 0) {
      void this.drainQueue();
    }
  }

  cancel(requestId: string): void {
    const queued = this.queue.find((entry) => entry.requestId === requestId);
    if (queued) {
      queued.canceled = true;
      queued.controller.abort();
      queued.reject(new Error("Request canceled"));
      this.queue = this.queue.filter((entry) => entry.requestId !== requestId);
      this.notify(`Canceled queued request ${requestId}`);
    }

    if (this.activeItem?.requestId === requestId) {
      this.activeItem.canceled = true;
      this.activeItem.controller.abort();
      this.notify(`Canceled active request ${requestId}`);
    }
  }

  stopCurrent(): void {
    if (this.activeItem) {
      this.activeItem.canceled = true;
      this.activeItem.controller.abort();
      this.notify("Stopped current request", "info");
    }
  }

  getRuntimeState(): OrchestratorRuntimeState {
    return {
      activeProvider: this.activeProvider,
      currentRequestId: this.currentRequestId,
      paused: this.paused,
      queueSize: this.queue.length,
      notifications: [...this.notifications].slice(-10),
      recentRequests: [...this.recentRequests].slice(-10),
      recentResponses: [...this.recentResponses].slice(-10),
      recentErrors: [...this.recentErrors].slice(-10),
      failoverEvents: [...this.failoverEvents].slice(-10),
      switchHistory: [...this.switchHistory].slice(-10),
    };
  }

  getHealthSnapshot() {
    return this.health.snapshot();
  }

  getLogHistory() {
    return appLog.all();
  }

  notify(message: string, type: OrchestratorNotification["type"] = "info", provider?: AIProvider): void {
    this.notifications.push({ type, message, provider });
    if (this.notifications.length > 20) {
      this.notifications.shift();
    }
    appLog.append({
      type: "notification",
      provider: provider ?? "orchestrator",
      message,
    });
  }

  private normalize(input: string): string {
    return input.trim();
  }

  private async enqueue(request: string, requestId: string): Promise<string> {
    return await new Promise<string>((resolve, reject) => {
      const controller = new AbortController();
      const entry: OrchestratorQueueEntry = {
        requestId,
        request,
        controller,
        resolve,
        reject,
        canceled: false,
        task: async () => {
          try {
            this.currentRequestId = requestId;
            this.activeItem = entry;
            const response = await this.executeWithFallback(request, requestId, controller.signal);
            if (entry.canceled) {
              throw new Error("Request canceled");
            }
            resolve(response);
            return response;
          }
          catch (error) {
            const message = error instanceof Error ? error.message : "Unknown error";
            this.recentErrors.push(message);
            reject(error);
            throw error;
          }
          finally {
            if (this.activeItem === entry) {
              this.activeItem = null;
              this.currentRequestId = null;
            }
          }
        },
      };

      this.queue.push(entry);
      if (!this.running && !this.paused) {
        this.running = true;
        void this.drainQueue();
      }
    });
  }

  private async drainQueue(): Promise<void> {
    while (this.queue.length > 0) {
      if (this.paused) {
        this.running = false;
        return;
      }
      const entry = this.queue.shift();
      if (!entry || entry.canceled) {
        continue;
      }
      await entry.task();
    }

    this.running = false;
  }

  private async executeWithFallback(request: string, requestId: string, signal: AbortSignal): Promise<string> {
    const intent = this.router.route(request);
    const providers = this.registry.ordered().filter((provider) => this.registry.getConfig(provider).enabled);
    const attempted = new Set<AIProvider>();

    if (providers.length === 0) {
      appLog.append({
        type: "warning",
        provider: "orchestrator",
        message: "No enabled providers available",
      });
      return this.fallbackReply(request);
    }

    let provider = providers[0] ?? "groq";
    let lastError: unknown;

    while (!attempted.has(provider)) {
      if (signal.aborted) {
        throw new Error("Request aborted");
      }

      attempted.add(provider);
      this.health.setQueueSize(provider, this.queue.length);
      this.activeProvider = provider;
      this.health.markBusy(provider);
      appLog.append({
        type: "request",
        provider,
        message: `Request ${requestId} dispatched`,
        data: { intent },
      });

      try {
        const prompt = await this.composePrompt(request, intent);
        const response = await this.callProvider(provider, prompt, signal);
        this.recentResponses.push(response);
        if (this.recentResponses.length > 20) {
          this.recentResponses.shift();
        }
        this.health.markSuccess(provider, 20, Math.max(50, response.length));
        appLog.append({
          type: "response",
          provider,
          message: "Provider succeeded",
          data: { requestId, responseLength: response.length },
        });
        this.notify(`Provider ${provider} completed the request.`, "info", provider);
        await this.memory.extract(`${request} | ${response}`);
        return response;
      }
      catch (error) {
        if (signal.aborted) {
          const abortedError = new Error("Request aborted");
          appLog.append({ type: "info", provider, message: abortedError.message });
          throw abortedError;
        }

        lastError = error;
        const message = error instanceof Error ? error.message : "Provider failed";
        this.recentErrors.push(message);
        this.health.markError(provider, this.health.get(provider).errorCount + 1);
        appLog.append({
          type: "error",
          provider,
          message,
        });
        this.notify(`Provider ${provider} failed; switching provider.`, "warning", provider);
        this.failoverEvents.push(`${provider} -> failover`);
        appLog.append({
          type: "failover",
          provider,
          message: "Provider failover triggered",
        });
        const nextProvider = this.registry.fallback(provider);
        if (!providers.includes(nextProvider)) {
          throw error;
        }
        this.switchHistory.push({ from: provider, to: nextProvider });
        appLog.append({
          type: "provider-switch",
          provider: nextProvider,
          message: `Switched from ${provider} to ${nextProvider}`,
        });
        this.notify(`Switched to ${nextProvider}.`, "info", nextProvider);
        provider = nextProvider;
      }
    }

    return this.fallbackReply(request, lastError);
  }

  private async composePrompt(request: string, intent: string): Promise<string> {
    const memorySnapshot = this.memory.snapshot();
    const memoryContext = [...memorySnapshot.local, ...memorySnapshot.supabase]
      .slice(-8)
      .map((entry) => entry.text)
      .join(" | ");

    const knowledgeResults = await this.knowledge.search(request);
    const knowledgeContext = knowledgeResults
      .slice(0, 4)
      .map((result) => `${result.source}: ${result.summary}`)
      .join(" | ");

    appLog.append({
      type: "knowledge",
      provider: this.activeProvider ?? "orchestrator",
      message: "Knowledge context assembled",
      data: { intent, resultCount: knowledgeResults.length },
    });

    return [
      `Intent: ${intent}`,
      memoryContext ? `Memory: ${memoryContext}` : "",
      knowledgeContext ? `Knowledge: ${knowledgeContext}` : "",
      `User: ${request}`,
      "Answer clearly and concisely.",
    ].filter(Boolean).join("\n");
  }

  private createAbortSignal(primary: AbortSignal, secondary: AbortSignal): AbortSignal {
    if (primary.aborted) {
      return primary;
    }

    if (secondary.aborted) {
      return secondary;
    }

    const controller = new AbortController();
    const onAbort = () => controller.abort();
    primary.addEventListener("abort", onAbort);
    secondary.addEventListener("abort", onAbort);
    controller.signal.addEventListener("abort", () => {
      primary.removeEventListener("abort", onAbort);
      secondary.removeEventListener("abort", onAbort);
    });

    return controller.signal;
  }

  private async callProvider(provider: AIProvider, request: string, signal: AbortSignal): Promise<string> {
    const config = this.registry.getConfig(provider);
    if (!config.apiKey) {
      throw new Error(`${provider} is not configured.`);
    }

    const startedAt = Date.now();
    const timeoutController = new AbortController();
    const timeoutId = globalThis.setTimeout(() => timeoutController.abort(), config.timeout);
    const combinedSignal = this.createAbortSignal(signal, timeoutController.signal);

    try {
      const payload = provider === "google"
        ? {
            contents: [{ parts: [{ text: request }] }],
          }
        : {
            model: config.model,
            messages: [{ role: "user", content: request }],
          };

      const response = await fetch(
        provider === "google"
          ? `${config.endpoint}/${config.model}:generateContent?key=${config.apiKey}`
          : config.endpoint,
        {
          method: "POST",
          signal: combinedSignal,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config.apiKey}`,
          },
          body: JSON.stringify(payload),
        },
      );

      const latency = Date.now() - startedAt;
      appLog.append({
        type: "latency",
        provider,
        message: "Provider latency recorded",
        data: { latency },
      });

      if (!response.ok) {
        const message = response.status === 429 ? "provider rate limit reached" : `provider returned ${response.status}`;
        throw new Error(`${provider} request failed: ${message}`);
      }

      const json = await response.json();
      const text = provider === "google"
        ? json.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response."
        : json.choices?.[0]?.message?.content ?? "No response.";
      this.health.markOnline(provider, latency, config.model);
      appLog.append({
        type: "response",
        provider,
        message: "Provider responded",
        data: { latency, tokenEstimate: Math.max(16, text.length) },
      });
      return text;
    }
    catch (error) {
      const message = error instanceof Error ? error.message : "Provider failed";
      this.health.markError(provider, this.health.get(provider).errorCount + 1);
      appLog.append({
        type: error instanceof DOMException && error.name === "AbortError" ? "timeout" : "error",
        provider,
        message,
      });
      throw error;
    }
    finally {
      clearTimeout(timeoutId);
    }
  }

  private fallbackReply(request: string, error?: unknown): string {
    const message = error instanceof Error ? error.message : "Provider unavailable";
    appLog.append({
      type: "warning",
      provider: "orchestrator",
      message: `Using local fallback: ${message}`,
    });
    const normalized = request.toLowerCase();
    if (normalized.includes("hello") || normalized.includes("hi")) {
      return "Hello. I’m operating locally while the provider layer recovers.";
    }
    if (normalized.includes("remember") || normalized.includes("note")) {
      return "I’ll keep that in memory and continue the workflow locally.";
    }
    return `I’m continuing with a local fallback response because the provider stack is temporarily unavailable. ${request}`;
  }
}
