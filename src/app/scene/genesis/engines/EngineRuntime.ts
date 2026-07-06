/**
 * ==========================================================
 * LÉLUVERSE
 * ENGINE RUNTIME
 * ==========================================================
 */

import type { GenesisState } from "../state/GenesisState";

import EngineRegistry from "./EngineRegistry";
import EngineScheduler from "./EngineScheduler";
import EngineBootstrap from "./EngineBootstrap";

export default class EngineRuntime {

  private readonly registry =
    new EngineRegistry();

  private readonly scheduler =
    new EngineScheduler();

  private initialized = false;

  initialize(): void {

    if (this.initialized) return;

    EngineBootstrap.register(
      this.registry,
    );

    for (

      const engine of

      this.registry.getAll()

    ) {

      this.scheduler.register(
        engine,
      );

    }

    this.initialized = true;

  }

  update(

    state: GenesisState,

    delta: number,

  ): void {

    if (!this.initialized) {

      this.initialize();

    }

    this.scheduler.update(

      state,

      delta,

    );

  }

}