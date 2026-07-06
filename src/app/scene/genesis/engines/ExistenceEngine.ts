/**
 * ==========================================================
 * LÉLUVERSE
 * EXISTENCE ENGINE
 * ==========================================================
 */

import type { GenesisState } from "../GenesisCore";

export default class ExistenceEngine {

  update(
    state: GenesisState,
    delta: number,
  ) {

    state.existence = Math.min(
      1,
      state.existence +
      delta * 0.00005,
    );

  }

}