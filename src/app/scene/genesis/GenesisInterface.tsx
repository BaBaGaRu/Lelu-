/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS INTERFACE
 * ==========================================================
 */

import { useMemo } from "react";
import { useGenesis } from "./GenesisCore";
import GenesisChat from "./GenesisChat";

export default function GenesisInterface() {
  const {
    state,
    openPanel,
    focusWorkspace,
    selectDestination,
    addMessage,
    setThinking,
    notify,
  } = useGenesis();

  const workspaces = useMemo(() => state.cognition?.workspaces ?? [], [state.cognition?.workspaces]);

  function handleWorkspace(id: string, name: string, index: number) {
    focusWorkspace(id);
    selectDestination({
      id,
      type: "workspace",
      name,
      position: { x: index * 3 - 3, y: 0, z: -5 },
    });
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 20,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          pointerEvents: "auto",
          maxWidth: 320,
          width: "calc(100vw - 32px)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          <button type="button" onClick={() => openPanel("chat")}>Chat</button>
          <button type="button" onClick={() => handleWorkspace("core", "Genesis Core", 0)}>Core</button>
          <button type="button" onClick={() => handleWorkspace("research", "Research Lab", 1)}>Research</button>
          <button type="button" onClick={() => handleWorkspace("creation", "Creation Studio", 2)}>Create</button>
        </div>

        <div
          style={{
            background: "rgba(2, 6, 23, 0.8)",
            border: "1px solid rgba(255,255,255,0.16)",
            borderRadius: 16,
            padding: 12,
            color: "white",
            backdropFilter: "blur(16px)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <strong>Genesis</strong>
            <span style={{ opacity: 0.75 }}>{state.runtimeReady ? "Live" : "Booting"}</span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
            {workspaces.map((workspace: any, index: number) => (
              <button
                key={workspace.id ?? index}
                type="button"
                onClick={() => handleWorkspace(workspace.id ?? String(index), workspace.name ?? "Workspace", index)}
              >
                {workspace.name ?? "Workspace"}
              </button>
            ))}
          </div>

          <div style={{ opacity: 0.8, fontSize: 12, marginBottom: 10 }}>
            Active destination: {state.activeDestination ?? "None"}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <GenesisChat addMessage={addMessage} setThinking={setThinking} notify={notify} />
            <div style={{ fontSize: 12, opacity: 0.7 }}>
              {state.messages.length > 0 ? `${state.messages.length} messages tracked` : "No messages yet"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
