/**
 * ==========================================================
 * LÉLU
 * MEMORY SYSTEM
 * ==========================================================
 */

import appLog from "./APIEventLog";

export interface MemoryEntry {
  id: string;
  text: string;
  createdAt: string;
  source: "local" | "supabase";
  classification: "short-term" | "long-term" | "episodic" | "semantic";
  category: "conversation" | "observation" | "project" | "goal" | "relationship" | "setting" | "other";
}

export interface MemorySnapshot {
  local: MemoryEntry[];
  supabase: MemoryEntry[];
}

export default class MemorySystem {
  private readonly localEntries: MemoryEntry[] = [];
  private readonly supabaseEntries: MemoryEntry[] = [];
  private readonly storageKey = "lelu-memory";

  constructor(private readonly supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? "") {
    this.load();
  }

  async extract(message: string): Promise<MemoryEntry[]> {
    const text = message.trim();
    if (!text) return [];

    const category = this.inferCategory(text);
    const entry = this.createEntry(text, category);
    this.localEntries.push(entry);
    this.localEntries.splice(0, Math.max(0, this.localEntries.length - 100));
    this.persist();

    appLog.append({
      type: "memory",
      provider: "memory",
      message: "Stored memory",
      data: { category, text },
    });

    await this.syncToSupabase(entry);
    return [entry];
  }

  async saveConversation(text: string): Promise<MemoryEntry> {
    const entries = await this.extract(`[conversation] ${text}`);
    return entries[0] ?? this.createEntry(`[conversation] ${text}`, "conversation");
  }

  async saveObservation(text: string): Promise<MemoryEntry> {
    const entries = await this.extract(`[observation] ${text}`);
    return entries[0] ?? this.createEntry(`[observation] ${text}`, "observation");
  }

  async saveProject(text: string): Promise<MemoryEntry> {
    const entries = await this.extract(`[project] ${text}`);
    return entries[0] ?? this.createEntry(`[project] ${text}`, "project");
  }

  async saveGoal(text: string): Promise<MemoryEntry> {
    const entries = await this.extract(`[goal] ${text}`);
    return entries[0] ?? this.createEntry(`[goal] ${text}`, "goal");
  }

  async saveRelationship(text: string): Promise<MemoryEntry> {
    const entries = await this.extract(`[relationship] ${text}`);
    return entries[0] ?? this.createEntry(`[relationship] ${text}`, "relationship");
  }

  async saveSetting(key: string, value: string): Promise<MemoryEntry> {
    const entries = await this.extract(`[setting] ${key}=${value}`);
    return entries[0] ?? this.createEntry(`[setting] ${key}=${value}`, "setting");
  }

  async updateEntry(id: string, text: string): Promise<MemoryEntry | null> {
    const localIndex = this.localEntries.findIndex((entry) => entry.id === id);
    if (localIndex >= 0) {
      this.localEntries[localIndex] = { ...this.localEntries[localIndex], text, createdAt: new Date().toISOString() };
      this.persist();
      return this.localEntries[localIndex];
    }
    return null;
  }

  all(): MemoryEntry[] {
    return [...this.localEntries].slice(-50);
  }

  getByCategory(category: MemoryEntry["category"]): MemoryEntry[] {
    return this.localEntries.filter((entry) => entry.category === category);
  }

  classify(text: string): MemoryEntry["classification"] {
    const lowered = text.toLowerCase();
    if (/remember|important|note|plan|goal|project|relationship|setting/i.test(lowered)) {
      return "long-term";
    }
    if (/today|yesterday|last time|just now|meeting|conversation/i.test(lowered)) {
      return "episodic";
    }
    return "short-term";
  }

  snapshot(): MemorySnapshot {
    return {
      local: [...this.localEntries].slice(-10),
      supabase: [...this.supabaseEntries].slice(-10),
    };
  }

  private createEntry(text: string, category: MemoryEntry["category"]): MemoryEntry {
    return {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      text,
      createdAt: new Date().toISOString(),
      source: "local",
      classification: this.classify(text),
      category,
    };
  }

  private inferCategory(text: string): MemoryEntry["category"] {
    const lowered = text.toLowerCase();
    if (lowered.includes("project")) return "project";
    if (lowered.includes("goal")) return "goal";
    if (lowered.includes("relationship")) return "relationship";
    if (lowered.includes("setting") || lowered.includes("config") || lowered.includes("preference")) return "setting";
    if (lowered.includes("observe") || lowered.includes("observation") || lowered.includes("noticed")) return "observation";
    if (lowered.includes("conversation") || lowered.includes("chat")) return "conversation";
    return "other";
  }

  private persist(): void {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(this.storageKey, JSON.stringify(this.localEntries));
  }

  private load(): void {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(this.storageKey);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as MemoryEntry[];
      if (Array.isArray(parsed)) {
        this.localEntries.push(...parsed);
      }
    }
    catch {
      appLog.append({
        type: "warning",
        provider: "memory",
        message: "Unable to parse local memory store",
      });
    }
  }

  private async syncToSupabase(entry: MemoryEntry): Promise<void> {
    if (!this.supabaseUrl) {
      return;
    }

    try {
      const response = await fetch(`${this.supabaseUrl}/rest/v1/memory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY ?? ""}`,
        },
        body: JSON.stringify(entry),
      });
      if (response.ok) {
        this.supabaseEntries.push({ ...entry, source: "supabase" });
        appLog.append({
          type: "memory",
          provider: "supabase",
          message: "Synced memory to Supabase",
          data: { id: entry.id },
        });
      }
    }
    catch (error) {
      appLog.append({
        type: "warning",
        provider: "supabase",
        message: error instanceof Error ? error.message : "Memory sync failed",
      });
    }
  }
}
