/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS INTERFACE
 *
 * Living companion interface.
 *
 * - Core presence
 * - radial controls
 * - cognition status
 * - integrated chat
 * ==========================================================
 */


import {
  Html,
} from "@react-three/drei";

import GenesisChat from "./GenesisChat";

import {
  useGenesis,
} from "./GenesisCore";





export default function GenesisInterface() {
  const { state, openPanel, minimize, expand, addMessage, setThinking, notify } = useGenesis();
  const activity = state.actions.length;

  const renderPanel = () => {
    if (state.activePanel === "chat") {
      return (
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ maxHeight: 220, overflowY: "auto", display: "grid", gap: 8 }}>
            {state.messages.length === 0 ? (
              <div style={{ opacity: 0.8, fontSize: 14 }}>No conversation yet. Start the living loop.</div>
            ) : (
              state.messages.slice(-8).map((message) => (
                <div key={message.id} style={{ padding: "8px 10px", borderRadius: 12, background: "rgba(255,255,255,0.06)" }}>
                  <div style={{ fontSize: 11, textTransform: "uppercase", opacity: 0.7 }}>{message.role}</div>
                  <div style={{ marginTop: 4 }}>{message.text}</div>
                </div>
              ))
            )}
          </div>
          <GenesisChat addMessage={addMessage} setThinking={setThinking} notify={notify} />
        </div>
      );
    }

    if (state.activePanel === "history") {
      return (
        <div style={{ display: "grid", gap: 10 }}>
          {state.actions.length === 0 ? (
            <div style={{ opacity: 0.8 }}>No actions yet.</div>
          ) : (
            state.actions.slice(-6).map((action) => (
              <div key={action.id} style={{ padding: "10px 12px", borderRadius: 12, background: "rgba(255,255,255,0.06)" }}>
                <div style={{ fontWeight: 600 }}>{action.label}</div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>{action.type} • {action.status}</div>
              </div>
            ))
          )}
        </div>
      );
    }

    if (state.activePanel === "logs") {
      return (
        <div style={{ display: "grid", gap: 10 }}>
          {state.notifications.length === 0 ? (
            <div style={{ opacity: 0.8 }}>No system logs yet.</div>
          ) : (
            state.notifications.slice(-6).map((notification) => (
              <div key={notification.id} style={{ padding: "10px 12px", borderRadius: 12, background: "rgba(255,255,255,0.06)" }}>
                <div style={{ fontWeight: 600 }}>{notification.title}</div>
                {notification.description ? <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>{notification.description}</div> : null}
              </div>
            ))
          )}
        </div>
      );
    }

    if (state.activePanel === "agents") {
      const agents = (state.cognition?.agents ?? []) as Array<{ id?: string; name?: string; role?: string }>;
      return (
        <div style={{ display: "grid", gap: 10 }}>
          {agents.length === 0 ? (
            <div style={{ opacity: 0.8 }}>No agents connected.</div>
          ) : (
            agents.map((agent, index) => (
              <div key={agent.id ?? `${agent.name}-${index}`} style={{ padding: "10px 12px", borderRadius: 12, background: "rgba(255,255,255,0.06)" }}>
                <div style={{ fontWeight: 600 }}>{agent.name ?? "Agent"}</div>
                <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>{agent.role ?? "Active"}</div>
              </div>
            ))
          )}
        </div>
      );
    }

    if (state.activePanel === "workspaces") {
      const workspaces = (state.cognition?.workspaces ?? []) as Array<{ id?: string; name?: string }>;
      return (
        <div style={{ display: "grid", gap: 10 }}>
          {workspaces.length === 0 ? (
            <div style={{ opacity: 0.8 }}>No workspaces available.</div>
          ) : (
            workspaces.map((workspace, index) => (
              <div key={workspace.id ?? `${workspace.name}-${index}`} style={{ padding: "10px 12px", borderRadius: 12, background: "rgba(255,255,255,0.06)" }}>
                <div style={{ fontWeight: 600 }}>{workspace.name ?? "Workspace"}</div>
                <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>Interactive route • {workspace.id ?? "workspace"}</div>
              </div>
            ))
          )}
        </div>
      );
    }

    return null;
  };

  const panelLabel = state.activePanel === "none" ? "Core" : state.activePanel;

  return (
    <Html fullscreen transform={false} pointerEvents="none">
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>
        {state.minimized ? (
          <button
            onClick={expand}
            style={{
              position: "absolute",
              right: 24,
              bottom: 24,
              width: 80,
              height: 80,
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              pointerEvents: "auto",
              fontSize: 36,
              background: "radial-gradient(circle,#fff,#7c3aed,#020617)",
              boxShadow: "0 0 60px #7c3aed",
            }}
          >
            🌌
          </button>
        ) : (
          <div
            style={{
              position: "absolute",
              right: 30,
              bottom: 30,
              pointerEvents: "auto",
              width: 390,
              maxWidth: "90vw",
            }}
          >
            <div
              onClick={() => openPanel("chat")}
              style={{
                width: 110,
                height: 110,
                marginLeft: "auto",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 48,
                cursor: "pointer",
                background: state.thinking
                  ? "radial-gradient(circle,#fff,#ff9900,#6d28d9)"
                  : "radial-gradient(circle,#fff,#7c3aed,#020617)",
                boxShadow: state.thinking ? "0 0 90px #ff9900" : "0 0 60px #7c3aed",
              }}
            >
              🌌
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 15, flexWrap: "wrap" }}>
              <button onClick={() => openPanel("chat")} style={{ borderRadius: 999, padding: "8px 12px", border: "1px solid rgba(255,255,255,0.2)", background: state.activePanel === "chat" ? "rgba(56,189,248,0.2)" : "rgba(255,255,255,0.08)", color: "white", cursor: "pointer" }}>💬</button>
              <button onClick={() => openPanel("history")} style={{ borderRadius: 999, padding: "8px 12px", border: "1px solid rgba(255,255,255,0.2)", background: state.activePanel === "history" ? "rgba(56,189,248,0.2)" : "rgba(255,255,255,0.08)", color: "white", cursor: "pointer" }}>🧠</button>
              <button onClick={() => openPanel("logs")} style={{ borderRadius: 999, padding: "8px 12px", border: "1px solid rgba(255,255,255,0.2)", background: state.activePanel === "logs" ? "rgba(56,189,248,0.2)" : "rgba(255,255,255,0.08)", color: "white", cursor: "pointer" }}>✨</button>
              <button onClick={() => openPanel("agents")} style={{ borderRadius: 999, padding: "8px 12px", border: "1px solid rgba(255,255,255,0.2)", background: state.activePanel === "agents" ? "rgba(56,189,248,0.2)" : "rgba(255,255,255,0.08)", color: "white", cursor: "pointer" }}>🤖</button>
              <button onClick={() => openPanel("workspaces")} style={{ borderRadius: 999, padding: "8px 12px", border: "1px solid rgba(255,255,255,0.2)", background: state.activePanel === "workspaces" ? "rgba(56,189,248,0.2)" : "rgba(255,255,255,0.08)", color: "white", cursor: "pointer" }}>🗂️</button>
              <button onClick={minimize} style={{ borderRadius: 999, padding: "8px 12px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.08)", color: "white", cursor: "pointer" }}>◌</button>
            </div>

            <div style={{ marginTop: 18, padding: 18, borderRadius: 24, background: "rgba(2, 6, 23, 0.8)", backdropFilter: "blur(20px)", border: "1px solid rgba(125, 211, 252, 0.24)", boxShadow: "0 20px 50px rgba(0,0,0,0.35)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#7dd3fc" }}>{panelLabel}</div>
                  <div style={{ fontSize: 17, fontWeight: 600 }}>{state.activePanel === "none" ? "Genesis Core" : state.activePanel.replace(/(^\w|-\w)/g, (m) => m.toUpperCase())}</div>
                </div>
                <button onClick={() => openPanel("none")} style={{ borderRadius: 999, padding: "6px 10px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.08)", color: "white", cursor: "pointer" }}>Hide</button>
              </div>
              {renderPanel()}
            </div>

            <div style={{ textAlign: "right", marginTop: 10, opacity: 0.85 }}>
              {state.thinking ? "Lélu thinking" : `${activity} active events`}
            </div>
          </div>
        )}
      </div>
    </Html>
  );
}