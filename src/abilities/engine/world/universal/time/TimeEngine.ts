/**
 * ==========================================================
 * LÉLUVERSE
 * TIME ENGINE
 * ==========================================================
 *
 * Governs time across every world and creation.
 */

import type {
  TimeMode,
  TimeState,
} from "./TimeTypes";

class TimeEngine {

  private state: TimeState = {

    mode: "RealTime",

    year: 1,

    day: 1,

    hour: 12,

    minute: 0,

    speed: 1,

    season: {

      id: "spring",

      name: "Spring",

      progress: 0,

    },

  };

  public boot(): void {

    console.log("══════════════════════════════");

    console.log("TIME ENGINE ONLINE");

    console.log(`Mode : ${this.state.mode}`);

    console.log("══════════════════════════════");

  }

  public getState(): TimeState {

    return this.state;

  }

  public setMode(mode: TimeMode): void {

    this.state.mode = mode;

  }

  public setSpeed(speed: number): void {

    this.state.speed = speed;

  }

}

const timeEngine = new TimeEngine();

export default timeEngine;