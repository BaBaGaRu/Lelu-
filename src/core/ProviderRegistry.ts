/**
 * ==========================================================
 * LÉLU
 * PROVIDER REGISTRY
 * ==========================================================
 */

import type Provider from "../providers/Provider";

export default class ProviderRegistry {
  private readonly providers = new Map<string, Provider>();

  register(provider: Provider): void {
    if (this.providers.has(provider.name)) {
      console.warn(`[ProviderRegistry] Provider "${provider.name}" is already registered. Overwriting.`);
    }

    this.providers.set(provider.name, provider);
  }

  registerMany(providers: Provider[]): void {
    for (const provider of providers) {
      this.register(provider);
    }
  }

  unregister(name: string): boolean {
    return this.providers.delete(name);
  }

  get(name: string): Provider | undefined {
    return this.providers.get(name);
  }

  require(name: string): Provider {
    const provider = this.providers.get(name);

    if (!provider) {
      throw new Error(`Provider "${name}" is not registered.`);
    }

    return provider;
  }

  all(): Provider[] {
    return [...this.providers.values()];
  }

  names(): string[] {
    return [...this.providers.keys()];
  }

  has(name: string): boolean {
    return this.providers.has(name);
  }

  clear(): void {
    this.providers.clear();
  }

  get size(): number {
    return this.providers.size;
  }
}