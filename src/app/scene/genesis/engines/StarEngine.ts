/**
 * ==========================================================
 * LÉLUVERSE
 * STAR ENGINE
 * ==========================================================
 */

import type { GenesisState } from "../state/GenesisState";

export default class StarEngine {

  update(
    state: GenesisState,
    delta: number,
  ): void {

    if (state.paused) return;

    if (

      state.energy < 0.6 ||

      state.matter < 0.5

    ) return;

    state.light = Math.min(
      1,
      state.light +
      delta *
      0.0003,
    );

  }

}