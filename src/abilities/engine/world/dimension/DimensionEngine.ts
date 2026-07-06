/**
 * ==========================================================
 * LÉLUVERSE
 * DIMENSION ENGINE
 * ==========================================================
 *
 * Manages every dimension within the Multiverse.
 */

import type { Dimension } from "./DimensionTypes";

class DimensionEngine {

  private dimensions = new Map<string, Dimension>();

  public boot(): void {

    console.log("══════════════════════════════");

    console.log("DIMENSION ENGINE ONLINE");

    console.log(`Dimensions : ${this.dimensions.size}`);

    console.log("══════════════════════════════");

  }

  public create(dimension: Dimension): void {

    this.dimensions.set(dimension.id, dimension);

  }

  public get(id: string): Dimension | undefined {

    return this.dimensions.get(id);

  }

  public getAll(): Dimension[] {

    return [...this.dimensions.values()];

  }

  public remove(id: string): void {

    this.dimensions.delete(id);

  }

}

const dimensionEngine = new DimensionEngine();

export default dimensionEngine;