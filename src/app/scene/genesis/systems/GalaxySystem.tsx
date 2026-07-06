/**
 * ==========================================================
 * LÉLUVERSE
 * GALAXY SYSTEM
 * ==========================================================
 */

import { Group } from "three";

import { useFrame } from "@react-three/fiber";

import { useRef } from "react";

import { useGenesis } from "../GenesisCore";

export default function GalaxySystem() {

  const galaxy = useRef<Group>(null);

  const genesis = useGenesis();

  useFrame((_, delta) => {

    if (!galaxy.current) return;

    const g = genesis.current;

    galaxy.current.rotation.y +=

      delta *

      0.04 *

      (1 + g.energy);

    galaxy.current.rotation.x +=

      delta *

      0.01;

  });

  return (

    <group ref={galaxy}>

      <mesh>

        <torusGeometry

          args={[4,0.03,16,400]}

        />

        <meshBasicMaterial

          color="#5577ff"

          transparent

          opacity={0.15}

        />

      </mesh>

    </group>

  );

}