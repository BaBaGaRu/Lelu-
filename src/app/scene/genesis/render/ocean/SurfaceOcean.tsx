/**
 * ==========================================================
 * LÉLUVERSE
 * SURFACE OCEAN
 *
 * The visible outer skin of the Genesis Ocean.
 *
 * Responsibilities
 * ----------------
 * • Surface waves
 * • Planetary shimmer
 * • Slow rolling motion
 * • Tsunami expansion
 * • Living water shell
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Group } from "three";

import type { OceanState } from "./Ocean";

interface Props {
  oceanState?: OceanState;
}

export default function SurfaceOcean({
  oceanState = {},
}: Props) {

  const surface = useRef<Group>(null);

  const bands = useMemo(
    () => Array.from({ length: 8 }),
    [],
  );

  const time = useRef(0);

  useFrame((_, delta) => {

    if (!surface.current) return;

    time.current += delta;

    const tide =
      oceanState.tide ?? 0.5;

    const current =
      oceanState.current ?? 0.5;

    const tsunami =
      oceanState.tsunami ?? 0;

    surface.current.rotation.y +=
      delta *
      0.08 *
      current;

    surface.current.rotation.x =
      Math.sin(
        time.current * 0.12,
      ) *
      0.02 *
      tide;

    surface.current.rotation.z =
      Math.cos(
        time.current * 0.18,
      ) *
      0.015 *
      tide;

    const swell =
      1 +
      Math.sin(
        time.current * 1.4,
      ) *
      0.01 *
      tide +
      tsunami *
      0.03;

    surface.current.scale.set(
      swell,
      swell,
      swell,
    );

    surface.current.children.forEach(
      (child, i) => {

        child.rotation.z +=
          delta *
          (0.05 + i * 0.01);

        child.rotation.y +=
          delta *
          current *
          (0.03 + i * 0.01);

      },
    );

  });

  return (

    <group ref={surface}>

      {/* Main Water Surface */}

      <mesh>

        <sphereGeometry
          args={[
            2.18,
            128,
            128,
          ]}
        />

        <meshPhysicalMaterial

          color="#1da7ff"

          transparent

          opacity={0.10}

          transmission={0.95}

          roughness={0.08}

          metalness={0}

          clearcoat={1}

          clearcoatRoughness={0}

        />

      </mesh>

      {/* Moving Surface Bands */}

      {bands.map((_, i) => (

        <mesh
          key={i}
          rotation={[
            Math.PI / 2,
            0,
            (Math.PI / 8) * i,
          ]}
        >

          <torusGeometry
            args={[
              2.22 + i * 0.03,
              0.004,
              32,
              256,
            ]}
          />

          <meshBasicMaterial

            color={
              i % 2 === 0
                ? "#8cecff"
                : "#39bfff"
            }

            transparent

            opacity={
              0.05 +
              i * 0.006
            }

          />

        </mesh>

      ))}

      {/* Surface Glow */}

      <pointLight
        color="#6dd8ff"
        intensity={2}
        distance={20}
      />

    </group>

  );

}