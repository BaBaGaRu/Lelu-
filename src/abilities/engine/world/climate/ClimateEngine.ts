/**
 * ==========================================================
 * LÉLUVERSE
 * CLIMATE ENGINE
 * ==========================================================
 */

import type { Climate } from "./ClimateTypes";

class ClimateEngine {

  private climates = new Map<string, Climate>();

  public boot(): void {

    console.log("══════════════════════════════");

    console.log("CLIMATE ENGINE ONLINE");

    console.log(`Climates : ${this.climates.size}`);

    console.log("══════════════════════════════");

  }

  public create(climate: Climate): void {

    this.climates.set(climate.id, climate);

  }

  public get(id: string): Climate | undefined {

    return this.climates.get(id);

  }

  public getAll(): Climate[] {

    return [...this.climates.values()];

  }

}

const climateEngine = new ClimateEngine();

export default climateEngine;