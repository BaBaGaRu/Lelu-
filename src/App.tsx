/**
 * ==========================================================
 * LÉLUVERSE
 * APPLICATION ROOT
 * ==========================================================
 */

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useMemo, useState } from "react";
import APIConsole from "./ui/components/APIConsole";
import VoiceDebugPanel from "./ui/components/VoiceDebugPanel";
import MissionControlPanel from "./ui/components/MissionControlPanel";
import WorkspaceShell from "./ui/components/WorkspaceShell";

import GenesisScene from "./app/scene/genesis/GenesisScene";
import LeluAssistant from "./abilities/assistant/LeluAssistant";
import StartupOrchestrator from "./core/StartupOrchestrator";
import AgentOrchestrator from "./core/AgentOrchestrator";

import "./App.css";
import "./ui/styles/chat.css";

export default function App() {
  const assistant = useMemo(
    () => new LeluAssistant(),
    [],
  );
  const startup = useMemo(() => new StartupOrchestrator(), []);
  const missionControl = useMemo(() => new AgentOrchestrator(), []);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isApiConsoleOpen, setIsApiConsoleOpen] = useState(false);
  const [authState, setAuthState] = useState(() => startup.getAuthService().getSnapshot());
  const [startupState, setStartupState] = useState(() => startup.getState());

  const toggleChat = () => {
    setIsChatOpen((current) => !current);
  };

  useEffect(() => {
    void startup.boot(assistant.voice).then(() => {
      setAuthState(startup.getAuthService().getSnapshot());
      setStartupState(startup.getState());
    });
  }, [assistant.voice, startup]);

  return (
    <main
      className="app"
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 16, left: 16, zIndex: 10, display: "flex", flexDirection: "column", gap: 10, fontSize: 12, color: "#f8fafc" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, background: "rgba(2,6,23,0.7)", padding: "8px 10px", borderRadius: 12 }}>
          <div>Auth: {authState.isAuthenticated ? "ready" : authState.isGuest ? "guest" : "idle"}</div>
          <div>Startup: {startupState.phase}</div>
          <div>Voice: {assistant.state.voiceEnabled ? "enabled" : "off"}</div>
        </div>
        <VoiceDebugPanel voiceService={assistant.voice} />
        <MissionControlPanel orchestrator={missionControl} />
      </div>

      <Canvas
        shadows
        camera={{
          position: [0, 0, 8],
          fov: 55,
        }}
      >
        <color
          attach="background"
          args={["#000000"]}
        />

        <ambientLight intensity={0.15} />

        <GenesisScene
          assistant={assistant}
          isChatOpen={isChatOpen}
          onToggleChat={toggleChat}
          onToggleLogs={() => undefined}
          onToggleApiConsole={() => setIsApiConsoleOpen((current) => !current)}
        />

        <OrbitControls
          enablePan={false}
          enableZoom
          enableRotate
          minDistance={2}
          maxDistance={40}
          autoRotate
          autoRotateSpeed={0.08}
        />
      </Canvas>

      <WorkspaceShell
        assistant={assistant}
        missionControl={missionControl}
      />

      <APIConsole
        orchestrator={assistant.orchestrator}
        isOpen={isApiConsoleOpen}
      />
    </main>
  );
}