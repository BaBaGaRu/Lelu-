/**
 * ==========================================================
 * LÉLUVERSE
 * CIVILIZATION ENGINE
 * ==========================================================
 */

import type { GenesisState } from "../state/GenesisState";

export default class CivilizationEngine {

  update(
    state: GenesisState,
    delta: number,
  ) {

    if (

      state.intelligence < 0.5

    ) return;

    state.civilizations = Math.min(

      1,

      state.civilizations +

      delta * 0.00015,

    );

  }

}