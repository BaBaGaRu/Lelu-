/**
 * ==========================================================
 * LÉLUVERSE
 * NEURON SYSTEM
 * ==========================================================
 */

import { Sparkles } from "@react-three/drei";

import { useGenesis } from "../GenesisCore";

export default function NeuronSystem() {

  const g = useGenesis().current;

  return (

    <Sparkles

      count={Math.floor(100 + g.intelligence * 600)}

      scale={5}

      size={2}

      speed={0.5}

      opacity={0.8}

    />

  );

}