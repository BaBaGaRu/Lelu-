/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS RENDERER
 *
 * Renders every active Genesis system.
 * ==========================================================
 */

import ChaosSystem from "../systems/ChaosSystem";
import CoreSystem from "../systems/CoreSystem";
import EnergySystem from "../systems/EnergySystem";
import GalaxySystem from "../systems/GalaxySystem";
import LightningSystem from "../systems/LightningSystem";
import MatterSystem from "../systems/MatterSystem";
import NeuronSystem from "../systems/NeuronSystem";
import ParticleSystem from "../systems/ParticleSystem";
import RealitySystem from "../systems/RealitySystem";

export default function GenesisRenderer() {

  return (

    <>

      {/* Foundation */}

      <ChaosSystem />

      <EnergySystem />

      <MatterSystem />

      <RealitySystem />

      {/* Visual Systems */}

      <ParticleSystem />

      <LightningSystem />

      <NeuronSystem />

      <GalaxySystem />

      {/* Core */}

      <CoreSystem />

    </>

  );

}