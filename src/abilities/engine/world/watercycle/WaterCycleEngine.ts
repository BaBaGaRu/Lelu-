/**
 * ==========================================================
 * LÉLUVERSE
 * WATER CYCLE ENGINE
 * ==========================================================
 */

import type { WaterCycle } from "./WaterCycleTypes";

class WaterCycleEngine {

  private cycles = new Map<string, WaterCycle>();

  public boot(): void {

    console.log("══════════════════════════════");

    console.log("WATER CYCLE ENGINE ONLINE");

    console.log(`Cycles : ${this.cycles.size}`);

    console.log("══════════════════════════════");

  }

  public create(cycle: WaterCycle): void {

    this.cycles.set(cycle.id, cycle);

  }

  public get(id: string): WaterCycle | undefined {

    return this.cycles.get(id);

  }

  public getAll(): WaterCycle[] {

    return [...this.cycles.values()];

  }

  public remove(id: string): void {

    this.cycles.delete(id);

  }

}

const waterCycleEngine = new WaterCycleEngine();

export default waterCycleEngine;