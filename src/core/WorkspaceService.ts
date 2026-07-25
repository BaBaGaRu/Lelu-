import appLog from "./APIEventLog";
import type { AuthUser } from "./AuthService";

export interface UserProfile {
  user_id: string;
  display_name: string;
  email: string;
  avatar_url?: string;
  theme: "dark" | "light";
  updated_at: string;
}

export interface AppPreferences {
  user_id: string;
  voice_enabled: boolean;
  continuous_listening: boolean;
  push_to_talk: boolean;
  auto_save_memories: boolean;
  updated_at: string;
}

export interface ConversationRecord {
  id: string;
  user_id: string;
  title: string;
  timestamp: string;
  provider: string;
  model: string;
  summary: string;
  linked_memories: string[];
  message_history: Array<{ role: string; text: string }>;
}

export interface MemoryRecord {
  id: string;
  user_id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  priority: "low" | "normal" | "high";
  classification: "short-term" | "long-term" | "episodic" | "semantic";
  created_at: string;
  updated_at: string;
  related_memories: string[];
  conversation_ref?: string;
  confidence_score: number;
}

export interface VoiceSettingsRecord {
  user_id: string;
  stt_enabled: boolean;
  tts_enabled: boolean;
  language: string;
  continuous_listening: boolean;
  push_to_talk: boolean;
  updated_at: string;
}

export interface ProviderSettingsRecord {
  user_id: string;
  provider: string;
  enabled: boolean;
  model: string;
  updated_at: string;
}

export interface ProjectRecord {
  id: string;
  user_id: string;
  title: string;
  summary: string;
  created_at: string;
  updated_at: string;
}

export interface WorkspaceLogEntry {
  id: string;
  user_id: string;
  timestamp: string;
  severity: "info" | "warning" | "error";
  subsystem: string;
  details: string;
}

export default class WorkspaceService {
  private currentUserId: string | null = null;
  private accessToken: string | null = null;
  private profile: UserProfile | null = null;
  private preferences: AppPreferences | null = null;
  private conversations: ConversationRecord[] = [];
  private memories: MemoryRecord[] = [];
  private voiceSettings: VoiceSettingsRecord | null = null;
  private providerSettings: ProviderSettingsRecord[] = [];
  private projects: ProjectRecord[] = [];
  private logs: WorkspaceLogEntry[] = [];

  constructor(
    private readonly supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() ?? "",
    private readonly anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ?? "",
  ) {}

  async initialize(user: AuthUser | null, accessToken?: string): Promise<void> {
    this.currentUserId = user?.id ?? null;
    this.accessToken = accessToken ?? null;
    this.restoreFromLocalStorage();
    if (!this.currentUserId) return;

    await Promise.allSettled([
      this.loadProfile(),
      this.loadPreferences(),
      this.loadConversations(),
      this.loadMemories(),
      this.loadVoiceSettings(),
      this.loadProviderSettings(),
      this.loadProjects(),
      this.loadLogs(),
    ]);
  }

  getProfile(): UserProfile | null {
    return this.profile;
  }

  getPreferences(): AppPreferences | null {
    return this.preferences;
  }

  getConversations(): ConversationRecord[] {
    return [...this.conversations];
  }

  getMemories(): MemoryRecord[] {
    return [...this.memories];
  }

  getVoiceSettings(): VoiceSettingsRecord | null {
    return this.voiceSettings;
  }

  getProviderSettings(): ProviderSettingsRecord[] {
    return [...this.providerSettings];
  }

  getProjects(): ProjectRecord[] {
    return [...this.projects];
  }

  getLogs(): WorkspaceLogEntry[] {
    return [...this.logs];
  }

