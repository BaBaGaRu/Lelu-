/**
 * ==========================================================
 * LÉLUVERSE
 * WORLD ENGINE
 * ==========================================================
 *
 * Controls the active world.
 * Every future engine communicates through here.
 */

import GenesisWorld from "./WorldState";
import type { WorldState } from "./WorldTypes";

class WorldEngine {

  private world: WorldState = GenesisWorld;

  public boot(): void {

    console.log("══════════════════════════════");
    console.log("LÉLUVERSE ONLINE");
    console.log("══════════════════════════════");

    console.log(`World      : ${this.world.name}`);
    console.log(`Biome      : ${this.world.biome}`);
    console.log(`Time       : ${this.world.time}`);
    console.log(`Season     : ${this.world.season}`);

    console.log("══════════════════════════════");

  }

  public getWorld(): WorldState {

    return this.world;

  }

  public setWorld(world: WorldState): void {

    this.world = world;

  }

  public evolve(amount = 1): void {

    this.world.stats.evolution += amount;

  }

  public getEvolution(): number {

    return this.world.stats.evolution;

  }

  public reset(): void {

    this.world = GenesisWorld;

  }

}

const worldEngine = new WorldEngine();

export default worldEngine;