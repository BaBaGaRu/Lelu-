/**
 * ==========================================================
 * LÉLUVERSE
 * COSMOS
 *
 * Master living universe.
 * Every environment layer is
 * assembled here.
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";

import {
  useRef,
} from "react";

import {
  Group,
} from "three";

import AuroraCosmos from "./AuroraCosmos";
import StarField from "./stars/StarField";

export default function Cosmos() {

  const universe =
    useRef<Group>(null);

  useFrame(({ clock }, delta) => {

    if (!universe.current)
      return;

    const t =
      clock.elapsedTime;

    universe.current.position.x =

      Math.sin(
        t * 0.02,
      ) * 1.4;

    universe.current.position.y =

      Math.cos(
        t * 0.015,
      ) * 0.9;

    universe.current.rotation.z =

      Math.sin(
        t * 0.01,
      ) * 0.015;

    universe.current.rotation.y +=

      delta * 0.002;

  });

  return (

    <group ref={universe}>

      {/* ============================================
          STAR SYSTEM
      ============================================ */}

      <StarField />

      {/* ============================================
          AURORA
      ============================================ */}

      <AuroraCosmos />

      {/*
      ===============================================

      Future Systems

      <GalaxyField />

      <NebulaField />

      <DustField />

      <PortalField />

      <ConstellationField />

      <WeatherField />

      ===============================================
      */}

    </group>

  );

}