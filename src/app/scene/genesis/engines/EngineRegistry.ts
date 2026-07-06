/**
 * ==========================================================
 * LÉLUVERSE
 * ENGINE REGISTRY
 * ==========================================================
 */

import type { GenesisState } from "../state/GenesisState";

export interface GenesisEngine {

  readonly id: string;

  readonly priority: number;

  readonly enabled: boolean;

  update(
    state: GenesisState,
    delta: number,
  ): void;

}

export default class EngineRegistry {

  private readonly engines =
    new Map<string, GenesisEngine>();

  register(
    engine: GenesisEngine,
  ): void {

    this.engines.set(
      engine.id,
      engine,
    );

  }

  unregister(
    id: string,
  ): void {

    this.engines.delete(id);

  }

  get(
    id: string,
  ): GenesisEngine | undefined {

    return this.engines.get(id);

  }

  getAll(): GenesisEngine[] {

    return Array.from(
      this.engines.values(),
    ).sort(

      (a, b) =>

        a.priority -

        b.priority,

    );

  }

  clear(): void {

    this.engines.clear();

  }

}