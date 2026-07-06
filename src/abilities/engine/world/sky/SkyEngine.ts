/**
 * ==========================================================
 * LÉLUVERSE
 * SKY ENGINE
 * ==========================================================
 */

import type { SkyState } from "./SkyTypes";

class SkyEngine {

  private state: SkyState = {

    type: "Earth",

    cloudCoverage: 20,

    starVisibility: 100,

    auroraIntensity: 0,

    nebulaIntensity: 0,

    moonVisibility: 100,

    sunVisibility: 100,

    rainbowChance: 0,

    active: true,

  };

  public boot(): void {

    console.log("══════════════════════════════");

    console.log("SKY ENGINE ONLINE");

    console.log(`Sky : ${this.state.type}`);

    console.log("══════════════════════════════");

  }

  public getState(): SkyState {

    return this.state;

  }

  public setState(state: SkyState): void {

    this.state = state;

  }

}

const skyEngine = new SkyEngine();

export default skyEngine;