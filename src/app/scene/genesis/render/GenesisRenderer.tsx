/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS RENDERER
 *
 * Full living universe stack
 * ==========================================================
 */

import Cosmos from "../environment/Cosmos";

import ChaosSystem from "../systems/ChaosSystem";

import CoreSystem from "../systems/CoreSystem";
import CoreAtmosphere from "../systems/CoreAtmosphere";
import CoreMemoryVeins from "./CoreMemoryVeins";
import CoreMutationSystem from "../systems/CoreMutationSystem";

import CoreEvolutionSystem from "../systems/CoreEvolutionSystem";
import CoreBehaviorEngine from "../systems/CoreBehaviorEngine";
import InfiniteBehaviorSystem from "../systems/InfiniteBehaviorSystem";

import ThermalFusionSystem from "../systems/ThermalFusionSystem";
import ThermalFusionVisualizer from "../systems/ThermalFusionVisualizer";
import CosmicFusionSystem from "../systems/CosmicFusionSystem";
import CosmicFusionVisualizer from "../systems/CosmicFusionVisualizer";

import ElectromagneticSystem from "./ElectromagneticSystem";
import ElectromagneticVisualizer from "./ElectromagneticVisualizer";
import GenesisResonanceSystem from "./GenesisResonanceSystem";
import GenesisResonanceVisualizer from "./GenesisResonanceVisualizer";

import PolarSystem from "../systems/PolarSystem";
import WeatherSystem from "../systems/WeatherSystem";
import StormSystem from "../systems/StormSystem";
import TectonicSystem from "../systems/TectonicSystem";
import OceanSystem from "../systems/OceanSystem";
import PlanetaryEventSystem from "../systems/PlanetaryEventSystem";
import EcosystemSystem from "./EcosystemSystem";

import AuroraPolarVisualizer from "./AuroraPolarVisualizer";
import Ocean from "./ocean/Ocean";
import TectonicVisualizer from "./TectonicVisualizer";
import EcosystemVisualizer from "./EcosystemVisualizer";

import EnergySystem from "../systems/EnergySystem";
import GalaxySystem from "../systems/GalaxySystem";
import LightningSystem from "../systems/LightningSystem";
import MatterSystem from "../systems/MatterSystem";
import NebulaSystem from "../systems/NebulaSystem";
import NeuronSystem from "../systems/NeuronSystem";
import ParticleSystem from "../systems/ParticleSystem";
import RealitySystem from "../systems/RealitySystem";

import GenesisLightingVisualizer from "./GenesisLightingVisualizer";
import GenesisSkyVisualizer from "./GenesisSkyVisualizer";
import GenesisParticleVisualizer from "./GenesisParticleVisualizer";
import PortalNavigationVisualizer from "./PortalNavigationVisualizer";

import CognitionVisualizer from "../CognitionVisualizer";
import GenesisWorkspace from "../GenesisWorkspace";
import BrowserActionVisualizer from "../BrowserActionVisualizer";

export default function GenesisRenderer() {

  return (

    <>

      <Cosmos />

      <ChaosSystem />
      <NebulaSystem />
      <GalaxySystem />
      <ParticleSystem />

      <EnergySystem />
      <MatterSystem />
      <RealitySystem />

      <LightningSystem />
      <NeuronSystem />

      <CognitionVisualizer />
      <GenesisWorkspace />
      <BrowserActionVisualizer />

      <CoreEvolutionSystem />
      <CoreBehaviorEngine />
      <InfiniteBehaviorSystem />
      <CoreMutationSystem />

      <ThermalFusionSystem />
      <ThermalFusionVisualizer />

      <CosmicFusionSystem />
      <CosmicFusionVisualizer />

      <ElectromagneticSystem />
      <ElectromagneticVisualizer />

      <GenesisResonanceSystem />
      <GenesisResonanceVisualizer />

      <PolarSystem />
      <WeatherSystem />
      <StormSystem />
      <TectonicSystem />
      <OceanSystem />
      <PlanetaryEventSystem />
      <EcosystemSystem />

      <AuroraPolarVisualizer />
      <Ocean />
      <TectonicVisualizer />
      <EcosystemVisualizer />

      <GenesisLightingVisualizer />
      <GenesisSkyVisualizer />
      <GenesisParticleVisualizer />
      <PortalNavigationVisualizer />

      <CoreSystem />
      <CoreAtmosphere />
      <CoreMemoryVeins />

    </>

  );

}