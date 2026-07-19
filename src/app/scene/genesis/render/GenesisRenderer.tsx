/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS RENDERER
 *
 * Full living universe stack
 *
 * ==========================================================
 */


import Cosmos
  from "../environment/Cosmos";


import ChaosSystem
  from "../systems/ChaosSystem";



/*
 * CORE SYSTEMS
 */


import CoreSystem
  from "../systems/CoreSystem";


import CoreAtmosphere
  from "../systems/CoreAtmosphere";


import CoreMemoryVeins
  from "./CoreMemoryVeins";


import CoreMutationSystem
  from "../systems/CoreMutationSystem";



/*
 * EVOLUTION
 */


import CoreEvolutionSystem
  from "../systems/CoreEvolutionSystem";


import CoreBehaviorEngine
  from "../systems/CoreBehaviorEngine";


import InfiniteBehaviorSystem
  from "../systems/InfiniteBehaviorSystem";



/*
 * FUSION
 */


import ThermalFusionSystem
  from "../systems/ThermalFusionSystem";


import ThermalFusionVisualizer
  from "../systems/ThermalFusionVisualizer";


import CosmicFusionSystem
  from "../systems/CosmicFusionSystem";


import CosmicFusionVisualizer
  from "./CosmicFusionVisualizer";



/*
 * ELECTROMAGNETIC
 */


import ElectromagneticSystem
  from "../systems/ElectromagneticSystem";


import ElectromagneticVisualizer
  from "./ElectromagneticVisualizer";


import GenesisResonanceSystem
  from "../systems/GenesisResonanceSystem";


import GenesisResonanceVisualizer
  from "./GenesisResonanceVisualizer";



/*
 * PLANET SYSTEMS
 */


import PolarSystem
  from "../systems/PolarSystem";


import WeatherSystem
  from "../systems/WeatherSystem";


import StormSystem
  from "../systems/StormSystem";


import TectonicSystem
  from "../systems/TectonicSystem";


import OceanSystem
  from "../systems/OceanSystem";


import PlanetaryEventSystem
  from "../systems/PlanetaryEventSystem";


import EcosystemSystem
  from "./EcosystemSystem";


import EcosystemEcosystem
  from "./EcosystemEcosystem";



/*
 * PLANET VISUALS
 */


import AuroraPolarVisualizer
  from "./AuroraPolarVisualizer";


import OceanVisualizer
  from "./OceanVisualizer";


import TectonicVisualizer
  from "./TectonicVisualizer";


import EcosystemVisualizer
  from "./EcosystemVisualizer";



/*
 * WORLD SYSTEMS
 */


import EnergySystem
  from "../systems/EnergySystem";


import GalaxySystem
  from "../systems/GalaxySystem";


import LightningSystem
  from "../systems/LightningSystem";


import MatterSystem
  from "../systems/MatterSystem";


import NebulaSystem
  from "../systems/NebulaSystem";


import NeuronSystem
  from "../systems/NeuronSystem";


import ParticleSystem
  from "../systems/ParticleSystem";


import RealitySystem
  from "../systems/RealitySystem";



/*
 * WORLD VISUALS
 */


import GenesisLightingVisualizer
  from "./GenesisLightingVisualizer";


import GenesisSkyVisualizer
  from "./GenesisSkyVisualizer";


import GenesisParticleVisualizer
  from "./GenesisParticleVisualizer";


import PortalNavigationVisualizer
  from "./PortalNavigationVisualizer";



/*
 * INTERFACE
 */


import CognitionVisualizer
  from "../CognitionVisualizer";


import GenesisWorkspace
  from "../GenesisWorkspace";


import BrowserActionVisualizer
  from "../BrowserActionVisualizer";





export default function GenesisRenderer(){


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

      <EcosystemEcosystem />



      <AuroraPolarVisualizer />

      <OceanVisualizer />

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