/**
 * ==========================================================
 * LÉLUVERSE
 * MATTER ENGINE
 * ==========================================================
 */

import type { GenesisState } from "../state/GenesisState";

export default class MatterEngine {

  update(
    state: GenesisState,
    delta: number,
  ): void {

    if (state.paused) return;

    state.matter = Math.min(
      1,
      state.matter +
      state.energy *
      delta *
      0.00015,
    );

  }

}