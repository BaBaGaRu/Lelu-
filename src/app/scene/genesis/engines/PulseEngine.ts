/**
 * ==========================================================
 * LÉLUVERSE
 * PULSE ENGINE
 * ==========================================================
 */

import type { GenesisState } from "../state/GenesisState";

export default class PulseEngine {

  update(
    state: GenesisState,
    delta: number,
  ): void {

    if (state.paused) return;

    state.light =

      0.5 +

      Math.sin(

        state.age *

        state.speed,

      ) *

      0.5;

  }

}