import { createClient, type Session, type SupabaseClient } from "@supabase/supabase-js";
import appLog from "./APIEventLog";
import getEnvironmentConfig from "./EnvironmentConfig";

export interface AuthSessionSnapshot {
  isAuthenticated: boolean;
  isGuest: boolean;
  userId: string | null;
  email: string | null;
  status: "idle" | "authenticating" | "ready" | "error";
  error: string | null;
}

export default class AuthService {
  private client: SupabaseClient | null = null;
  private sessionState: AuthSessionSnapshot = {
    isAuthenticated: false,
    isGuest: false,
    userId: null,
    email: null,
    status: "idle",
    error: null,
  };
  private initPromise: Promise<AuthSessionSnapshot> | null = null;

  constructor(private readonly config = getEnvironmentConfig()) {}

  async initialize(): Promise<AuthSessionSnapshot> {
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = this.restoreSession();
    return this.initPromise;
  }

  getSnapshot(): AuthSessionSnapshot {
    return this.sessionState;
  }

  isAuthenticated(): boolean {
    return this.sessionState.isAuthenticated;
  }

  private getClient(): SupabaseClient {
    if (!this.client) {
      if (!this.config.supabaseUrl || !this.config.supabaseAnonKey) {
        this.sessionState = {
          ...this.sessionState,
          status: "error",
          error: "Supabase is not configured.",
        };
        throw new Error("Supabase is not configured.");
      }

      this.client = createClient(this.config.supabaseUrl, this.config.supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      });
    }

    return this.client;
  }

  async signUp(email: string, password: string): Promise<AuthSessionSnapshot> {
    this.sessionState = { ...this.sessionState, status: "authenticating", error: null };
    const client = this.getClient();
    const { data, error } = await client.auth.signUp({ email, password });
    if (error) {
      this.sessionState = { ...this.sessionState, status: "error", error: error.message };
      throw error;
    }

    return this.applySession(data.session, data.user, false);
  }

  async signIn(email: string, password: string): Promise<AuthSessionSnapshot> {
    this.sessionState = { ...this.sessionState, status: "authenticating", error: null };
    const client = this.getClient();
    const { data, error } = await client.auth.signInWithPassword({ email, password });
    if (error) {
      this.sessionState = { ...this.sessionState, status: "error", error: error.message };
      throw error;
    }

    return this.applySession(data.session, data.user, false);
  }

  async signInAnonymously(): Promise<AuthSessionSnapshot> {
    this.sessionState = { ...this.sessionState, status: "authenticating", error: null };
    const client = this.getClient();
    const { data, error } = await client.auth.signInAnonymously();
    if (error) {
      this.sessionState = { ...this.sessionState, status: "error", error: error.message };
      throw error;
    }

    return this.applySession(data.session, data.user, true);
  }

  async restoreSession(): Promise<AuthSessionSnapshot> {
    try {
      const client = this.getClient();
      const { data, error } = await client.auth.getSession();
      if (error) {
        this.sessionState = { ...this.sessionState, status: "error", error: error.message };
        throw error;
      }

      return this.applySession(data.session, data.session?.user ?? null, false);
    }
    catch (error) {
      this.sessionState = {
        ...this.sessionState,
        status: "error",
        error: error instanceof Error ? error.message : "Unable to restore session.",
      };
      appLog.append({ type: "warning", provider: "auth", message: "Session restore failed", data: { error: this.sessionState.error } });
      return this.sessionState;
    }
  }

  async resetPassword(email: string): Promise<void> {
    const client = this.getClient();
    const { error } = await client.auth.resetPasswordForEmail(email);
    if (error) {
      throw error;
    }
  }

  async signOut(): Promise<AuthSessionSnapshot> {
    const client = this.getClient();
    await client.auth.signOut();
    this.sessionState = {
      isAuthenticated: false,
      isGuest: false,
      userId: null,
      email: null,
      status: "idle",
      error: null,
    };
    appLog.append({ type: "warning", provider: "auth", message: "User signed out" });
    return this.sessionState;
  }

  async upgradeGuestAccount(email: string, password: string): Promise<AuthSessionSnapshot> {
    return this.signUp(email, password);
  }

  private applySession(session: Session | null, user: { id?: string; email?: string | null } | null, isGuest: boolean): AuthSessionSnapshot {
    const authenticated = Boolean(session && user?.id);
    const nextState: AuthSessionSnapshot = {
      isAuthenticated: authenticated,
      isGuest,
      userId: user?.id ?? null,
      email: user?.email ?? null,
      status: authenticated ? "ready" : "idle",
      error: null,
    };

    this.sessionState = nextState;
    appLog.append({
      type: authenticated ? "request" : "warning",
      provider: "auth",
      message: authenticated ? "Authentication restored" : "Guest session initialized",
      data: { userId: nextState.userId, isGuest: nextState.isGuest },
    });
    return nextState;
  }
}
