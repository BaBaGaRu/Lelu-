/**
 * ==========================================================
 * LÉLUVERSE
 * CORE SYSTEM
 *
 * The living heart of Genesis.
 * Everything begins here.
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import { useRef } from "react";

import { useGenesis } from "../GenesisCore";

export default function CoreSystem() {

  const genesis = useGenesis();

  const core = useRef<Group>(null);

  useFrame((_, delta) => {

    const g = genesis.current;

    if (!core.current) return;

    /**
     * Living pulse
     */

    const pulse =

      1 +

      Math.sin(g.age * 2) *

      0.08 *

      (g.energy + 0.5);

    core.current.scale.setScalar(pulse);

    /**
     * Slow consciousness rotation
     */

    core.current.rotation.y +=

      delta *

      (0.05 + g.awareness * 0.2);

    core.current.rotation.x +=

      delta *

      (0.01 + g.curiosity * 0.05);

  });

  return (

    <group ref={core}>

      {/* =====================================================
          Core Shell
      ===================================================== */}

      <mesh>

        <icosahedronGeometry

          args={[0.55, 64]}

        />

        <meshPhysicalMaterial

          color="#88ddff"

          emissive="#55ccff"

          emissiveIntensity={4}

          transmission={1}

          thickness={2}

          roughness={0}

          metalness={0.15}

          clearcoat={1}

          clearcoatRoughness={0}

        />

      </mesh>

      {/* =====================================================
          Inner Core
      ===================================================== */}

      <mesh>

        <sphereGeometry

          args={[0.18, 64, 64]}

        />

        <meshBasicMaterial

          color="#ffffff"

        />

      </mesh>

      {/* =====================================================
          Core Light
      ===================================================== */}

      <pointLight

        intensity={35}

        distance={80}

        color="#77ddff"

      />

    </group>

  );

}