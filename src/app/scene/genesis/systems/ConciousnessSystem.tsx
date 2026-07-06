/**
 * ==========================================================
 * LÉLUVERSE
 * CONSCIOUSNESS SYSTEM
 * ==========================================================
 */

import { Sparkles } from "@react-three/drei";

import { useGenesis } from "../GenesisCore";

export default function ConsciousnessSystem() {

  const g = useGenesis().current;

  if (g.awareness <= 0) return null;

  return (

    <Sparkles

      count={Math.floor(200 + g.awareness * 1000)}

      scale={6}

      size={2}

      speed={0.8}

    />

  );

}