/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS RENDERER
 *
 * Master renderer for the
 * living Genesis universe.
 * ==========================================================
 */

import Cosmos from "../environment/Cosmos";

import ChaosSystem from "../systems/ChaosSystem";
import CoreSystem from "../systems/CoreSystem";
import EnergySystem from "../systems/EnergySystem";
import GalaxySystem from "../systems/GalaxySystem";
import LightningSystem from "../systems/LightningSystem";
import MatterSystem from "../systems/MatterSystem";
import NebulaSystem from "../systems/NebulaSystem";
import NeuronSystem from "../systems/NeuronSystem";
import ParticleSystem from "../systems/ParticleSystem";
import RealitySystem from "../systems/RealitySystem";

export default function GenesisRenderer() {

  return (

    <>

      {/* ============================================
          LIVING COSMOS
      ============================================ */}

      <Cosmos />

      {/* ============================================
          GENESIS SYSTEMS
      ============================================ */}

      <ChaosSystem />

      <EnergySystem />

      <MatterSystem />

      <RealitySystem />

      <NebulaSystem />

      <ParticleSystem />

      <LightningSystem />

      <NeuronSystem />

      <GalaxySystem />

      {/* ============================================
          LIVING CORE
      ============================================ */}

      <CoreSystem />

    </>

  );

}