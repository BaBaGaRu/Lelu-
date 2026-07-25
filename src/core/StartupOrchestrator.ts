import appLog from "./APIEventLog";
import AuthService from "./AuthService";
import UserWorkspaceService from "./UserWorkspaceService";
import AIOrchestrator from "./AIOrchestrator";
import type BrowserVoiceService from "../abilities/voice/BrowserVoiceService";

export interface StartupState {
  status: "idle" | "booting" | "ready" | "error";
  phase: string;
  authReady: boolean;
  workspaceReady: boolean;
  providersReady: boolean;
  voiceReady: boolean;
  error: string | null;
}

export default class StartupOrchestrator {
  private readonly auth = new AuthService();
  private readonly workspace = new UserWorkspaceService(this.auth);
  private readonly orchestrator = new AIOrchestrator();
  private state: StartupState = {
    status: "idle",
    phase: "waiting",
    authReady: false,
    workspaceReady: false,
    providersReady: false,
    voiceReady: false,
    error: null,
  };

  getState(): StartupState {
    return this.state;
  }

  async boot(voiceService?: BrowserVoiceService): Promise<StartupState> {
    this.state = { ...this.state, status: "booting", phase: "initializing" };

    try {
      this.state = { ...this.state, phase: "auth" };
      const authSnapshot = await this.auth.initialize();
      this.state = { ...this.state, authReady: authSnapshot.isAuthenticated || authSnapshot.isGuest || authSnapshot.status === "ready" };

      this.state = { ...this.state, phase: "workspace" };
      await this.workspace.loadWorkspace();
      this.state = { ...this.state, workspaceReady: true };

      this.state = { ...this.state, phase: "providers" };
      await this.orchestrator.initialize();
      this.state = { ...this.state, providersReady: true };

      if (voiceService) {
        this.state = { ...this.state, phase: "voice" };
        try {
          await voiceService.prepare();
          this.state = { ...this.state, voiceReady: true };
        }
        catch {
          this.state = { ...this.state, voiceReady: false };
        }
      }

      this.state = { ...this.state, status: "ready", phase: "ready", error: null };
      appLog.append({ type: "startup", provider: "startup", message: "Lélu startup complete", data: { authReady: this.state.authReady, workspaceReady: this.state.workspaceReady } });
      return this.state;
    }
    catch (error) {
      const message = error instanceof Error ? error.message : "Startup failed";
      this.state = { ...this.state, status: "error", phase: "error", error: message };
      appLog.append({ type: "error", provider: "startup", message, data: { phase: this.state.phase } });
      return this.state;
    }
  }

  getAuthService(): AuthService {
    return this.auth;
  }

  getWorkspaceService(): UserWorkspaceService {
    return this.workspace;
  }

  getOrchestrator(): AIOrchestrator {
    return this.orchestrator;
  }
}
