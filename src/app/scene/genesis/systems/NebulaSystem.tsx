/**
 * ==========================================================
 * LÉLUVERSE
 * NEBULA SYSTEM
 * ==========================================================
 */

import { Sparkles } from "@react-three/drei";

import { useGenesis } from "../GenesisCore";

export default function NebulaSystem() {

  const g = useGenesis().current;

  if (g.energy < 0.15) return null;

  return (

    <Sparkles

      count={600}

      scale={20}

      size={3}

      speed={0.2}

    />

  );

}