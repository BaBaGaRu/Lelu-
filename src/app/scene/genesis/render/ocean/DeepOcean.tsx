/**
 * ==========================================================
 * LÉLUVERSE
 * DEEP OCEAN
 *
 * The deepest visible body of water surrounding
 * the Genesis Core.
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
    () => Array.from({ length: 2 }),
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
      delta * 0.025 * current;

    ocean.current.rotation.x =
      Math.sin(time.current * 0.12) *
      0.02 *
      tide;

    ocean.current.rotation.z =
      Math.cos(time.current * 0.08) *
      0.015 *
      tide;

    const breathe =
      1 +
      Math.sin(time.current * 0.5) *
      0.02 *
      tide +
      tsunami *
      0.04;

    ocean.current.scale.setScalar(
      breathe,
    );

    ocean.current.children.forEach((child, i) => {

      child.rotation.y +=
        delta *
        (0.008 + i * 0.003) *
        current;

      child.rotation.x =
        Math.sin(
          time.current * 0.15 + i,
        ) *
        0.01;

    });

  });

  return (

    <group ref={ocean} renderOrder={20}>

      {shells.map((_, i) => {

        const radius =
          2.85 + i * 0.2;

        const opacity =
          0.12 - i * 0.03;

        return (

          <mesh
            key={i}
            renderOrder={20 + i}
          >

            <sphereGeometry
              args={[
                radius,
                256,
                256,
              ]}
            />

            <meshPhysicalMaterial

              color={
                i === 0
                  ? "#00142e"
                  : "#005f95"
              }

              transparent

              opacity={opacity}

              transmission={0.12}

              roughness={0.08}

              metalness={0}

              clearcoat={1}

              clearcoatRoughness={0}

              depthWrite={false}

              depthTest={true}

            />

          </mesh>

        );

      })}

      <pointLight

        color="#009dff"

        intensity={6}

        distance={40}

      />

      <pointLight

        color="#66d9ff"

        intensity={4}

        distance={30}

        position={[0, 0, 3]}

      />

    </group>

  );

}