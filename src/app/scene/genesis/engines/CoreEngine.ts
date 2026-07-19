/**
 * ==========================================================
 * LÉLUVERSE
 * CORE ENGINE
 * ==========================================================
 */

import type { GenesisState } from "../state/GenesisState";

import GenesisSimulation from "./GenesisSimulation";
import EvolutionEngine from "./EvolutionEngine";
import ConsciousnessEngine from "./ConsciousnessEngine";
import CivilizationEngine from "./CivilizationEngine";
import CuriosityEngine from "./CuriosityEngine";
import LearningEngine from "./LearningEngine";
import ExistenceEngine from "./ExistenceEngine";
import RealityEngine from "./RealityEngine";

export default class CoreEngine {

  private readonly simulation =
    new GenesisSimulation();

  private readonly evolution =
    new EvolutionEngine();

  private readonly consciousness =
    new ConsciousnessEngine();

  private readonly civilization =
    new CivilizationEngine();

  private readonly curiosity =
    new CuriosityEngine();

  private readonly learning =
    new LearningEngine();

  private readonly existence =
    new ExistenceEngine();

  private readonly reality =
    new RealityEngine();

  update(
    state: GenesisState,
    delta: number,
  ): void {

    if (state.paused) return;

    this.simulation.update(
      state,
      delta,
    );

    this.evolution.update(
      state,
      delta,
    );

    this.consciousness.update(
      state,
      delta,
    );

    this.curiosity.update(
      state,
      delta,
    );

    this.learning.update(
      state,
      delta,
    );

    this.reality.update(
      state,
      delta,
    );

    this.existence.update(
      state,
      delta,
    );

    this.civilization.update(
      state,
      delta,
    );

  }

}