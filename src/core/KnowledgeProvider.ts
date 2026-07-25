/**
 * ==========================================================
 * LÉLU
 * KNOWLEDGE PROVIDER
 * ==========================================================
 */

export interface KnowledgeProviderResult {
  title: string;
  url: string;
  summary: string;
  source: string;
  timestamp: number;
}

export interface KnowledgeProvider {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  search(query: string): Promise<KnowledgeProviderResult[]>;
}

export interface KnowledgeProviderConfig {
  enabled: boolean;
}

export default class KnowledgeRegistry {
  private readonly providers: KnowledgeProvider[] = [];

  register(provider: KnowledgeProvider): void {
    this.providers.push(provider);
  }

  async search(query: string): Promise<KnowledgeProviderResult[]> {
    const results: KnowledgeProviderResult[] = [];

    for (const provider of this.providers) {
      if (!provider.enabled) continue;
      try {
        results.push(...await provider.search(query));
      }
      catch {
        // ignore provider-specific failures and continue
      }
    }

    return results;
  }
}
