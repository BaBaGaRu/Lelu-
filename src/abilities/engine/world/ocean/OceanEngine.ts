/**
 * ==========================================================
 * LÉLUVERSE
 * OCEAN ENGINE
 * ==========================================================
 */

import type { Ocean } from "./OceanTypes";

class OceanEngine {

  private oceans = new Map<string, Ocean>();

  public boot(): void {

    console.log("══════════════════════════════");

    console.log("OCEAN ENGINE ONLINE");

    console.log(`Oceans : ${this.oceans.size}`);

    console.log("══════════════════════════════");

  }

  public create(ocean: Ocean): void {

    this.oceans.set(ocean.id, ocean);

  }

  public get(id: string): Ocean | undefined {

    return this.oceans.get(id);

  }

  public getAll(): Ocean[] {

    return [...this.oceans.values()];

  }

  public remove(id: string): void {

    this.oceans.delete(id);

  }

}

const oceanEngine = new OceanEngine();

export default oceanEngine;