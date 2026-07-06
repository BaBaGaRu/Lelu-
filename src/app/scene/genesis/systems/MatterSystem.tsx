/**
 * ==========================================================
 * LÉLUVERSE
 * MATTER SYSTEM
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";

import { useGenesis } from "../GenesisCore";

export default function MatterSystem() {

  const genesis = useGenesis();

  useFrame((_, delta) => {

    const g = genesis.current;

    if (

      g.energy >

      0.6

    ) {

      g.matter = Math.min(

        1,

        g.matter +

        delta *

        0.02,

      );

    }

    else {

      g.matter = Math.max(

        0,

        g.matter -

        delta *

        0.005,

      );

    }

  });

  return null;

}