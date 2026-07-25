import { useEffect, useMemo, useState } from "react";
import type AgentOrchestrator from "../../core/AgentOrchestrator";

interface MissionControlPanelProps {
  orchestrator: AgentOrchestrator;
}

export default function MissionControlPanel({ orchestrator }: MissionControlPanelProps) {
  const [snapshot, setSnapshot] = useState(() => orchestrator.getSnapshot());

  useEffect(() => {
    const interval = window.setInterval(() => setSnapshot(orchestrator.getSnapshot()), 1200);
    return () => window.clearInterval(interval);
  }, [orchestrator]);

  const stats = useMemo(() => ({
    agents: snapshot.agents.filter((agent) => agent.status === "running" || agent.status === "ready").length,
    queue: snapshot.queue.length,
    activity: snapshot.activity.length,
  }), [snapshot]);

  return (
    <div style={{ display: "grid", gap: 12, padding: 12, borderRadius: 16, background: "rgba(10,16,30,0.86)", border: "1px solid rgba(71,85,105,0.6)", color: "#e2e8f0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: "0.28em", color: "#93c5fd", textTransform: "uppercase" }}>Mission Control</div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>Live operations</div>
        </div>
        <div style={{ fontSize: 12, color: "#4ade80" }}>{stats.agents} agents • {stats.queue} queued</div>
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        {snapshot.agents.map((agent) => (
          <div key={agent.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13 }}>
            <span>{agent.name}</span>
            <span style={{ color: agent.status === "error" ? "#f87171" : agent.status === "running" ? "#facc15" : "#4ade80" }}>{agent.status}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        {snapshot.activity.slice(-6).map((entry) => (
          <div key={entry.id} style={{ fontSize: 12, color: "#cbd5e1" }}>{entry.message}</div>
        ))}
      </div>
    </div>
  );
}
