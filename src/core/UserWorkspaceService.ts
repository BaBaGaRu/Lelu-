import appLog from "./APIEventLog";
import AuthService from "./AuthService";
import getEnvironmentConfig from "./EnvironmentConfig";

export interface WorkspaceProfile {
  id: string;
  user_id: string;
  display_name: string;
  avatar_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface WorkspaceSettings {
  id: string;
  user_id: string;
  voice_enabled: boolean;
  provider_mode: string;
  theme: string;
  updated_at: string;
}

export interface WorkspaceConversation {
  id: string;
  user_id: string;
  title: string;
  summary: string;
  provider: string;
  model: string;
  messages: Array<{ role: string; content: string }>;
  created_at: string;
  updated_at: string;
}

export interface WorkspaceMemoryRecord {
  id: string;
  user_id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  priority: string;
  related_memories: string[];
  conversation_id?: string | null;
  confidence: number;
  created_at: string;
  updated_at: string;
}

export default class UserWorkspaceService {
  private auth: AuthService;
  private endpoint: string;
  private readonly authHeader: Record<string, string>;

  constructor(auth: AuthService, config = getEnvironmentConfig()) {
    this.auth = auth;
    this.endpoint = config.supabaseUrl;
    this.authHeader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.supabaseAnonKey}`,
      apikey: config.supabaseAnonKey,
    };
  }

  async loadWorkspace(): Promise<{ profile: WorkspaceProfile | null; settings: WorkspaceSettings | null; conversations: WorkspaceConversation[]; memories: WorkspaceMemoryRecord[] }> {
    const snapshot = this.auth.getSnapshot();
    if (!snapshot.isAuthenticated || !snapshot.userId) {
      return { profile: null, settings: null, conversations: [], memories: [] };
    }

    try {
      const [profile, settings, conversations, memories] = await Promise.all([
        this.fetchJson<WorkspaceProfile[]>(`/rest/v1/profiles?user_id=eq.${snapshot.userId}&select=*`),
        this.fetchJson<WorkspaceSettings[]>(`/rest/v1/settings?user_id=eq.${snapshot.userId}&select=*`),
        this.fetchJson<WorkspaceConversation[]>(`/rest/v1/conversations?user_id=eq.${snapshot.userId}&select=*`),
        this.fetchJson<WorkspaceMemoryRecord[]>(`/rest/v1/memories?user_id=eq.${snapshot.userId}&select=*`),
      ]);
      appLog.append({ type: "memory", provider: "workspace", message: "Workspace restored", data: { conversations: conversations.length, memories: memories.length } });
      return { profile: profile[0] ?? null, settings: settings[0] ?? null, conversations, memories };
    }
    catch (error) {
      appLog.append({ type: "warning", provider: "workspace", message: error instanceof Error ? error.message : "Workspace restore failed" });
      return { profile: null, settings: null, conversations: [], memories: [] };
    }
  }

  async saveConversation(conversation: Omit<WorkspaceConversation, "id" | "user_id" | "created_at" | "updated_at">): Promise<WorkspaceConversation | null> {
    const snapshot = this.auth.getSnapshot();
    if (!snapshot.isAuthenticated || !snapshot.userId) {
      return null;
    }

    const payload = {
      ...conversation,
      user_id: snapshot.userId,
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    };

    return this.postJson<WorkspaceConversation>("/rest/v1/conversations", payload);
  }

  async saveMemory(memory: Omit<WorkspaceMemoryRecord, "id" | "user_id" | "created_at" | "updated_at">): Promise<WorkspaceMemoryRecord | null> {
    const snapshot = this.auth.getSnapshot();
    if (!snapshot.isAuthenticated || !snapshot.userId) {
      return null;
    }

    const payload = {
      ...memory,
      user_id: snapshot.userId,
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    };

    return this.postJson<WorkspaceMemoryRecord>("/rest/v1/memories", payload);
  }

  private async fetchJson<T>(path: string): Promise<T> {
    const response = await fetch(`${this.endpoint}${path}`, {
      method: "GET",
      headers: this.authHeader,
    });
    if (!response.ok) {
      throw new Error(`Workspace fetch failed: ${response.status}`);
    }
    return response.json() as Promise<T>;
  }

  private async postJson<T>(path: string, payload: Record<string, unknown>): Promise<T> {
    const response = await fetch(`${this.endpoint}${path}`, {
      method: "POST",
      headers: this.authHeader,
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`Workspace write failed: ${response.status}`);
    }
    return response.json() as Promise<T>;
  }
}
