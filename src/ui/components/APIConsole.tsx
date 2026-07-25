import { useEffect, useMemo, useState } from "react";
import AIOrchestrator from "../../core/AIOrchestrator";
import getSettings from "../../core/Settings";
import LiveLogViewer from "./LiveLogViewer";

interface APIConsoleProps {
  orchestrator: AIOrchestrator;
  isOpen: boolean;
}

export default function APIConsole({ orchestrator, isOpen }: APIConsoleProps) {
  const settings = useMemo(() => getSettings(), []);
  const [runtimeState, setRuntimeState] = useState(() => orchestrator.getRuntimeState());
  const [health, setHealth] = useState(() => orchestrator.getHealthSnapshot());
  const [logs, setLogs] = useState(() => orchestrator.getLogHistory());

  useEffect(() => {
    const refreshState = () => {
      setRuntimeState(orchestrator.getRuntimeState());
      setHealth(orchestrator.getHealthSnapshot());
      setLogs(orchestrator.getLogHistory());
    };

    refreshState();
    const timer = window.setInterval(refreshState, 700);
    return () => window.clearInterval(timer);
  }, [orchestrator]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: "auto 24px 24px auto",
        width: "min(680px, calc(100vw - 48px))",
        maxHeight: "72vh",
        overflow: "auto",
        borderRadius: "24px",
        background: "rgba(2, 6, 23, 0.9)",
        color: "#f8fafc",
        boxShadow: "0 24px 80px rgba(0,0,0,0.45)",
        border: "1px solid rgba(255,255,255,0.16)",
        backdropFilter: "blur(24px)",
        padding: 20,
        zIndex: 10000,
        pointerEvents: "auto",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.28em", color: "#93c5fd" }}>Genesis API Console</div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>Connected Providers</div>
        </div>
        <div style={{ textAlign: "right", fontSize: 12, color: "#cbd5e1" }}>
          <div>{settings.appName}</div>
          <div>{settings.environment}</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 16 }}>
        {health.map((entry) => (
          <div key={entry.provider} style={{ borderRadius: 16, padding: 12, background: "rgba(15, 23, 42, 0.85)" }}>
            <div style={{ fontWeight: 700 }}>{entry.provider}</div>
            <div style={{ fontSize: 12, color: "#93c5fd", marginTop: 4 }}>{entry.state}</div>
            <div style={{ fontSize: 12, color: "#cbd5e1", marginTop: 6 }}>Latency: {entry.latency}ms</div>
            <div style={{ fontSize: 12, color: "#cbd5e1" }}>Tokens: {entry.tokenUsage}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 }}>
        <div>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Runtime</div>
          <div style={{ fontSize: 13, lineHeight: 1.55, color: "#cbd5e1" }}>
            <div>Active Provider: {runtimeState.activeProvider ?? "none"}</div>
            <div>Queue: {runtimeState.queueSize}</div>
            <div>Recent Requests: {runtimeState.recentRequests.length}</div>
            <div>Recent Responses: {runtimeState.recentResponses.length}</div>
            <div>Errors: {runtimeState.recentErrors.length}</div>
            <div>Failovers: {runtimeState.failoverEvents.length}</div>
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Notifications</div>
          <div style={{ fontSize: 13, lineHeight: 1.55, color: "#cbd5e1" }}>
            {runtimeState.notifications.length === 0 ? <div>None yet.</div> : runtimeState.notifications.map((entry, index) => (
              <div key={`${entry.message}-${index}`}>{entry.message}</div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Live Logs</div>
        <LiveLogViewer />
      </div>

      <div style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Recent Activity</div>
        <div style={{ fontSize: 12, color: "#cbd5e1", display: "grid", gap: 6 }}>
          {logs.slice(-8).map((entry) => (
            <div key={entry.id} style={{ background: "rgba(15, 23, 42, 0.72)", borderRadius: 10, padding: 8 }}>
              <div style={{ color: "#f8fafc" }}>{entry.message}</div>
              <div style={{ color: "#93c5fd", marginTop: 2 }}>{entry.provider} • {entry.type}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
