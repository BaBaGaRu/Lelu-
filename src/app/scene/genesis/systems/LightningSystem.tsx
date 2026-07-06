/**
 * ==========================================================
 * LÉLUVERSE
 * LIGHTNING SYSTEM
 *
 * Visualizes Genesis energy as rotating lightning rings.
 * ==========================================================
 */

import { useRef } from "react";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";

import { useGenesis } from "../GenesisCore";

export default function LightningSystem() {

  const genesis = useGenesis();

  const group = useRef<Group>(null);

  useFrame((_, delta) => {

    if (!group.current) return;

    const g = genesis.current;

    group.current.rotation.x += delta * 0.15;

    group.current.rotation.y += delta * (0.4 + g.chaos);

    group.current.rotation.z += delta * 0.08;

    group.current.visible = g.energy > 0.2;

  });

  return (

    <group ref={group}>

      <mesh>

        <torusGeometry args={[1.1, 0.01, 16, 256]} />

        <meshBasicMaterial
          color="#88e5ff"
          transparent
          opacity={0.45}
        />

      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>

        <torusGeometry args={[1.3, 0.01, 16, 256]} />

        <meshBasicMaterial
          color="#66ccff"
          transparent
          opacity={0.25}
        />

      </mesh>

    </group>

  );

}