/**
 * ==========================================================
 * LÉLUVERSE
 * QUANTUM SYSTEM
 * ==========================================================
 */

import { Sparkles } from "@react-three/drei";

import { useGenesis } from "../GenesisCore";

export default function QuantumSystem() {

  const g = useGenesis().current;

  return (

    <Sparkles

      count={Math.floor(500 + g.energy * 1500)}

      scale={12}

      size={1}

      speed={3}

    />

  );

}