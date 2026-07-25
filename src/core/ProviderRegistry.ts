/**
 * ==========================================================
 * LÉLU
 * PROVIDER REGISTRY
 * ==========================================================
 */

import AIConfig from "./AIConfig";

export type AIProvider =
  | "groq"
  | "google"
  | "openrouter"
  | "cerebras"
  | "mistral"
  | "fireworks";

export interface ProviderEntry {
  id: AIProvider;
  name: string;
  enabled: boolean;
  priority: number;
  streaming: boolean;
}

export default class ProviderRegistry {
  private readonly providers: AIProvider[] = [
    "groq",
    "google",
    "openrouter",
    "cerebras",
    "mistral",
    "fireworks",
  ];

  constructor(
    private readonly config = new AIConfig(),
  ) {}

  all(): AIProvider[] {
    return this.providers;
  }

  enabled(): AIProvider[] {
    return this.providers.filter((provider) => this.isEnabled(provider));
  }

  ordered(): AIProvider[] {
    return [...this.enabled()].sort((left, right) => {
      const leftConfig = this.config.providers[left];
      const rightConfig = this.config.providers[right];
      return leftConfig.priority - rightConfig.priority;
    });
  }

  select(_input: string): AIProvider {
    const ordered = this.ordered();
    return ordered[0] ?? "groq";
  }

  fallback(current: AIProvider): AIProvider {
    const ordered = this.ordered();
    const index = ordered.indexOf(current);

    if (index < 0) {
      return ordered[0] ?? "groq";
    }

    return ordered[(index + 1) % ordered.length] ?? ordered[0] ?? "groq";
  }

  getConfig(provider: AIProvider) {
    return this.config.providers[provider];
  }

  isEnabled(provider: AIProvider): boolean {
    return this.getConfig(provider).enabled;
  }

  list(): ProviderEntry[] {
    return this.ordered().map((provider) => ({
      id: provider,
      name: this.getConfig(provider).name,
      enabled: this.isEnabled(provider),
      priority: this.getConfig(provider).priority,
      streaming: this.getConfig(provider).streaming,
    }));
  }
}
