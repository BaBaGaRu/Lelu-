/**
 * ==========================================================
 * LÉLUVERSE
 * QUANTUM ENGINE
 * ==========================================================
 */

import type { GenesisState } from "../state/GenesisState";

export default class QuantumEngine {

  update(
    state: GenesisState,
    delta: number,
  ): void {

    if (state.paused) return;

    state.energy = Math.min(
      1,
      state.energy +
      delta * 0.00003,
    );

    state.chaos = Math.max(
      0,
      state.chaos -
      delta * 0.00002,
    );

  }

}