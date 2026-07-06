/**
 * ==========================================================
 * LÉLUVERSE
 * HAZARD ENGINE
 * ==========================================================
 */

import type { Hazard } from "./HazardTypes";

class HazardEngine {

  private hazards = new Map<string, Hazard>();

  public boot(): void {

    console.log("══════════════════════════════");

    console.log("HAZARD ENGINE ONLINE");

    console.log(`Hazards : ${this.hazards.size}`);

    console.log("══════════════════════════════");

  }

  public create(hazard: Hazard): void {

    this.hazards.set(hazard.id, hazard);

  }

  public get(id: string): Hazard | undefined {

    return this.hazards.get(id);

  }

  public getAll(): Hazard[] {

    return [...this.hazards.values()];

  }

  public remove(id: string): void {

    this.hazards.delete(id);

  }

}

const hazardEngine = new HazardEngine();

export default hazardEngine;