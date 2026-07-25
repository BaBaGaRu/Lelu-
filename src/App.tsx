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

import GenesisScene from "./app/scene/genesis/GenesisScene";
import InterfaceManager from "./ui/windows/InterfaceManager";
import LogsWindow from "./ui/windows/LogsWindow";
import LeluAssistant from "./abilities/assistant/LeluAssistant";
import StartupOrchestrator from "./core/StartupOrchestrator";

import "./App.css";
import "./ui/styles/chat.css";

export default function App() {
  const assistant = useMemo(
    () => new LeluAssistant(),
    [],
  );
  const startup = useMemo(() => new StartupOrchestrator(), []);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLogsOpen, setIsLogsOpen] = useState(false);
  const [isApiConsoleOpen, setIsApiConsoleOpen] = useState(false);
  const [authState, setAuthState] = useState(() => startup.getAuthService().getSnapshot());
  const [startupState, setStartupState] = useState(() => startup.getState());

  const toggleChat = () => {
    setIsChatOpen((current) => !current);
  };

  const toggleLogs = () => {
    setIsLogsOpen((current) => !current);
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
      <div style={{ position: "absolute", top: 16, left: 16, zIndex: 10, display: "flex", flexDirection: "column", gap: 6, fontSize: 12, color: "#f8fafc", background: "rgba(2,6,23,0.7)", padding: "8px 10px", borderRadius: 12 }}>
        <div>Auth: {authState.isAuthenticated ? "ready" : authState.isGuest ? "guest" : "idle"}</div>
        <div>Startup: {startupState.phase}</div>
        <div>Voice: {assistant.state.voiceEnabled ? "enabled" : "off"}</div>
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
          onToggleLogs={toggleLogs}
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

      <InterfaceManager
        assistant={assistant}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        panel="chat"
      />

      <LogsWindow
        assistant={assistant}
        isOpen={isLogsOpen}
        onClose={() => setIsLogsOpen(false)}
      />

      <APIConsole
        orchestrator={assistant.orchestrator}
        isOpen={isApiConsoleOpen}
      />
    </main>
  );
}