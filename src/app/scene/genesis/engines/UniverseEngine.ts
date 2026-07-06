/**
 * ==========================================================
 * LÉLUVERSE
 * UNIVERSE ENGINE
 *
 * Master simulation engine.
 * Every Genesis subsystem evolves through here.
 * ==========================================================
 */

import type { GenesisState } from "../GenesisCore";

export default class UniverseEngine {

  update(
    state: GenesisState,
    delta: number,
  ) {

    if (state.paused) return;

    const dt = delta * state.speed;

    // Time

    state.age += dt;
    state.evolution += dt;

    // Energy

    state.energy = Math.min(
      1,
      state.energy + dt * 0.01,
    );

    // Matter

    state.matter = Math.min(
      1,
      state.matter +
      state.energy *
      dt *
      0.004,
    );

    // Gravity

    state.gravity =
      state.energy *
      state.matter;

    // Light

    state.light =
      0.5 +
      Math.sin(state.age * 0.5) *
      0.5;

    // Life

    if (state.energy > 0.35 && state.matter > 0.25) {

      state.life = Math.min(
        1,
        state.life +
        dt *
        0.001,
      );

    }

    // Awareness

    state.awareness = Math.min(
      1,
      state.awareness +
      state.life *
      dt *
      0.0005,
    );

    // Intelligence

    state.intelligence = Math.min(
      1,
      state.intelligence +
      state.awareness *
      dt *
      0.0004,
    );

    // Curiosity

    state.curiosity = Math.min(
      1,
      state.curiosity +
      dt *
      0.0002,
    );

    // Stability

    state.chaos = Math.max(
      0,
      state.chaos -
      dt *
      0.0003,
    );

    state.stability = Math.min(
      1,
      state.stability +
      dt *
      0.0003,
    );

    // Civilizations

    if (state.intelligence > 0.5) {

      state.civilizations = Math.min(
        1,
        state.civilizations +
        dt *
        0.0001,
      );

    }

    // Teaching

    state.teaching =

      state.intelligence;

    // Simulation

    state.simulation += dt;

  }

}