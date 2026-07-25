import { useEffect, useMemo, useState } from "react";
import ChatWindowContext from "./ChatWindowContext";
import MissionControlPanel from "./MissionControlPanel";
import VoiceDebugPanel from "./VoiceDebugPanel";
import type LeluAssistant from "../../abilities/assistant/LeluAssistant";
import type AgentOrchestrator from "../../core/AgentOrchestrator";
import appLog from "../../core/APIEventLog";

export type WorkspaceId =
  | "chat"
  | "agents"
  | "engineering"
  | "browser"
  | "research"
  | "projects"
  | "coding"
  | "voice"
  | "knowledge"
  | "sandbox"
  | "logs"
  | "mission-control"
  | "settings";

interface WorkspaceShellProps {
  assistant: LeluAssistant;
  missionControl: AgentOrchestrator;
}

const workspaceMeta: Array<{ id: WorkspaceId; title: string; description: string }> = [
  { id: "chat", title: "Chat", description: "Conversational workspace" },
  { id: "agents", title: "Agents", description: "Live agent activity" },
  { id: "engineering", title: "Engineering", description: "Repository and diagnostics" },
  { id: "browser", title: "Browser", description: "Research and browsing" },
  { id: "research", title: "Research", description: "Knowledge collection" },
  { id: "projects", title: "Projects", description: "Targeted missions" },
  { id: "coding", title: "Coding", description: "Implementation workspace" },
  { id: "voice", title: "Voice", description: "Continuous listening" },
  { id: "knowledge", title: "Knowledge", description: "Memory index" },
  { id: "sandbox", title: "Sandbox", description: "Isolated validation" },
  { id: "logs", title: "Logs", description: "Operational transparency" },
  { id: "mission-control", title: "Mission Control", description: "Live operations" },
  { id: "settings", title: "Settings", description: "System preferences" },
];

