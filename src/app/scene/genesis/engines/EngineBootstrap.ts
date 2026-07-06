/**
 * ==========================================================
 * LÉLUVERSE
 * ENGINE BOOTSTRAP
 * ==========================================================
 */

import EngineRegistry from "./EngineRegistry";

import UniverseEngine from "./UniverseEngine";
import EvolutionEngine from "./EvolutionEngine";
import ConsciousnessEngine from "./ConsciousnessEngine";
import CuriosityEngine from "./CuriosityEngine";
import LearningEngine from "./LearningEngine";
import KnowledgeEngine from "./KnowledgeEngine";
import AwarenessEngine from "./AwarenessEngine";
import RealityEngine from "./RealityEngine";
import ExistenceEngine from "./ExistenceEngine";
import CivilizationEngine from "./CivilizationEngine";
import TechnologyEngine from "./TechnologyEngine";
import TimelineEngine from "./TimelineEngine";
import SimulationEngine from "./SimulationEngine";
import GravityEngine from "./GravityEngine";
import LightEngine from "./LightEngine";
import MatterEngine from "./MatterEngine";
import ParticleEngine from "./ParticleEngine";
import StarEngine from "./StarEngine";
import GalaxyEngine from "./GalaxyEngine";
import PlanetEngine from "./PlanetEngine";
import OceanEngine from "./OceanEngine";
import AtmosphereEngine from "./AtmosphereEngine";
import DNAEngine from "./DNAEngine";
import SpeciesEngine from "./SpeciesEngine";
import NebulaEngine from "./NebulaEngine";
import BlackHoleEngine from "./BlackHoleEngine";
import QuantumEngine from "./QuantumEngine";
import VoidEngine from "./VoidEngine";
import ExpansionEngine from "./ExpansionEngine";
import HarmonyEngine from "./HarmonyEngine";
import EntropyEngine from "./EntropyEngine";
import BalanceEngine from "./BalanceEngine";
import GrowthEngine from "./GrowthEngine";
import PulseEngine from "./PulseEngine";
import MemoryEngine from "./MemoryEngine";
import MemoryEvolutionEngine from "./MemoryEvolutionEngine";
import DreamEngine from "./DreamEngine";
import CreationEngine from "./CreationEngine";
import WisdomEngine from "./WisdomEngine";

export default class EngineBootstrap {

  static register(

    registry: EngineRegistry,

  ): void {

    registry.register(new VoidEngine());

    registry.register(new QuantumEngine());

    registry.register(new ExpansionEngine());

    registry.register(new EntropyEngine());

    registry.register(new HarmonyEngine());

    registry.register(new BalanceEngine());

    registry.register(new UniverseEngine());

    registry.register(new EvolutionEngine());

    registry.register(new GrowthEngine());

    registry.register(new GravityEngine());

    registry.register(new MatterEngine());

    registry.register(new ParticleEngine());

    registry.register(new LightEngine());

    registry.register(new PulseEngine());

    registry.register(new NebulaEngine());

    registry.register(new StarEngine());

    registry.register(new GalaxyEngine());

    registry.register(new BlackHoleEngine());

    registry.register(new PlanetEngine());

    registry.register(new OceanEngine());

    registry.register(new AtmosphereEngine());

    registry.register(new DNAEngine());

    registry.register(new SpeciesEngine());

    registry.register(new ConsciousnessEngine());

    registry.register(new AwarenessEngine());

    registry.register(new CuriosityEngine());

    registry.register(new LearningEngine());

    registry.register(new KnowledgeEngine());

    registry.register(new MemoryEngine());

    registry.register(new MemoryEvolutionEngine());

    registry.register(new CivilizationEngine());

    registry.register(new TechnologyEngine());

    registry.register(new DreamEngine());

    registry.register(new RealityEngine());

    registry.register(new ExistenceEngine());

    registry.register(new CreationEngine());

    registry.register(new WisdomEngine());

    registry.register(new TimelineEngine());

    registry.register(new SimulationEngine());

  }

}