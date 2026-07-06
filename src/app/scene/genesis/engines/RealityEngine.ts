/**
 * ==========================================================
 * LÉLUVERSE
 * REALITY ENGINE
 * ==========================================================
 */

import type { GenesisState } from "../state/GenesisState";

export default class RealityEngine {

  update(
    state: GenesisState,
    delta: number,
  ): void {

    if (state.paused) return;

    state.reality = Math.min(
      1,
      state.reality +
      state.awareness *
      delta *
      0.00015,
    );

  }

}