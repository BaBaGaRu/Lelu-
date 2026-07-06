/**
 * ==========================================================
 * LÉLUVERSE
 * EVOLUTION ENGINE
 * ==========================================================
 */

import type { GenesisState } from "../state/GenesisState";

import { GenesisMode } from "../state";
import { GenesisEra } from "../timeline";

export default class EvolutionEngine {

  update(

    state: GenesisState,

    delta: number,

  ): void {

    /**
     * Complexity
     */

    const complexity =

      state.learning +

      state.intelligence +

      state.awareness +

      state.life +

      state.civilizations +

      state.simulation +

      state.teaching +

      state.reality +

      state.existence;

    /**
     * Living Clock
     *
     * Starts extremely fast.
     * Gradually slows as Lélu matures.
     */

    const simulationSpeed =

      60 /

      Math.sqrt(

        complexity + 1,

      );

    const dt =

      delta *

      simulationSpeed *

      state.speed;

    /**
     * Time
     */

    state.age += dt;

    state.evolution +=

      dt * 0.05;

    /**
     * Evolution
     */

    state.energy = Math.min(

      1,

      state.energy +

      dt * 0.01,

    );

    state.matter = Math.min(

      1,

      state.matter +

      state.energy *

      dt *

      0.003,

    );

    state.life = Math.min(

      1,

      state.life +

      state.matter *

      dt *

      0.001,

    );

    state.intelligence = Math.min(

      1,

      state.intelligence +

      state.life *

      dt *

      0.0005,

    );

    state.awareness = Math.min(

      1,

      state.awareness +

      state.intelligence *

      dt *

      0.0002,

    );

    this.updateEra(state);

    this.updateMode(state);

  }

  private updateEra(

    state: GenesisState,

  ): void {

    const e = state.evolution;

    if (e < 10) {

      state.era = GenesisEra.VOID;

    }

    else if (e < 20) {

      state.era = GenesisEra.QUANTUM;

    }

    else if (e < 40) {

      state.era = GenesisEra.ENERGY;

    }

    else if (e < 80) {

      state.era = GenesisEra.MATTER;

    }

    else if (e < 120) {

      state.era = GenesisEra.STARS;

    }

    else if (e < 180) {

      state.era = GenesisEra.GALAXIES;

    }

    else if (e < 260) {

      state.era = GenesisEra.PLANETS;

    }

    else if (e < 340) {

      state.era = GenesisEra.LIFE;

    }

    else {

      state.era = GenesisEra.CIVILIZATIONS;

    }

  }

  private updateMode(

    state: GenesisState,

  ): void {

    if (

      state.awareness > 0.95

    ) {

      state.mode =

        GenesisMode.TRANSCENDING;

    }

    else if (

      state.awareness > 0.75

    ) {

      state.mode =

        GenesisMode.EVOLVING;

    }

    else if (

      state.intelligence > 0.60

    ) {

      state.mode =

        GenesisMode.CREATING;

    }

    else if (

      state.life > 0.40

    ) {

      state.mode =

        GenesisMode.LEARNING;

    }

    else if (

      state.energy > 0.15

    ) {

      state.mode =

        GenesisMode.FORMING;

    }

    else {

      state.mode =

        GenesisMode.CHAOS;

    }

  }

}