/**
 * ==========================================================
 * LÉLUVERSE
 * UNIVERSE RENDERER
 *
 * Master renderer for every visual layer.
 * Every future mode plugs into this file.
 * ==========================================================
 */

import AuroraLayer from "./layers/AuroraLayer";
import NebulaLayer from "./layers/NebulaLayer";
import DustLayer from "./layers/DustLayer";
import GravityLayer from "./layers/GravityLayer";
import CoreLayer from "./layers/CoreLayer";
import LightningLayer from "./layers/LightningLayer";
import ParticleLayer from "./layers/ParticleLayer";

import { useGenesis } from "../GenesisCore";

export default function UniverseRenderer() {

  useGenesis();

  return (

    <group
      name="UniverseRenderer"
    >

      {/* =======================================================
          COSMIC BACKGROUND
      ======================================================== */}

      <AuroraLayer />

      <NebulaLayer />

      <DustLayer />

      {/* =======================================================
          SPACETIME
      ======================================================== */}

      <GravityLayer />

      {/* =======================================================
          LIVING CORE
      ======================================================== */}

      <CoreLayer />

      {/* =======================================================
          ENERGY
      ======================================================== */}

      <LightningLayer />

      <ParticleLayer />

    </group>

  );

}