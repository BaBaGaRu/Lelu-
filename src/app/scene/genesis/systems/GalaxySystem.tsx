/**
 * ==========================================================
 * LÉLUVERSE
 * GALAXY SYSTEM
 * ==========================================================
 */

import { Group, MeshBasicMaterial, Color } from "three";

import { useFrame } from "@react-three/fiber";

import { useMemo, useRef } from "react";

import { useGenesis } from "../GenesisCore";

export default function GalaxySystem() {

  const galaxy =
    useRef<Group>(null);

  const material =
    useRef<MeshBasicMaterial>(null);

  const genesis =
    useGenesis();

  const color =
    useMemo(
      () => new Color(),
      [],
    );

  useFrame((_, delta) => {

    if (

      !galaxy.current ||

      !material.current

    ) return;

    const g =
      genesis.current;

    /**
     * Rotation
     */

    galaxy.current.rotation.y +=

      delta *

      0.08 *

      (1 + g.energy);

    galaxy.current.rotation.x +=

      delta *

      0.015;

    /**
     * Living Spectrum
     */

    const hue =

      (

        g.age * 0.015 +

        g.energy * 0.15 +

        g.awareness * 0.25

      ) % 1;

    const saturation =

      0.75 +

      g.awareness * 0.25;

    const lightness =

      0.45 +

      Math.sin(

        g.age * 3,

      ) * 0.08;

    color.setHSL(

      hue,

      saturation,

      lightness,

    );

    material.current.color.copy(
      color,
    );

    /**
     * Cosmic Pulse
     */

    material.current.opacity =

      0.10 +

      Math.sin(

        g.age * 5,

      ) *

      0.05 +

      g.energy *

      0.12;

  });

  return (

    <group ref={galaxy}>

      <mesh>

        <torusGeometry

          args={[
            4,
            0.03,
            32,
            600,
          ]}

        />

        <meshBasicMaterial

          ref={material}

          toneMapped={false}

          transparent

          opacity={0.2}

        />

      </mesh>

      <mesh rotation={[0,0,1.57]}>

        <torusGeometry

          args={[
            4.3,
            0.015,
            16,
            400,
          ]}

        />

        <meshBasicMaterial

          color="#ffffff"

          transparent

          opacity={0.05}

        />

      </mesh>

      <mesh rotation={[1.57,0,0]}>

        <torusGeometry

          args={[
            3.7,
            0.015,
            16,
            400,
          ]}

        />

        <meshBasicMaterial

          color="#88ccff"

          transparent

          opacity={0.04}

        />

      </mesh>

    </group>

  );

}