/**
 * ==========================================================
 * LÉLUVERSE
 * ATMOSPHERE SYSTEM
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { useRef } from "react";

import { useGenesis } from "../GenesisCore";

export default function AtmosphereSystem() {

  const genesis = useGenesis();

  const atmosphere = useRef<Mesh>(null);

  useFrame((_, delta) => {

    if (!atmosphere.current) return;

    const g = genesis.current;

    atmosphere.current.rotation.y +=

      delta * 0.01;

    const scale =

      1.08 +

      g.life * 0.04;

    atmosphere.current.scale.setScalar(scale);

    atmosphere.current.visible =

      g.life > 0.05;

  });

  return (

    <mesh ref={atmosphere}>

      <sphereGeometry args={[1.05,64,64]} />

      <meshBasicMaterial

        color="#7fdfff"

        transparent

        opacity={0.12}

        depthWrite={false}

      />

    </mesh>

  );

}