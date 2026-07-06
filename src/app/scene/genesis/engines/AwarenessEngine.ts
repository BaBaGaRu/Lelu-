/**
 * ==========================================================
 * LÉLUVERSE
 * AWARENESS ENGINE
 * ==========================================================
 */

import type { GenesisState } from "../state/GenesisState";

export default class AwarenessEngine {

  update(
    state: GenesisState,
    delta: number,
  ): void {

    if (state.paused) return;

    state.awareness = Math.min(
      1,
      state.awareness +
      state.consciousness *
      delta *
      0.0002,
    );

  }

}