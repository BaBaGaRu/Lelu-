/**
 * ==========================================================
 * LÉLUVERSE
 * PLANET ENGINE
 * ==========================================================
 */

import type { GenesisState } from "../state/GenesisState";

export default class PlanetEngine {

  update(
    state: GenesisState,
    delta: number,
  ): void {

    if (state.paused) return;

    if (

      state.gravity < 0.4

    ) return;

    state.life = Math.min(
      1,
      state.life +
      delta *
      0.00005,
    );

  }

}