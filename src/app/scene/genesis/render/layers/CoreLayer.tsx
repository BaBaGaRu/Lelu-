/**
 * ==========================================================
 * LÉLUVERSE
 * CORE LAYER
 *
 * Living Heart of the Universe
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";

import {
  Mesh,
  Color,
} from "three";

import {
  useMemo,
  useRef,
} from "react";

import { useGenesis } from "../../GenesisCore";

export default function CoreLayer() {

  const genesis =
    useGenesis();

  const aura =
    useRef<Mesh>(null);

  const shell =
    useRef<Mesh>(null);

  const core =
    useRef<Mesh>(null);

  const color =
    useMemo(
      () => new Color(),
      [],
    );

  useFrame((_, delta) => {

    const g =
      genesis.current;

    const t =
      g.age;

    if (
      aura.current
    ) {

      aura.current.rotation.x +=
        delta * 0.05;

      aura.current.rotation.y +=
        delta * 0.08;

      const s =

        2.4 +

        Math.sin(
          t * 1.5,
        ) * 0.08;

      aura.current.scale.set(
        s,
        s,
        s,
      );

    }

    if (
      shell.current
    ) {

      shell.current.rotation.y +=
        delta * 0.20;

      shell.current.rotation.z +=
        delta * 0.12;

    }

    if (
      core.current
    ) {

      core.current.rotation.y +=
        delta * 0.50;

      core.current.rotation.x +=
        delta * 0.20;

      const pulse =

        1 +

        Math.sin(
          t * 3,
        ) * 0.05;

      core.current.scale.set(
        pulse,
        pulse,
        pulse,
      );

    }

    color.setHSL(

      0.60 +

      Math.sin(
        t * 0.10,
      ) * 0.08,

      0.9,

      0.6,

    );

  });

  return (

    <group>

      {/* Aura */}

      <mesh
        ref={aura}
      >

        <sphereGeometry
          args={[2.5,64,64]}
        />

        <meshBasicMaterial

          color="#66bbff"

          transparent

          opacity={0.08}

          wireframe

        />

      </mesh>

      {/* Plasma Shell */}

      <mesh
        ref={shell}
      >

        <icosahedronGeometry
          args={[1.6,8]}
        />

        <meshStandardMaterial

          color="#66ccff"

          emissive="#2277ff"

          emissiveIntensity={5}

          metalness={0.2}

          roughness={0.3}

          transparent

          opacity={0.45}

        />

      </mesh>

      {/* Living Core */}

      <mesh
        ref={core}
      >

        <icosahedronGeometry
          args={[1.0,20]}
        />

        <meshStandardMaterial

          color="#ffffff"

          emissive="#55aaff"

          emissiveIntensity={10}

          metalness={0.1}

          roughness={0}

        />

      </mesh>

    </group>

  );

}