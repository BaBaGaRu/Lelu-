/**
 * ==========================================================
 * LÉLUVERSE
 * ENGINE MANAGER
 * ==========================================================
 */

import GenesisManager from "./GenesisManager";

export default class EngineManager {

  readonly genesis = new GenesisManager();

  update(delta: number) {

    this.genesis.time.update(delta);

    this.genesis.evolution.update(delta);

    this.genesis.consciousness.update(delta);

    this.genesis.existence.update(delta);

  }

}