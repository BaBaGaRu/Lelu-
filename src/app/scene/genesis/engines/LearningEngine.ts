/**
 * ==========================================================
 * LÉLUVERSE
 * LEARNING ENGINE
 * ==========================================================
 */

import type { GenesisState } from "../state/GenesisState";

export default class LearningEngine {

  update(
    state: GenesisState,
    delta: number,
  ): void {

    if (state.paused) return;

    state.learning = Math.min(
      1,
      state.learning +
      state.curiosity *
      delta *
      0.0002,
    );

  }

}