import type Provider from "../providers/Provider";
import type { KnowledgeResult } from "../providers/Provider";

export interface KnowledgeProvider extends Provider {
  canHandle?(query: string): boolean;
}

export class KnowledgeRouter {
  private providers: KnowledgeProvider[] = [];

  register(provider: KnowledgeProvider): void {
    this.providers.push(provider);
  }

  unregister(name: string): void {
    this.providers = this.providers.filter(
      provider => provider.name !== name,
    );
  }

  getProviders(): string[] {
    return this.providers.map(provider => provider.name);
  }

  async search(query: string): Promise<KnowledgeResult[]> {
    const matches = this.providers.filter(provider =>
      provider.canHandle?.(query) ?? provider.canSearch(query),
    );

    if (matches.length === 0) {
      return [];
    }

    const responses = await Promise.all(
      matches.map(provider => provider.search(query)),
    );

    return responses.flat().sort((a, b) => b.confidence - a.confidence);
  }
}