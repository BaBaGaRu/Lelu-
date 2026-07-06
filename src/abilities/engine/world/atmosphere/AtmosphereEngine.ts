/**
 * ==========================================================
 * LÉLUVERSE
 * ATMOSPHERE ENGINE
 * ==========================================================
 */

import type { Atmosphere } from "./AtmosphereTypes";

class AtmosphereEngine {

  private atmospheres = new Map<string, Atmosphere>();

  public boot(): void {

    console.log("══════════════════════════════");

    console.log("ATMOSPHERE ENGINE ONLINE");

    console.log(`Atmospheres : ${this.atmospheres.size}`);

    console.log("══════════════════════════════");

  }

  public create(atmosphere: Atmosphere): void {

    this.atmospheres.set(atmosphere.id, atmosphere);

  }

  public get(id: string): Atmosphere | undefined {

    return this.atmospheres.get(id);

  }

  public getAll(): Atmosphere[] {

    return [...this.atmospheres.values()];

  }

  public remove(id: string): void {

    this.atmospheres.delete(id);

  }

}

const atmosphereEngine = new AtmosphereEngine();

export default atmosphereEngine;