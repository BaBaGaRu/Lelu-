/**
 * ==========================================================
 * LÉLUVERSE
 * OCEAN SYSTEM
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";

import { Mesh } from "three";

import { useRef } from "react";

import { useGenesis } from "../GenesisCore";

export default function OceanSystem() {

  const genesis = useGenesis();

  const ocean = useRef<Mesh>(null);

  useFrame((_, delta) => {

    if (!ocean.current) return;

    const g = genesis.current;

    ocean.current.rotation.y +=

      delta * 0.03;

    ocean.current.visible =

      g.life > 0.15;

  });

  return (

    <mesh ref={ocean}>

      <sphereGeometry args={[0.985,64,64]} />

      <meshStandardMaterial

        color="#2266dd"

        transparent

        opacity={0.75}

        roughness={0.25}

        metalness={0.05}

      />

    </mesh>

  );

}