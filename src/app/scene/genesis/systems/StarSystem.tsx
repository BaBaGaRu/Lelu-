/**
 * ==========================================================
 * LÉLUVERSE
 * STAR SYSTEM
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { useRef } from "react";

import { useGenesis } from "../GenesisCore";

export default function StarSystem() {

  const genesis = useGenesis();

  const star = useRef<Mesh>(null);

  useFrame((_, delta) => {

    if (!star.current) return;

    const g = genesis.current;

    star.current.rotation.y += delta * 0.12;

    const pulse =
      1 +
      Math.sin(g.age * 2) *
      0.05;

    star.current.scale.setScalar(pulse);

    star.current.visible =
      g.energy > 0.1;

  });

  return (

    <mesh ref={star}>

      <sphereGeometry args={[0.4, 64, 64]} />

      <meshStandardMaterial

        color="#ffe58a"

        emissive="#ffcc55"

        emissiveIntensity={3}

        toneMapped={false}

      />

    </mesh>

  );

}