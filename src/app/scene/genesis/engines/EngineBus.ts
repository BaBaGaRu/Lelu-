/**
 * ==========================================================
 * LÉLUVERSE
 * ENGINE BUS
 *
 * Central orchestration layer between
 * the EngineRegistry and Genesis Renderer.
 *
 * Responsibilities
 * • Collect engine influence
 * • Smooth transitions
 * • Drive shader uniforms
 * • Drive shell activity
 * • Runtime orchestration
 * ==========================================================
 */

import type EngineRegistry from "./EngineRegistry";
import type { GenesisState } from "../state/GenesisState";

export interface EngineWeights {

  plasma: number;

  ocean: number;

  crystal: number;

  electric: number;

  halo: number;

}

export default class EngineBus {

  private readonly registry: EngineRegistry;

  private readonly weights: EngineWeights = {

    plasma: 1,

    ocean: 0,

    crystal: 0,

    electric: 0,

    halo: 1,

  };

  constructor(

    registry: EngineRegistry,

  ) {

    this.registry = registry;

  }

  update(

    state: GenesisState,

    delta: number,

  ): void {

    const engines = this.registry.getAll();

    const target: EngineWeights = {

      plasma: 0,

      ocean: 0,

      crystal: 0,

      electric: 0,

      halo: 0,

    };

    for (const engine of engines) {

      if (engine.enabled === false) {

        continue;

      }

      const id =

        (engine.id ??

        engine.constructor.name)

        .toLowerCase();

      const value =

        engine.getWeight?.(state) ??

        engine.weight ??

        1;

      if (id.includes("plasma")) {

        target.plasma = value;

      }

      else if (id.includes("ocean")) {

        target.ocean = value;

      }

      else if (id.includes("crystal")) {

        target.crystal = value;

      }

      else if (id.includes("electric")) {

        target.electric = value;

      }

      else if (id.includes("halo")) {

        target.halo = value;

      }

    }

    const speed =

      Math.min(

        delta * 4,

        1,

      );

    this.weights.plasma +=

      (target.plasma - this.weights.plasma) *

      speed;

    this.weights.ocean +=

      (target.ocean - this.weights.ocean) *

      speed;

    this.weights.crystal +=

      (target.crystal - this.weights.crystal) *

      speed;

    this.weights.electric +=

      (target.electric - this.weights.electric) *

      speed;

    this.weights.halo +=

      (target.halo - this.weights.halo) *

      speed;

  }

  getWeights(): EngineWeights {

    return {

      ...this.weights,

    };

  }

}