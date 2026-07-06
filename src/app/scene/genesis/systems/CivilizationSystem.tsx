/**
 * ==========================================================
 * LÉLUVERSE
 * CIVILIZATION SYSTEM
 * ==========================================================
 */

import { Sparkles } from "@react-three/drei";

import { useGenesis } from "../GenesisCore";

export default function CivilizationSystem() {

  const g = useGenesis().current;

  if (

    g.civilizations <= 0

  ) return null;

  return (

    <Sparkles

      count={

        Math.floor(

          300 +

          g.civilizations *

          2000,

        )

      }

      scale={4}

      size={2}

      speed={1.2}

    />

  );

}