/**
 * ==========================================================
 * LÉLUVERSE
 * SURFACE OCEAN
 *
 * Living planetary ocean shell.
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
    () => Array.from({ length: 1 }),
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
      0.05 *
      current;

    surface.current.rotation.x =
      Math.sin(
        time.current * 0.12,
      ) *
      0.015 *
      tide;

    surface.current.rotation.z =
      Math.cos(
        time.current * 0.10,
      ) *
      0.01 *
      tide;

    const swell =
      1 +
      Math.sin(
        time.current * 1.2,
      ) *
      0.02 *
      tide +
      tsunami *
      0.05;

    surface.current.scale.setScalar(
      swell,
    );

    surface.current.children.forEach(
      (child, i) => {

        child.rotation.y +=
          delta *
          current *
          (0.02 + i * 0.005);

      },
    );

  });

  return (

    <group
      ref={surface}
      renderOrder={100}
    >

      <mesh renderOrder={100}>

        <sphereGeometry
          args={[
            2.75,
            128,
            128,
          ]}
        />

        <meshPhysicalMaterial

          color="#1da7ff"

          transparent

          opacity={0.12}

          transmission={0}

          roughness={0.15}

          metalness={0}

          clearcoat={1}

          clearcoatRoughness={0}

          reflectivity={1}

          depthWrite={false}

          depthTest={true}

        />

      </mesh>

      {bands.map((_, i) => (

        <mesh
          key={i}
          renderOrder={101 + i}
          rotation={[
            Math.PI / 2,
            0,
            0,
          ]}
        >

          <torusGeometry
            args={[
              2.78,
              0.008,
              24,
              96,
            ]}
          />

          <meshBasicMaterial

            color="#7fe5ff"

            transparent

            opacity={0.08}

            depthWrite={false}

          />

        </mesh>

      ))}

      <pointLight
        color="#7fe5ff"
        intensity={2}
        distance={24}
      />

    </group>

  );

}