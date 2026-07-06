/**
 * ==========================================================
 * LÉLUVERSE
 * PLANET SYSTEM
 *
 * Forms the first planetary body from Genesis matter.
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

import { useGenesis } from "../GenesisCore";

export default function PlanetSystem() {

  const genesis = useGenesis();

  const planet = useRef<Mesh>(null);

  useFrame((_, delta) => {

    if (!planet.current) return;

    const g = genesis.current;

    planet.current.rotation.y +=

      delta *

      0.08 *

      (1 + g.energy);

    planet.current.rotation.x +=

      delta *

      0.015;

    const scale =

      0.25 +

      g.matter *

      0.75;

    planet.current.scale.setScalar(scale);

    planet.current.visible =

      g.matter > 0.1;

  });

  return (

    <mesh ref={planet}>

      <icosahedronGeometry args={[1, 6]} />

      <meshStandardMaterial

        color="#4b7a55"

        roughness={0.9}

        metalness={0.05}

      />

    </mesh>

  );

}