export default function WorkspaceShell({ assistant, missionControl }: WorkspaceShellProps) {
  const [activeWorkspace, setActiveWorkspace] = useState<WorkspaceId>("chat");
  const [snapshot, setSnapshot] = useState(() => missionControl.getSnapshot());
  const [logs, setLogs] = useState(() => appLog.recent(8));

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSnapshot(missionControl.getSnapshot());
      setLogs(appLog.recent(8));
    }, 1200);
    return () => window.clearInterval(interval);
  }, [missionControl]);

  const liveAgents = useMemo(() => snapshot.agents.slice(0, 6), [snapshot]);

  function renderWorkspaceContent() {
    switch (activeWorkspace) {
      case "agents":
        return (
          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ fontSize: 24, fontWeight: 700 }}>Agent workspace</div>
            <div style={{ color: "#94a3b8", fontSize: 14 }}>Every agent is visible, inspectable, and independently trackable.</div>
            {snapshot.agents.map((agent) => (
              <details key={agent.id} style={{ border: "1px solid rgba(71,85,105,0.5)", borderRadius: 12, padding: 12, background: "rgba(15,23,42,0.7)" }} open={agent.id === "voice"}>
                <summary style={{ cursor: "pointer", fontWeight: 600 }}>{agent.name}</summary>
                <div style={{ display: "grid", gap: 8, marginTop: 10, fontSize: 13 }}>
                  <div>Status: {agent.status}</div>
                  <div>Workspace: {agent.workspace}</div>
                  <div>Last update: {agent.lastUpdate}</div>
                  <div style={{ height: 8, borderRadius: 999, background: "rgba(148,163,184,0.2)", overflow: "hidden" }}>
                    <div style={{ width: `${agent.progress}%`, height: "100%", background: agent.status === "error" ? "#f87171" : "#38bdf8" }} />
                  </div>
                </div>
              </details>
            ))}
          </div>
        );
      case "engineering":
        return (
          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ fontSize: 24, fontWeight: 700 }}>Engineering workspace</div>
            <div style={{ color: "#94a3b8", fontSize: 14 }}>Sandboxed engineering tools, diagnostics, and build visibility.</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
              {[
                ["Repository Explorer", "src/ /core /ui /voice"],
                ["File Tree", "12 directories • 64 files"],
                ["Dependency Graph", "React • Vite • Three.js"],
                ["Architecture Map", "Assistant → Orchestrator → Services"],
                ["Build Status", "Passing"],
                ["Diagnostics", "Voice and runtime health nominal"],
                ["Error Dashboard", "No blocking errors"],
                ["Performance Monitor", "Render loop healthy"],
                ["Documentation", "Architecture notes available"],
                ["TODO Board", "Voice and workspace systems active"],
                ["Git Activity", "Current branch: chat-working"],
              ].map(([title, value]) => (
                <div key={title} style={{ borderRadius: 12, padding: 12, background: "rgba(15,23,42,0.7)", border: "1px solid rgba(71,85,105,0.5)" }}>
                  <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.22em", color: "#93c5fd" }}>{title}</div>
                  <div style={{ marginTop: 8, fontSize: 13 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        );
      case "browser":
        return (
          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ fontSize: 24, fontWeight: 700 }}>Browser workspace</div>
            <div style={{ color: "#94a3b8", fontSize: 14 }}>Connected browser sessions, saved research, and citations remain visible.</div>
            <div style={{ display: "grid", gap: 10 }}>
              {[
                { label: "Open tabs", value: "3 active tabs" },
                { label: "Search history", value: "7 recent searches" },
                { label: "Saved sessions", value: "2 research sessions" },
                { label: "Citations", value: "11 linked references" },
                { label: "Downloads", value: "1 artifact ready" },
              ].map((entry) => (
                <div key={entry.label} style={{ borderRadius: 12, padding: 12, background: "rgba(15,23,42,0.7)", border: "1px solid rgba(71,85,105,0.5)" }}>
                  <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.22em", color: "#93c5fd" }}>{entry.label}</div>
                  <div style={{ marginTop: 8, fontSize: 13 }}>{entry.value}</div>
                </div>
              ))}
            </div>
          </div>
        );
      case "voice":
        return (
          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ fontSize: 24, fontWeight: 700 }}>Voice workspace</div>
            <div style={{ color: "#94a3b8", fontSize: 14 }}>Listening stays active until disabled and continues to report state.</div>
            <div style={{ display: "flex", gap: 10 }}>
              <button type="button" onClick={() => void assistant.voice.startListening(() => undefined)} style={{ padding: "8px 12px", borderRadius: 999, border: "none", background: "#38bdf8", color: "#020617", cursor: "pointer" }}>Start listening</button>
              <button type="button" onClick={() => assistant.voice.stopListening()} style={{ padding: "8px 12px", borderRadius: 999, border: "1px solid rgba(148,163,184,0.35)", background: "rgba(15,23,42,0.7)", color: "#f8fafc", cursor: "pointer" }}>Stop listening</button>
            </div>
            <VoiceDebugPanel voiceService={assistant.voice} />
          </div>
        );
      case "logs":
        return (
          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ fontSize: 24, fontWeight: 700 }}>Logs workspace</div>
            <div style={{ color: "#94a3b8", fontSize: 14 }}>Every request, recovery, warning, and agent update is surfaced here.</div>
            <div style={{ display: "grid", gap: 8 }}>
              {logs.map((entry) => (
                <div key={entry.id} style={{ borderRadius: 12, padding: 10, background: "rgba(15,23,42,0.7)", border: "1px solid rgba(71,85,105,0.5)" }}>
                  <div style={{ fontSize: 12, color: "#93c5fd" }}>{entry.provider} • {entry.type}</div>
                  <div style={{ marginTop: 4, fontSize: 13 }}>{entry.message}</div>
                </div>
              ))}
            </div>
          </div>
        );
      case "mission-control":
        return <MissionControlPanel orchestrator={missionControl} />;
      case "settings":
        return (
          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ fontSize: 24, fontWeight: 700 }}>Settings</div>
            <div style={{ color: "#94a3b8", fontSize: 14 }}>Preferences and service toggles are centralized here.</div>
            <div style={{ borderRadius: 12, padding: 12, background: "rgba(15,23,42,0.7)", border: "1px solid rgba(71,85,105,0.5)" }}>
              <div>Voice enabled: {assistant.state.voiceEnabled ? "on" : "off"}</div>
              <div>Mode: {assistant.state.activeMode}</div>
            </div>
          </div>
        );
      case "research":
      case "projects":
      case "coding":
      case "knowledge":
      case "sandbox":
        return (
          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ fontSize: 24, fontWeight: 700 }}>{workspaceMeta.find((item) => item.id === activeWorkspace)?.title}</div>
            <div style={{ color: "#94a3b8", fontSize: 14 }}>Workspace ready for focused execution.</div>
            <div style={{ borderRadius: 12, padding: 12, background: "rgba(15,23,42,0.7)", border: "1px solid rgba(71,85,105,0.5)" }}>
              This workspace is isolated and can host its own tasks, history, and observations without disrupting the rest of the system.
            </div>
          </div>
        );
      case "chat":
      default:
        return <ChatWindowContext assistant={assistant} />;
    }
  }

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 20, padding: 16, display: "flex", flexDirection: "column", gap: 12, pointerEvents: "none" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderRadius: 14, background: "rgba(2,6,23,0.8)", border: "1px solid rgba(71,85,105,0.55)", pointerEvents: "auto" }}>
        <div>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.28em", color: "#93c5fd" }}>LÉLU OS</div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>Operational workspace</div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {workspaceMeta.map((entry) => (
            <button key={entry.id} type="button" onClick={() => setActiveWorkspace(entry.id)} style={{ padding: "8px 10px", borderRadius: 999, border: activeWorkspace === entry.id ? "1px solid #38bdf8" : "1px solid rgba(148,163,184,0.25)", background: activeWorkspace === entry.id ? "rgba(56,189,248,0.18)" : "rgba(15,23,42,0.8)", color: "#f8fafc", cursor: "pointer" }}>
              {entry.title}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, flex: 1, minHeight: 0, pointerEvents: "none" }}>
        <aside style={{ width: 260, borderRadius: 16, padding: 12, background: "rgba(2,6,23,0.78)", border: "1px solid rgba(71,85,105,0.55)", display: "flex", flexDirection: "column", gap: 10, pointerEvents: "auto" }}>
          <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.24em", color: "#93c5fd" }}>Workspaces</div>
          {workspaceMeta.map((entry) => (
            <button key={entry.id} type="button" onClick={() => setActiveWorkspace(entry.id)} style={{ textAlign: "left", padding: "10px 12px", borderRadius: 12, border: activeWorkspace === entry.id ? "1px solid #38bdf8" : "1px solid rgba(148,163,184,0.2)", background: activeWorkspace === entry.id ? "rgba(56,189,248,0.16)" : "rgba(15,23,42,0.4)", color: "#f8fafc", cursor: "pointer" }}>
              <div style={{ fontWeight: 700 }}>{entry.title}</div>
              <div style={{ color: "#94a3b8", fontSize: 12 }}>{entry.description}</div>
            </button>
          ))}
        </aside>

        <section style={{ flex: 1, minWidth: 0, borderRadius: 16, padding: 14, background: "rgba(2,6,23,0.76)", border: "1px solid rgba(71,85,105,0.55)", overflowY: "auto", pointerEvents: "auto" }}>
          {renderWorkspaceContent()}
        </section>

        <aside style={{ width: 320, borderRadius: 16, padding: 12, background: "rgba(2,6,23,0.78)", border: "1px solid rgba(71,85,105,0.55)", display: "flex", flexDirection: "column", gap: 10, pointerEvents: "auto" }}>
          <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.24em", color: "#93c5fd" }}>Live Agent Activity</div>
          {liveAgents.map((agent) => (
            <div key={agent.id} style={{ borderRadius: 12, padding: 10, background: "rgba(15,23,42,0.7)", border: "1px solid rgba(71,85,105,0.5)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                <div style={{ fontWeight: 600 }}>{agent.name}</div>
                <div style={{ color: agent.status === "error" ? "#f87171" : agent.status === "running" ? "#facc15" : "#4ade80", fontSize: 12 }}>{agent.status}</div>
              </div>
              <div style={{ marginTop: 6, fontSize: 12, color: "#cbd5e1" }}>{agent.lastUpdate}</div>
              <div style={{ marginTop: 8, height: 6, borderRadius: 999, background: "rgba(148,163,184,0.2)", overflow: "hidden" }}>
                <div style={{ width: `${agent.progress}%`, height: "100%", background: agent.status === "error" ? "#f87171" : "#38bdf8" }} />
              </div>
            </div>
          ))}
        </aside>
      </div>

      <div style={{ borderRadius: 16, padding: 12, background: "rgba(2,6,23,0.76)", border: "1px solid rgba(71,85,105,0.55)", display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 12, pointerEvents: "auto" }}>
        <div>
          <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.24em", color: "#93c5fd" }}>Workflow</div>
          <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            {['User', 'Orchestrator', 'Router', 'Agent', 'Sandbox', 'Verification', 'Response'].map((step, index) => (
              <div key={step} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ borderRadius: 999, padding: "6px 10px", background: index === 0 ? "#38bdf8" : "rgba(15,23,42,0.75)", color: "#f8fafc" }}>{step}</div>
                {index < 6 ? <div style={{ color: "#93c5fd" }}>→</div> : null}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.24em", color: "#93c5fd" }}>Task Queue</div>
          <div style={{ marginTop: 8, display: "grid", gap: 6 }}>
            {snapshot.queue.length > 0 ? snapshot.queue.map((task) => <div key={task} style={{ fontSize: 13, color: "#cbd5e1" }}>{task}</div>) : <div style={{ fontSize: 13, color: "#cbd5e1" }}>Queue idle.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
