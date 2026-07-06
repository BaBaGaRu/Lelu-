/**
 * ==========================================================
 * LÉLUVERSE
 * REALITY SYSTEM
 *
 * Transitions Genesis from chaos into structure.
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";

import { useGenesis } from "../GenesisCore";

export default function RealitySystem() {

  const genesis = useGenesis();

  useFrame((_, delta) => {

    const g = genesis.current;

    if (g.paused) return;

    /**
     * Evolution
     */

    g.evolution +=

      delta *

      (0.02 + g.intelligence * 0.08);

    /**
     * Awareness
     */

    g.awareness = Math.min(

      1,

      g.awareness +

      delta *

      0.0005 *

      (1 + g.curiosity),

    );

    /**
     * Stability
     */

    g.stability = Math.min(

      1,

      g.stability +

      delta *

      0.0008 *

      (1 + g.awareness),

    );

    /**
     * Chaos naturally settles
     */

    g.chaos = Math.max(

      0,

      g.chaos -

      delta *

      0.00035 *

      g.stability,

    );

    /**
     * Intelligence grows
     */

    g.intelligence = Math.min(

      1,

      g.intelligence +

      delta *

      0.0004 *

      (1 + g.awareness),

    );

    /**
     * Curiosity never disappears
     */

    g.curiosity = Math.max(

      0.2,

      g.curiosity +

      Math.sin(g.age * 0.3) *

      delta *

      0.0002,

    );

    /**
     * Reality fields
     */

    g.gravity =

      0.25 +

      g.matter *

      0.75;

    g.light =

      0.3 +

      g.energy *

      0.7;

    /**
     * Life begins
     */

    if (

      g.matter > 0.45 &&

      g.energy > 0.55

    ) {

      g.life = Math.min(

        1,

        g.life +

        delta *

        0.0003,

      );

    }

    /**
     * Civilizations
     */

    if (

      g.life > 0.6 &&

      g.intelligence > 0.5

    ) {

      g.civilizations = Math.min(

        1,

        g.civilizations +

        delta *

        0.00015,

      );

    }

  });

  return null;

}