/**
 * ==========================================================
 * LÉLUVERSE
 * DEEP OCEAN
 *
 * The deepest visible body of water surrounding
 * the Genesis Core.
 *
 * Responsibilities
 * ----------------
 * • Deep water breathing
 * • Slow planetary currents
 * • Depth glow
 * • Internal wave motion
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Group } from "three";

import type { OceanState } from "./Ocean";

interface Props {
  oceanState?: OceanState;
}

export default function DeepOcean({
  oceanState = {},
}: Props) {

  const ocean = useRef<Group>(null);

  const shells = useMemo(
    () => Array.from({ length: 5 }),
    [],
  );

  const time = useRef(0);

  useFrame((_, delta) => {

    if (!ocean.current) return;

    time.current += delta;

    const tide = oceanState.tide ?? 0.5;
    const current = oceanState.current ?? 0.5;
    const tsunami = oceanState.tsunami ?? 0;

    ocean.current.rotation.y +=
      delta * 0.03 * current;

    ocean.current.rotation.x =
      Math.sin(time.current * 0.08) *
      0.03 *
      tide;

    ocean.current.rotation.z =
      Math.cos(time.current * 0.06) *
      0.02 *
      tide;

    const breathe =
      1 +
      Math.sin(time.current * 0.6) *
      0.015 *
      tide +
      tsunami *
      0.02;

    ocean.current.scale.set(
      breathe,
      breathe,
      breathe,
    );

    ocean.current.children.forEach((child, i) => {

      child.rotation.y +=
        delta *
        (0.01 + i * 0.003) *
        current;

      child.rotation.z =
        Math.sin(
          time.current * 0.2 + i,
        ) *
        0.02;

    });

  });

  return (

    <group ref={ocean}>

      {shells.map((_, i) => {

        const radius =
          2.05 + i * 0.025;

        const opacity =
          0.07 - i * 0.01;

        return (

          <mesh key={i}>

            <sphereGeometry
              args={[
                radius,
                128,
                128,
              ]}
            />

            <meshPhysicalMaterial

              color={
                i === 0
                  ? "#00142e"
                  : i === 1
                  ? "#002b55"
                  : i === 2
                  ? "#004f87"
                  : i === 3
                  ? "#006bb3"
                  : "#009dff"
              }

              transparent

              opacity={opacity}

              roughness={0.18}

              metalness={0}

              transmission={0.18}

              clearcoat={1}

              clearcoatRoughness={0.05}

            />

          </mesh>

        );

      })}

      <pointLight
        color="#0077ff"
        intensity={4}
        distance={25}
      />

      <pointLight
        color="#00d4ff"
        intensity={2}
        distance={18}
        position={[0, 0, 2]}
      />

    </group>

  );

}