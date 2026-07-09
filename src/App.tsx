/**
 * ==========================================================
 * LÉLUVERSE
 * APPLICATION ROOT
 * ==========================================================
 */

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo } from "react";

import GenesisScene from "./app/scene/genesis/GenesisScene";
import LeluAssistant from "./abilities/assistant/LeluAssistant";
import LeluAssistantPanel from "./ui/components/LeluAssistantPanel";

import "./App.css";

export default function App() {
  const assistant = useMemo(() => new LeluAssistant(), []);

  return (
    <main className="app">
      <Canvas
        shadows
        camera={{
          position: [0, 0, 8],
          fov: 55,
        }}
      >
        <color attach="background" args={["#000000"]} />

        <ambientLight intensity={0.15} />

        <GenesisScene />

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

      <LeluAssistantPanel assistant={assistant} />
    </main>
  );
}