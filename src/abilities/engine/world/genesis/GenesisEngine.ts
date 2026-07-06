/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS ENGINE
 * ==========================================================
 *
 * Responsible for creating everything that comes into
 * existence inside the Léluverse.
 */

import type { GenesisCreation } from "./GenesisTypes";

class GenesisEngine {

  private creations = new Map<string, GenesisCreation>();

  public boot(): void {

    console.log("══════════════════════════════");
    console.log("GENESIS ENGINE ONLINE");
    console.log(`Creations : ${this.creations.size}`);
    console.log("══════════════════════════════");

  }

  public create(creation: GenesisCreation): void {

    this.creations.set(creation.id, creation);

  }

  public remove(id: string): void {

    this.creations.delete(id);

  }

  public get(id: string): GenesisCreation | undefined {

    return this.creations.get(id);

  }

  public getAll(): GenesisCreation[] {

    return [...this.creations.values()];

  }

  public count(): number {

    return this.creations.size;

  }

  public clear(): void {

    this.creations.clear();

  }

}

const genesisEngine = new GenesisEngine();

export default genesisEngine;