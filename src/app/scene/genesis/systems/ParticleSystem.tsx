/**
 * ==========================================================
 * LÉLUVERSE
 * PARTICLE SYSTEM
 * ==========================================================
 */

import { Sparkles } from "@react-three/drei";

import { useGenesis } from "../GenesisCore";

export default function ParticleSystem() {

  const g = useGenesis().current;

  return (

    <Sparkles

      count={

        Math.floor(

          2500 +

          g.energy *

          4000,

        )

      }

      scale={40}

      size={

        3 +

        g.chaos * 2

      }

      speed={

        0.5 +

        g.energy * 2

      }

    />

  );

}