/**
 * ==========================================================
 * LÉLUVERSE
 * CHRONOLOGY ENGINE
 * ==========================================================
 */

import type { ChronologyState } from "./ChronologyTypes";

class ChronologyEngine {

  private state: ChronologyState = {

    year: 1,

    month: 1,

    day: 1,

    hour: 12,

    minute: 0,

    second: 0,

    timeOfDay: "Noon",

    lunarPhase: "Full",

    daylight: 1,

    active: true,

  };

  public boot(): void {

    console.log("══════════════════════════════");

    console.log("CHRONOLOGY ENGINE ONLINE");

    console.log(`${this.state.timeOfDay}`);

    console.log("══════════════════════════════");

  }

  public getState(): ChronologyState {

    return this.state;

  }

  public setState(state: ChronologyState): void {

    this.state = state;

  }

}

const chronologyEngine = new ChronologyEngine();

export default chronologyEngine;