/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS INTERFACE
 * ==========================================================
 */

import React, { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

  const isChatOpen = state.activePanel === "chat";

  function handleExitChat() {
    openPanel("none");
    focusWorkspace("core");
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
          <button type="button" onClick={() => openPanel("chat")}>Open chat</button>
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
        </div>
      </div>

      <AnimatePresence>
        {isChatOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 220, damping: 24, mass: 0.8 }}
            style={{
              position: "absolute",
              left: "50%",
              bottom: 24,
              transform: "translateX(-50%)",
              width: "min(92vw, 500px)",
              maxWidth: "calc(100vw - 24px)",
              pointerEvents: "auto",
              background: "linear-gradient(135deg, rgba(2, 8, 23, 0.95), rgba(14, 116, 144, 0.7))",
              border: "1px solid rgba(125, 211, 252, 0.4)",
              borderRadius: 24,
              padding: 16,
              color: "white",
              boxShadow: "0 24px 70px rgba(0, 153, 255, 0.28)",
              backdropFilter: "blur(24px)",
              overflow: "hidden",
              transformOrigin: "bottom center",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: "auto 50% 100% auto",
                width: 140,
                height: 2,
                left: "50%",
                top: -10,
                transform: "translateX(-50%)",
                background: "linear-gradient(90deg, transparent, rgba(125, 211, 252, 0.94), transparent)",
                boxShadow: "0 0 18px rgba(125, 211, 252, 0.8)",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", opacity: 0.75 }}>Genesis Core</div>
                <div style={{ fontWeight: 700 }}>Lélu interface</div>
              </div>
              <button type="button" onClick={handleExitChat} style={{ border: "1px solid rgba(255,255,255,0.16)", borderRadius: 999, background: "rgba(255,255,255,0.08)", color: "white", padding: "6px 10px", cursor: "pointer" }}>
                Exit Core
              </button>
            </div>

            <GenesisChat messages={state.messages} addMessage={addMessage} setThinking={setThinking} notify={notify} />
            <div style={{ fontSize: 12, opacity: 0.72, marginTop: 8 }}>
              {state.messages.length > 0 ? `${state.messages.length} messages preserved in Genesis` : "No messages yet"}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
