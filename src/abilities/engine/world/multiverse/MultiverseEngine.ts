/**
 * ==========================================================
 * LÉLUVERSE
 * MULTIVERSE ENGINE
 * ==========================================================
 *
 * Manages every universe created inside Lélu.
 */

import type {
  Universe,
  MultiverseState,
} from "./MultiverseTypes";

class MultiverseEngine {

  private universes = new Map<string, Universe>();

  private state: MultiverseState = {

    universes: 0,

    activeUniverse: "Genesis",

    discoveredUniverses: 0,

  };

  public boot(): void {

    console.log("══════════════════════════════");

    console.log("MULTIVERSE ENGINE ONLINE");

    console.log(`Universes : ${this.state.universes}`);

    console.log("══════════════════════════════");

  }

  public create(universe: Universe): void {

    this.universes.set(universe.id, universe);

    this.state.universes = this.universes.size;

  }

  public get(id: string): Universe | undefined {

    return this.universes.get(id);

  }

  public getAll(): Universe[] {

    return [...this.universes.values()];

  }

  public setActive(id: string): void {

    this.state.activeUniverse = id;

  }

  public getState(): MultiverseState {

    return this.state;

  }

}

const multiverseEngine = new MultiverseEngine();

export default multiverseEngine;