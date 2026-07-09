/**
 * ==========================================================
 * LÉLUVERSE
 * STAR FIELD
 *
 * Master controller for every
 * living star system.
 * ==========================================================
 */

import RegularStars from "./RegularStars";
import TravelerStars from "./TravelerStars";
import RetrogradeStars from "./RetrogradeStars";
import WanderStars from "./WanderStars";
import ClusterStars from "./ClusterStars";
import OrbitStars from "./OrbitStars";
import PulseStars from "./PulseStars";
import PortalStars from "./PortalStars";
import CodeStars from "./CodeStars";

export default function StarField() {

  return (

    <group>

      {/* ======================================
          Foundation Stars
      ====================================== */}

      <RegularStars />

      {/* ======================================
          High Speed Travelers
      ====================================== */}

      <TravelerStars />

      {/* ======================================
          Retrograde Motion
      ====================================== */}

      <RetrogradeStars />

      {/* ======================================
          Wandering Intelligence
      ====================================== */}

      <WanderStars />

      {/* ======================================
          Living Clusters
      ====================================== */}

      <ClusterStars />

      {/* ======================================
          Orbital Systems
      ====================================== */}

      <OrbitStars />

      {/* ======================================
          Pulse Network
      ====================================== */}

      <PulseStars />

      {/* ======================================
          Portal Universe
      ====================================== */}

      <PortalStars />

      {/* ======================================
          Flowing Cosmic Code
      ====================================== */}

      <CodeStars />

      {/*
      =====================================================

      Future Systems

      <GalaxyStars />

      <ConstellationStars />

      <DeepSpaceStars />

      <RollerCoasterStars />

      <DanceStars />

      <PodStars />

      <ParadeStars />

      <CrystalStars />

      <BloomStars />

      <WarpStars />

      <MemoryStars />

      <TransitStars />

      <ZodiacStars />

      =====================================================
      */}

    </group>

  );

}