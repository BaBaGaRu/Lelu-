/**
 * ==========================================================
 * LÉLUVERSE
 * CURIOSITY ENGINE
 * ==========================================================
 */

import type { GenesisState } from "../state/GenesisState";

export default class CuriosityEngine {

  update(
    state: GenesisState,
    delta: number,
  ) {

    if (
      state.intelligence < 0.25
    ) return;

    state.curiosity = Math.min(
      1,
      state.curiosity +
      delta * 0.0002,
    );

  }

}