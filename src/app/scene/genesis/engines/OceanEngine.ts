/**
 * ==========================================================
 * LÉLUVERSE
 * OCEAN ENGINE
 * ==========================================================
 */

import type { GenesisState } from "../state/GenesisState";

export default class OceanEngine {

  update(
    state: GenesisState,
    delta: number,
  ): void {

    if (state.paused) return;

    if (state.life < 0.2) return;

    state.life = Math.min(
      1,
      state.life +
      delta * 0.00008,
    );

  }

}