  async saveProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
    if (!this.currentUserId) {
      throw new Error("No active user");
    }
    const nextProfile: UserProfile = {
      user_id: this.currentUserId,
      display_name: profile.display_name ?? this.profile?.display_name ?? "Lélu User",
      email: profile.email ?? this.profile?.email ?? "",
      avatar_url: profile.avatar_url,
      theme: profile.theme ?? this.profile?.theme ?? "dark",
      updated_at: new Date().toISOString(),
    };
    this.profile = nextProfile;
    this.persistLocal("profile", nextProfile);
    await this.upsertSupabase("profiles", nextProfile, "user_id");
    return nextProfile;
  }

  async savePreferences(preferences: Partial<AppPreferences>): Promise<AppPreferences> {
    if (!this.currentUserId) {
      throw new Error("No active user");
    }
    const nextPreferences: AppPreferences = {
      user_id: this.currentUserId,
      voice_enabled: preferences.voice_enabled ?? this.preferences?.voice_enabled ?? true,
      continuous_listening: preferences.continuous_listening ?? this.preferences?.continuous_listening ?? false,
      push_to_talk: preferences.push_to_talk ?? this.preferences?.push_to_talk ?? false,
      auto_save_memories: preferences.auto_save_memories ?? this.preferences?.auto_save_memories ?? true,
      updated_at: new Date().toISOString(),
    };
    this.preferences = nextPreferences;
    this.persistLocal("preferences", nextPreferences);
    await this.upsertSupabase("preferences", nextPreferences, "user_id");
    return nextPreferences;
  }

  async saveConversation(conversation: ConversationRecord): Promise<ConversationRecord> {
    if (!this.currentUserId) {
      throw new Error("No active user");
    }
    const next = {
      ...conversation,
      user_id: this.currentUserId,
    };
    this.conversations = [next, ...this.conversations.filter((entry) => entry.id !== next.id)].slice(0, 40);
    this.persistLocal("conversations", this.conversations);
    await this.upsertSupabase("conversations", next, "id");
    return next;
  }

  async saveMemory(memory: MemoryRecord): Promise<MemoryRecord> {
    if (!this.currentUserId) {
      throw new Error("No active user");
    }
    const next = {
      ...memory,
      user_id: this.currentUserId,
      updated_at: new Date().toISOString(),
    };
    this.memories = [next, ...this.memories.filter((entry) => entry.id !== next.id)].slice(0, 80);
    this.persistLocal("memories", this.memories);
    await this.upsertSupabase("memories", next, "id");
    return next;
  }

  async saveVoiceSettings(settings: Partial<VoiceSettingsRecord>): Promise<VoiceSettingsRecord> {
    if (!this.currentUserId) {
      throw new Error("No active user");
    }
    const next: VoiceSettingsRecord = {
      user_id: this.currentUserId,
      stt_enabled: settings.stt_enabled ?? this.voiceSettings?.stt_enabled ?? true,
      tts_enabled: settings.tts_enabled ?? this.voiceSettings?.tts_enabled ?? true,
      language: settings.language ?? this.voiceSettings?.language ?? "en-US",
      continuous_listening: settings.continuous_listening ?? this.voiceSettings?.continuous_listening ?? false,
      push_to_talk: settings.push_to_talk ?? this.voiceSettings?.push_to_talk ?? false,
      updated_at: new Date().toISOString(),
    };
    this.voiceSettings = next;
    this.persistLocal("voiceSettings", next);
    await this.upsertSupabase("voice_settings", next, "user_id");
    return next;
  }

  async saveProviderSettings(settings: ProviderSettingsRecord[]): Promise<ProviderSettingsRecord[]> {
    if (!this.currentUserId) {
      throw new Error("No active user");
    }
    this.providerSettings = settings.map((entry) => ({ ...entry, user_id: this.currentUserId! }));
    this.persistLocal("providerSettings", this.providerSettings);
    await this.upsertSupabase("provider_settings", this.providerSettings, "provider");
    return this.providerSettings;
  }

  async saveProject(project: ProjectRecord): Promise<ProjectRecord> {
    if (!this.currentUserId) {
      throw new Error("No active user");
    }
    const next = {
      ...project,
      user_id: this.currentUserId,
      updated_at: new Date().toISOString(),
    };
    this.projects = [next, ...this.projects.filter((entry) => entry.id !== next.id)].slice(0, 50);
    this.persistLocal("projects", this.projects);
    await this.upsertSupabase("projects", next, "id");
    return next;
  }

  async appendLog(entry: Omit<WorkspaceLogEntry, "id" | "user_id">): Promise<WorkspaceLogEntry> {
    if (!this.currentUserId) {
      return { id: `log-${Date.now()}`, user_id: "guest", ...entry };
    }
    const next: WorkspaceLogEntry = {
      id: `log-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      user_id: this.currentUserId,
      timestamp: new Date().toISOString(),
      severity: entry.severity,
      subsystem: entry.subsystem,
      details: entry.details,
    };
    this.logs = [next, ...this.logs].slice(0, 120);
    this.persistLocal("logs", this.logs);
    await this.upsertSupabase("logs", next, "id");
    return next;
  }

  private restoreFromLocalStorage(): void {
    if (typeof window === "undefined") return;
    this.profile = this.readLocal<UserProfile>("profile");
    this.preferences = this.readLocal<AppPreferences>("preferences");
    this.conversations = this.readLocal<ConversationRecord[]>("conversations") ?? [];
    this.memories = this.readLocal<MemoryRecord[]>("memories") ?? [];
    this.voiceSettings = this.readLocal<VoiceSettingsRecord>("voiceSettings");
    this.providerSettings = this.readLocal<ProviderSettingsRecord[]>("providerSettings") ?? [];
    this.projects = this.readLocal<ProjectRecord[]>("projects") ?? [];
    this.logs = this.readLocal<WorkspaceLogEntry[]>("logs") ?? [];
  }

  private async loadProfile(): Promise<void> {
    this.profile = await this.readRemote<UserProfile>("profiles", `user_id=eq.${this.currentUserId}`) as UserProfile | null;
  }

  private async loadPreferences(): Promise<void> {
    this.preferences = await this.readRemote<AppPreferences>("preferences", `user_id=eq.${this.currentUserId}`) as AppPreferences | null;
  }

  private async loadConversations(): Promise<void> {
    const items = await this.readRemote<ConversationRecord[]>("conversations", `user_id=eq.${this.currentUserId}`);
    this.conversations = Array.isArray(items) ? items.flat() : [];
  }

  private async loadMemories(): Promise<void> {
    const items = await this.readRemote<MemoryRecord[]>("memories", `user_id=eq.${this.currentUserId}`);
    this.memories = Array.isArray(items) ? items.flat() : [];
  }

  private async loadVoiceSettings(): Promise<void> {
    const item = await this.readRemote<VoiceSettingsRecord>("voice_settings", `user_id=eq.${this.currentUserId}`);
    this.voiceSettings = Array.isArray(item) ? item[0] ?? null : item ?? null;
  }

  private async loadProviderSettings(): Promise<void> {
    const items = await this.readRemote<ProviderSettingsRecord[]>("provider_settings", `user_id=eq.${this.currentUserId}`);
    this.providerSettings = Array.isArray(items) ? items.flat() : [];
  }

  private async loadProjects(): Promise<void> {
    const items = await this.readRemote<ProjectRecord[]>("projects", `user_id=eq.${this.currentUserId}`);
    this.projects = Array.isArray(items) ? items.flat() : [];
  }

  private async loadLogs(): Promise<void> {
    const items = await this.readRemote<WorkspaceLogEntry[]>("logs", `user_id=eq.${this.currentUserId}`);
    this.logs = Array.isArray(items) ? items.flat() : [];
  }

  private async upsertSupabase(table: string, payload: unknown, conflictKey: string): Promise<void> {
    if (!this.supabaseUrl || !this.accessToken) {
      return;
    }

    const url = `${this.supabaseUrl}/rest/v1/${table}?on_conflict=${conflictKey}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: this.anonKey,
        Authorization: `Bearer ${this.accessToken}`,
        Prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      appLog.append({ type: "warning", provider: "workspace", message: `Unable to sync ${table}` });
    }
  }

  private async readRemote<T>(table: string, filter: string): Promise<T | T[] | null> {
    if (!this.supabaseUrl || !this.accessToken) {
      return null;
    }

    const response = await fetch(`${this.supabaseUrl}/rest/v1/${table}?${filter}`, {
      headers: {
        apikey: this.anonKey,
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    return await response.json() as T;
  }

  private persistLocal<T>(key: string, value: T): void {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(`lelu-workspace-${key}`, JSON.stringify(value));
  }

  private readLocal<T>(key: string): T | null {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(`lelu-workspace-${key}`);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    }
    catch {
      return null;
    }
  }
}
