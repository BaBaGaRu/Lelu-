/**
 * ==========================================================
 * LÉLUVERSE
 * TERRAIN ENGINE
 * ==========================================================
 */

import type { Terrain } from "./TerrainTypes";

class TerrainEngine {

  private terrain = new Map<string, Terrain>();

  public boot(): void {

    console.log("══════════════════════════════");

    console.log("TERRAIN ENGINE ONLINE");

    console.log(`Terrain : ${this.terrain.size}`);

    console.log("══════════════════════════════");

  }

  public create(data: Terrain): void {

    this.terrain.set(data.id, data);

  }

  public get(id: string): Terrain | undefined {

    return this.terrain.get(id);

  }

  public getAll(): Terrain[] {

    return [...this.terrain.values()];

  }

  public remove(id: string): void {

    this.terrain.delete(id);

  }

}

const terrainEngine = new TerrainEngine();

export default terrainEngine;