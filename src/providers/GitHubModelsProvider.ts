/**
 * ==========================================================
 * LÉLU
 * GITHUB MODELS PROVIDER
 * ==========================================================
 */

import type AIProvider from "./AIProvider";
import type { AIRequest, AIResponse, AIProviderHealth } from "./AIProvider";

export default class GitHubModelsProvider implements AIProvider {
  readonly name = "GitHub Models";
  readonly priority = 0;
  readonly enabled = true;
  readonly timeout = 30000;
  readonly requiresApiKey = true;
  readonly capabilities = ["chat", "reasoning", "fast", "memory"] as const;

  private apiKey = "";
  private model = "gpt-4o-mini";
  private initialized = false;

  async initialize(): Promise<void> {
    const runtimeEnv = (globalThis as typeof globalThis & {
      __LELU_GITHUB_TOKEN__?: string;
      __LELU_GITHUB_MODEL__?: string;
    });

    this.apiKey =
      import.meta.env.VITE_GITHUB_TOKEN?.trim() ||
      runtimeEnv.__LELU_GITHUB_TOKEN__ ||
      (typeof window !== "undefined" ? (window as Window & { __LELU_GITHUB_TOKEN__?: string }).__LELU_GITHUB_TOKEN__ : "") ||
      (typeof process !== "undefined" && process.env?.GITHUB_TOKEN?.trim()) ||
      (typeof process !== "undefined" && process.env?.GITHUB_CODESPACE_TOKEN?.trim()) ||
      "";

    this.model =
      import.meta.env.VITE_GITHUB_MODEL?.trim() ||
      runtimeEnv.__LELU_GITHUB_MODEL__ ||
      "gpt-4o-mini";

    this.initialized = true;
  }

  async isAvailable(): Promise<boolean> {
    return this.initialized;
  }

  async health(): Promise<AIProviderHealth> {
    return {
      available: await this.isAvailable(),
      initialized: this.initialized,
      lastChecked: Date.now(),
      lastError: this.initialized ? undefined : "GitHub provider not initialized",
    };
  }

  canHandle(_input: string): boolean {
    return true;
  }

  async generate(request: AIRequest): Promise<AIResponse> {
    const started = Date.now();

    if (!this.apiKey) {
      return this.buildFallbackResponse(request, "GitHub Models token missing.", started);
    }

    const payload = {
      model: this.model,
      messages: [
        {
          role: "system",
          content: `You are Lélu. You are calm, creative, engineering-focused, and a personal AI companion. Keep concise and helpful.`,
        },
        ...(request.context ? [{ role: "system", content: `Memory context:\n${request.context}` }] : []),
        ...(request.messages ?? []),
        { role: "user", content: request.prompt },
      ],
      temperature: request.temperature ?? 0.7,
    };

    const endpoint = import.meta.env.VITE_AI_PROXY_BASE_URL || "/api/ai/chat/completions";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      const raw = await response.text();
      let data: any = null;
      try {
        data = JSON.parse(raw);
      } catch {
        data = null;
      }

      if (!response.ok) {
        console.warn("GitHub Models request failed; using fallback response.", data?.error?.message ?? raw);
        return this.buildFallbackResponse(request, data?.error?.message ?? raw, started);
      }

      const content = data?.choices?.[0]?.message?.content ?? "";
      if (!content) {
        return this.buildFallbackResponse(request, "GitHub Models returned no content.", started);
      }

      return {
        text: content,
        provider: this.name,
        model: this.model,
        processingTime: Date.now() - started,
      };
    } catch (error) {
      console.warn("GitHub Models request threw; using fallback response.", error);
      return this.buildFallbackResponse(request, error instanceof Error ? error.message : String(error), started);
    }
  }

  private buildFallbackResponse(request: AIRequest, _reason: string, started: number): AIResponse {
    const prompt = request.prompt?.trim() ?? "";
    const lower = prompt.toLowerCase();

    let text = "Hello! I’m Lélu, and I’m ready to help. The live model connection is unavailable right now, so I’m responding with a local fallback.";

    if (lower.includes("hello") || lower.includes("hi")) {
      text = "Hello! I’m Lélu, and I’m here with you.";
    } else if (lower.includes("what is your name") || lower.includes("who are you")) {
      text = "I’m Lélu, your personal companion.";
    } else if (lower.includes("weather") || lower.includes("time")) {
      text = "I can help with that, but the live model is currently unavailable.";
    }

    return {
      text,
      provider: "Local fallback",
      model: "local-fallback",
      processingTime: Date.now() - started,
    };
  }

  async shutdown(): Promise<void> {
    this.initialized = false;
  }
}
