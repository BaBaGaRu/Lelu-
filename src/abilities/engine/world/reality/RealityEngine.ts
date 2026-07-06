/**
 * ==========================================================
 * LÉLUVERSE
 * REALITY ENGINE
 * ==========================================================
 */

import type {
  RealityMode,
  RealityState,
} from "./RealityTypes";

class RealityEngine {

  private reality: RealityState = {

    mode: "Calm",

    gravity: 1,

    wind: 0,

    current: 0,

    motion: 0.25,

    dreamIntensity: 0,

    psychedelicIntensity: 0,

    cameraSpeed: 1,

    worldRotation: 0.05,

    transitionSpeed: 1,

    timeScale: 1,

  };

  public boot(): void {

    console.log("══════════════════════════════");

    console.log("REALITY ENGINE ONLINE");

    console.log(`Mode : ${this.reality.mode}`);

    console.log("══════════════════════════════");

  }

  public setMode(mode: RealityMode): void {

    this.reality.mode = mode;

  }

  public getMode(): RealityMode {

    return this.reality.mode;

  }

  public getReality(): RealityState {

    return this.reality;

  }

}

const realityEngine = new RealityEngine();

export default realityEngine;