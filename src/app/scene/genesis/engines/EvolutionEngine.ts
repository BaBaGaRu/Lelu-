/**
 * ==========================================================
 * LÉLUVERSE
 * EVOLUTION ENGINE
 * ==========================================================
 */

import { GenesisMode } from "../state";
import { GenesisEra } from "../timeline";

export interface EvolutionState {

  age: number;

  evolution: number;

  energy: number;

  matter: number;

  life: number;

  intelligence: number;

  consciousness: number;

  mode: GenesisMode;

  era: GenesisEra;

}

export default class EvolutionEngine {

  update(

    state: EvolutionState,

    delta: number,

  ): void {

    state.age += delta;

    state.evolution += delta * 0.05;

    state.energy = Math.min(

      1,

      state.energy + delta * 0.01,

    );

    state.matter = Math.min(

      1,

      state.matter + state.energy * delta * 0.003,

    );

    state.life = Math.min(

      1,

      state.life + state.matter * delta * 0.001,

    );

    state.intelligence = Math.min(

      1,

      state.intelligence +

        state.life * delta * 0.0005,

    );

    state.consciousness = Math.min(

      1,

      state.consciousness +

        state.intelligence *

          delta *

          0.0002,

    );

    this.updateEra(state);

    this.updateMode(state);

  }

  private updateEra(

    state: EvolutionState,

  ): void {

    const e = state.evolution;

    if (e < 10) {

      state.era = GenesisEra.VOID;

    } else if (e < 20) {

      state.era = GenesisEra.QUANTUM;

    } else if (e < 40) {

      state.era = GenesisEra.ENERGY;

    } else if (e < 80) {

      state.era = GenesisEra.MATTER;

    } else if (e < 120) {

      state.era = GenesisEra.STARS;

    } else if (e < 180) {

      state.era = GenesisEra.GALAXIES;

    } else if (e < 260) {

      state.era = GenesisEra.PLANETS;

    } else if (e < 340) {

      state.era = GenesisEra.LIFE;

    } else {

      state.era = GenesisEra.CIVILIZATIONS;

    }

  }

  private updateMode(

    state: EvolutionState,

  ): void {

    if (state.consciousness > 0.95) {

      state.mode = GenesisMode.TRANSCENDING;

    } else if (

      state.consciousness > 0.75

    ) {

      state.mode = GenesisMode.EVOLVING;

    } else if (

      state.intelligence > 0.60

    ) {

      state.mode = GenesisMode.CREATING;

    } else if (

      state.life > 0.40

    ) {

      state.mode = GenesisMode.LEARNING;

    } else if (

      state.energy > 0.15

    ) {

      state.mode = GenesisMode.FORMING;

    } else {

      state.mode = GenesisMode.CHAOS;

    }

  }

}