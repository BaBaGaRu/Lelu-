/**
 * ==========================================================
 * LÉLUVERSE
 * LIGHTING ENGINE
 * ==========================================================
 */

import type {
  LightSource,
  LightingState,
} from "./LightingTypes";

class LightingEngine {

  private lights = new Map<string, LightSource>();

  private state: LightingState = {

    globalBrightness: 1,

    ambientLight: 0.5,

    exposure: 1,

    bloom: 0.25,

    fogDensity: 0,

    active: true,

  };

  public boot(): void {

    console.log("══════════════════════════════");

    console.log("LIGHTING ENGINE ONLINE");

    console.log(`Lights : ${this.lights.size}`);

    console.log("══════════════════════════════");

  }

  public create(light: LightSource): void {

    this.lights.set(light.id, light);

  }

  public get(id: string): LightSource | undefined {

    return this.lights.get(id);

  }

  public getAll(): LightSource[] {

    return [...this.lights.values()];

  }

  public getState(): LightingState {

    return this.state;

  }

}

const lightingEngine = new LightingEngine();

export default lightingEngine;