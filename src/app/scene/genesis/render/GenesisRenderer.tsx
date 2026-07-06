/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS RENDERER
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

      {/* Debug Sphere */}

      <mesh>

        <sphereGeometry args={[1, 32, 32]} />

        <meshStandardMaterial
          color="hotpink"
          emissive="hotpink"
          emissiveIntensity={0.5}
        />

      </mesh>

      {/* Genesis Systems */}

      <ChaosSystem />

      <EnergySystem />

      <MatterSystem />

      <RealitySystem />

      <ParticleSystem />

      <LightningSystem />

      <NeuronSystem />

      <GalaxySystem />

      <CoreSystem />

    </>

  );

}