/**
 * ==========================================================
 * LÉLU
 * API EVENT LOG
 * ==========================================================
 */

export type ApiLogEventType =
  | "startup"
  | "shutdown"
  | "request"
  | "response"
  | "error"
  | "warning"
  | "failover"
  | "provider-switch"
  | "token-usage"
  | "latency"
  | "timeout"
  | "rate-limit"
  | "health-change"
  | "memory"
  | "voice"
  | "knowledge"
  | "notification";

export interface ApiLogEntry {
  id: string;
  type: ApiLogEventType;
  provider: string;
  message: string;
  timestamp: number;
  data?: Record<string, unknown>;
}

export class APIEventLog {
  private readonly history: ApiLogEntry[] = [];

  append(entry: Omit<ApiLogEntry, "id" | "timestamp">): void {
    this.history.push({
      ...entry,
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      timestamp: Date.now(),
    });
  }

  recent(limit = 50): ApiLogEntry[] {
    return this.history.slice(-limit).reverse();
  }

  all(): ApiLogEntry[] {
    return [...this.history];
  }

  filter(eventType: ApiLogEventType | "all" = "all", search = ""): ApiLogEntry[] {
    const normalized = search.trim().toLowerCase();
    return this.history.filter((entry) => {
      const matchesType = eventType === "all" || entry.type === eventType;
      const matchesSearch = !normalized || `${entry.message} ${entry.provider} ${JSON.stringify(entry.data ?? {})}`.toLowerCase().includes(normalized);
      return matchesType && matchesSearch;
    }).slice(-200);
  }

  search(query: string): ApiLogEntry[] {
    return this.filter("all", query);
  }

  exportJson(): string {
    return JSON.stringify(this.history, null, 2);
  }

  clear(): void {
    this.history.length = 0;
  }
}

const sharedLogger = new APIEventLog();
export default sharedLogger;
