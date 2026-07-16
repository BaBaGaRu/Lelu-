/**
 * ==========================================================
 * LÉLU
 * AI PROVIDER REGISTRY
 * ==========================================================
 */

import type AIProvider from "../../providers/AIProvider";

export default class AIProviderRegistry {
  private readonly providers = new Map<string, AIProvider>();

  register(provider: AIProvider): void {
    if (this.providers.has(provider.name)) {
      console.warn(
        `[AIProviderRegistry] Provider "${provider.name}" is already registered. Overwriting.`,
      );
    }

    this.providers.set(provider.name, provider);
  }

  registerMany(providers: AIProvider[]): void {
    for (const provider of providers) {
      this.register(provider);
    }
  }

  unregister(name: string): boolean {
    return this.providers.delete(name);
  }

  get(name: string): AIProvider | undefined {
    return this.providers.get(name);
  }

  require(name: string): AIProvider {
    const provider = this.providers.get(name);

    if (!provider) {
      throw new Error(
        `AI Provider "${name}" is not registered.`,
      );
    }

    return provider;
  }

  has(name: string): boolean {
    return this.providers.has(name);
  }

  all(): AIProvider[] {
    return [...this.providers.values()];
  }

  names(): string[] {
    return [...this.providers.keys()];
  }

  clear(): void {
    this.providers.clear();
  }

  get size(): number {
    return this.providers.size;
  }
}