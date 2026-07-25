/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS INTERFACE
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

import LeluAssistant from "../../../abilities/assistant/LeluAssistant";

interface GenesisInterfaceProps {
  assistant: LeluAssistant;
  isChatOpen: boolean;
  onToggleChat: () => void;
}

export default function GenesisInterface({
  assistant: _assistant,
  isChatOpen,
  onToggleChat,
}: GenesisInterfaceProps) {
  const meshRef = useRef<Mesh | null>(null);

  useFrame(({ clock }, delta) => {
    if (!meshRef.current) {
      return;
    }

    meshRef.current.rotation.y += delta * 0.7;
    meshRef.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 2.2) * 0.05);
  });

  return (
    <group position={[2.4, 0.8, 0]}>
      <mesh
        ref={meshRef}
        onClick={(event) => {
          event.stopPropagation();
          onToggleChat();
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}
      >
        <sphereGeometry args={[0.2, 24, 24]} />
        <meshStandardMaterial
          color={isChatOpen ? "#38bdf8" : "#fef3c7"}
          emissive={isChatOpen ? "#0f172a" : "#f59e0b"}
          emissiveIntensity={0.45}
        />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#f8fafc" transparent opacity={0.9} />
      </mesh>
    </group>
  );
}