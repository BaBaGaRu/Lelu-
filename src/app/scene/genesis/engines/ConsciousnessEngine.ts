/**
 * ==========================================================
 * LÉLUVERSE
 * CONSCIOUSNESS ENGINE
 * ==========================================================
 */

import type { GenesisState } from "../state/GenesisState";

export default class ConsciousnessEngine {

  update(
    state: GenesisState,
    delta: number,
  ) {

    if (state.life <= 0) return;

    state.awareness = Math.min(
      1,
      state.awareness +
      state.life *
      delta *
      0.0006,
    );

    state.intelligence = Math.min(
      1,
      state.intelligence +
      state.awareness *
      delta *
      0.0005,
    );

    state.curiosity = Math.min(
      1,
      state.curiosity +
      state.intelligence *
      delta *
      0.0003,
    );

    state.teaching =

      state.intelligence;

  }

}