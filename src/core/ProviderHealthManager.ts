/**
 * ==========================================================
 * LÉLU
 * PROVIDER HEALTH MANAGER
 * ==========================================================
 */

import type { AIProvider } from "./ProviderRegistry";

export type ProviderHealthState =
  | "online"
  | "offline"
  | "busy"
  | "disabled"
  | "initializing"
  | "recovering"
  | "error";

export interface ProviderHealthSnapshot {
  provider: AIProvider;
  state: ProviderHealthState;
  latency: number;
  tokenUsage: number;
  requestCount: number;
  errorCount: number;
  uptime: number;
  lastSuccessfulResponse: number | null;
  queueSize: number;
  currentModel: string;
}

export default class ProviderHealthManager {
  private readonly statuses = new Map<AIProvider, ProviderHealthSnapshot>();

  initialize(providers: AIProvider[], currentModel: string): void {
    providers.forEach((provider) => {
      this.statuses.set(provider, {
        provider,
        state: "initializing",
        latency: 0,
        tokenUsage: 0,
        requestCount: 0,
        errorCount: 0,
        uptime: 0,
        lastSuccessfulResponse: null,
        queueSize: 0,
        currentModel,
      });
    });
  }

  markOnline(provider: AIProvider, latency: number, model: string): void {
    this.update(provider, {
      state: "online",
      latency,
      currentModel: model,
    });
  }

  markOffline(provider: AIProvider): void {
    this.update(provider, {
      state: "offline",
    });
  }

  markBusy(provider: AIProvider): void {
    this.update(provider, {
      state: "busy",
    });
  }

  markDisabled(provider: AIProvider): void {
    this.update(provider, {
      state: "disabled",
    });
  }

  markRecovering(provider: AIProvider): void {
    this.update(provider, {
      state: "recovering",
    });
  }

  markError(provider: AIProvider, errorCount: number): void {
    this.update(provider, {
      state: "error",
      errorCount,
    });
  }

  markSuccess(provider: AIProvider, latency: number, tokens: number): void {
    this.update(provider, {
      state: "online",
      latency,
      tokenUsage: tokens,
      lastSuccessfulResponse: Date.now(),
      requestCount: this.get(provider).requestCount + 1,
    });
  }

  setQueueSize(provider: AIProvider, queueSize: number): void {
    this.update(provider, {
      queueSize,
    });
  }

  get(provider: AIProvider): ProviderHealthSnapshot {
    return this.statuses.get(provider) ?? {
      provider,
      state: "offline",
      latency: 0,
      tokenUsage: 0,
      requestCount: 0,
      errorCount: 0,
      uptime: 0,
      lastSuccessfulResponse: null,
      queueSize: 0,
      currentModel: "",
    };
  }

  snapshot(): ProviderHealthSnapshot[] {
    return Array.from(this.statuses.values());
  }

  private update(provider: AIProvider, patch: Partial<ProviderHealthSnapshot>): void {
    const current = this.get(provider);
    this.statuses.set(provider, {
      ...current,
      ...patch,
    });
  }
}
