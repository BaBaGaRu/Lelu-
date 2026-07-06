/**
 * ==========================================================
 * LÉLUVERSE
 * BIOME ENGINE
 * ==========================================================
 */

import type { Biome } from "./BiomeTypes";

class BiomeEngine {

  private biomes = new Map<string, Biome>();

  public boot(): void {

    console.log("══════════════════════════════");

    console.log("BIOME ENGINE ONLINE");

    console.log(`Biomes : ${this.biomes.size}`);

    console.log("══════════════════════════════");

  }

  public create(biome: Biome): void {

    this.biomes.set(biome.id, biome);

  }

  public get(id: string): Biome | undefined {

    return this.biomes.get(id);

  }

  public getAll(): Biome[] {

    return [...this.biomes.values()];

  }

  public remove(id: string): void {

    this.biomes.delete(id);

  }

}

const biomeEngine = new BiomeEngine();

export default biomeEngine;