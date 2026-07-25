/**
 * ==========================================================
 * LÉLUVERSE
 * APPLICATION ROOT
 * ==========================================================
 */

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useState } from "react";

import GenesisScene from "./app/scene/genesis/GenesisScene";
import InterfaceManager from "./ui/windows/InterfaceManager";
import LeluAssistant from "./abilities/assistant/LeluAssistant";

import "./App.css";
import "./ui/styles/chat.css";

export default function App() {
  const assistant = useMemo(
    () => new LeluAssistant(),
    [],
  );

  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen((current) => !current);
  };

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
        onClose={() =>
          setIsChatOpen(false)
        }
      />
    </main>
  );
}