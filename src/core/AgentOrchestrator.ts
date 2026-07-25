import appLog from "./APIEventLog";

export interface AgentRuntimeEntry {
  id: string;
  name: string;
  role: string;
  status: "idle" | "running" | "ready" | "error";
  progress: number;
  workspace: string;
  lastUpdate: string;
}

export interface WorkspaceRuntimeEntry {
  id: string;
  name: string;
  status: "ready" | "busy" | "degraded";
  history: number;
  lastActive: string;
  sandbox: boolean;
}

export interface ActivityEntry {
  id: string;
  timestamp: number;
  message: string;
  severity: "info" | "warning" | "error";
}

export interface AgentRuntimeSnapshot {
  agents: AgentRuntimeEntry[];
  workspaces: WorkspaceRuntimeEntry[];
  activity: ActivityEntry[];
  queue: string[];
}

export default class AgentOrchestrator {
  private readonly agents = new Map<string, AgentRuntimeEntry>();
  private readonly workspaces = new Map<string, WorkspaceRuntimeEntry>();
  private readonly activity: ActivityEntry[] = [];
  private readonly queue: string[] = [];

  constructor() {
    this.seedDefaults();
  }

  seedDefaults(): void {
    const defaultAgents = [
      { id: "companion", name: "Companion Agent", role: "Companion", workspace: "Chat", status: "ready" as const, progress: 100, lastUpdate: "online" },
      { id: "voice", name: "Voice Agent", role: "Voice", workspace: "Voice", status: "ready" as const, progress: 100, lastUpdate: "listening" },
      { id: "research", name: "Research Agent", role: "Research", workspace: "Research", status: "ready" as const, progress: 100, lastUpdate: "idle" },
      { id: "knowledge", name: "Knowledge Agent", role: "Knowledge", workspace: "Knowledge", status: "ready" as const, progress: 100, lastUpdate: "indexed" },
      { id: "planning", name: "Planner Agent", role: "Planning", workspace: "Mission Control", status: "ready" as const, progress: 100, lastUpdate: "ready" },
      { id: "coding", name: "Coding Agent", role: "Code", workspace: "Coding", status: "ready" as const, progress: 100, lastUpdate: "ready" },
      { id: "engineering", name: "Engineering Agent", role: "Engineering", workspace: "Engineering", status: "ready" as const, progress: 100, lastUpdate: "ready" },
      { id: "testing", name: "Testing Agent", role: "Testing", workspace: "Sandbox", status: "ready" as const, progress: 100, lastUpdate: "ready" },
      { id: "deployment", name: "Deployment Agent", role: "Deploy", workspace: "Sandbox", status: "ready" as const, progress: 100, lastUpdate: "ready" },
      { id: "security", name: "Security Agent", role: "Security", workspace: "Sandbox", status: "ready" as const, progress: 100, lastUpdate: "ready" },
    ];

    defaultAgents.forEach((agent) => this.agents.set(agent.id, agent));

    const defaultWorkspaces = [
      { id: "chat", name: "Chat", status: "ready" as const, history: 24, lastActive: "now", sandbox: false },
      { id: "engineering", name: "Engineering", status: "ready" as const, history: 18, lastActive: "now", sandbox: true },
      { id: "browser", name: "Browser", status: "ready" as const, history: 9, lastActive: "now", sandbox: false },
      { id: "coding", name: "Coding", status: "ready" as const, history: 11, lastActive: "now", sandbox: true },
      { id: "research", name: "Research", status: "ready" as const, history: 7, lastActive: "now", sandbox: false },
      { id: "voice", name: "Voice", status: "ready" as const, history: 15, lastActive: "now", sandbox: false },
      { id: "logs", name: "Logs", status: "ready" as const, history: 32, lastActive: "now", sandbox: false },
      { id: "sandbox", name: "Sandbox", status: "ready" as const, history: 40, lastActive: "now", sandbox: true },
    ];

    defaultWorkspaces.forEach((workspace) => this.workspaces.set(workspace.id, workspace));

    this.pushActivity("Mission control initialized", "info");
  }

  queueTask(taskName: string): void {
    this.queue.push(taskName);
    this.pushActivity(taskName, "info");
    appLog.append({ type: "notification", provider: "orchestrator", message: `Queued ${taskName}` });
  }

  markAgentRunning(agentId: string, progress = 40): void {
    const agent = this.agents.get(agentId);
    if (!agent) {
      return;
    }

    const next: AgentRuntimeEntry = { ...agent, status: "running", progress, lastUpdate: "active" };
    this.agents.set(agentId, next);
    this.pushActivity(`${next.name} started`, "info");
  }

  markAgentReady(agentId: string, progress = 100): void {
    const agent = this.agents.get(agentId);
    if (!agent) {
      return;
    }

    const next: AgentRuntimeEntry = { ...agent, status: "ready", progress, lastUpdate: "ready" };
    this.agents.set(agentId, next);
  }

  markAgentError(agentId: string, message: string): void {
    const agent = this.agents.get(agentId);
    if (!agent) {
      return;
    }

    const next: AgentRuntimeEntry = { ...agent, status: "error", progress: 0, lastUpdate: message };
    this.agents.set(agentId, next);
    this.pushActivity(`${next.name} hit an error`, "warning");
  }

  getSnapshot(): AgentRuntimeSnapshot {
    return {
      agents: Array.from(this.agents.values()),
      workspaces: Array.from(this.workspaces.values()),
      activity: [...this.activity].slice(-12),
      queue: [...this.queue].slice(-8),
    };
  }

  private pushActivity(message: string, severity: ActivityEntry["severity"]): void {
    this.activity.push({ id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, timestamp: Date.now(), message, severity });
    if (this.activity.length > 24) {
      this.activity.shift();
    }
  }
}
