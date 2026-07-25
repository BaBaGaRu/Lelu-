/**
 * ==========================================================
 * LÉLU
 * KNOWLEDGE PROVIDERS
 * ==========================================================
 */

import type { KnowledgeProvider, KnowledgeProviderResult } from "./KnowledgeProvider";

const buildResult = (source: string, title: string, query: string): KnowledgeProviderResult => ({
  title,
  url: `https://${source}.example/${encodeURIComponent(query)}`,
  summary: `Knowledge from ${source} for ${query}`,
  source,
  timestamp: Date.now(),
});

export const wikipediaProvider: KnowledgeProvider = {
  id: "wikipedia",
  name: "Wikipedia",
  description: "Wikipedia reference search",
  enabled: true,
  async search(query: string) {
    return [buildResult("wikipedia", `Wikipedia: ${query}`, query)];
  },
};

export const wikidataProvider: KnowledgeProvider = {
  id: "wikidata",
  name: "Wikidata",
  description: "Structured facts",
  enabled: true,
  async search(query: string) {
    return [buildResult("wikidata", `Wikidata: ${query}`, query)];
  },
};

export const wiktionaryProvider: KnowledgeProvider = {
  id: "wiktionary",
  name: "Wiktionary",
  description: "Definitions and etymology",
  enabled: true,
  async search(query: string) {
    return [buildResult("wiktionary", `Wiktionary: ${query}`, query)];
  },
};

export const wikiquoteProvider: KnowledgeProvider = {
  id: "wikiquote",
  name: "Wikiquote",
  description: "Quotations",
  enabled: true,
  async search(query: string) {
    return [buildResult("wikiquote", `Wikiquote: ${query}`, query)];
  },
};

export const wikimediaCommonsProvider: KnowledgeProvider = {
  id: "wikimedia-commons",
  name: "Wikimedia Commons",
  description: "Media references",
  enabled: true,
  async search(query: string) {
    return [buildResult("wikimedia-commons", `Wikimedia Commons: ${query}`, query)];
  },
};

export const rssProvider: KnowledgeProvider = {
  id: "rss",
  name: "RSS",
  description: "Recent feed content",
  enabled: true,
  async search(query: string) {
    return [buildResult("rss", `RSS: ${query}`, query)];
  },
};

export const arxivProvider: KnowledgeProvider = {
  id: "arxiv",
  name: "arXiv",
  description: "Academic papers",
  enabled: true,
  async search(query: string) {
    return [buildResult("arxiv", `arXiv: ${query}`, query)];
  },
};

export const crossrefProvider: KnowledgeProvider = {
  id: "crossref",
  name: "Crossref",
  description: "Academic metadata",
  enabled: true,
  async search(query: string) {
    return [buildResult("crossref", `Crossref: ${query}`, query)];
  },
};

export const openStreetMapProvider: KnowledgeProvider = {
  id: "openstreetmap",
  name: "OpenStreetMap",
  description: "Geographic context",
  enabled: true,
  async search(query: string) {
    return [buildResult("openstreetmap", `OpenStreetMap: ${query}`, query)];
  },
};

export const nominatimProvider: KnowledgeProvider = {
  id: "nominatim",
  name: "Nominatim",
  description: "Geocoding",
  enabled: true,
  async search(query: string) {
    return [buildResult("nominatim", `Nominatim: ${query}`, query)];
  },
};

export const overpassProvider: KnowledgeProvider = {
  id: "overpass",
  name: "Overpass",
  description: "Map data queries",
  enabled: true,
  async search(query: string) {
    return [buildResult("overpass", `Overpass: ${query}`, query)];
  },
};
