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
    _delta: number,
  ): void {

    if (state.paused) return;

    state.reality = Math.min(
      1,
      state.reality +
      state.awareness *
      _delta *
      0.00015,
    );

  }

}