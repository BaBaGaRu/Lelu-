/**
 * ==========================================================
 * LÉLUVERSE
 * CORE SYSTEM
 *
 * The living heart of Genesis.
 *
 * Behaviors:
 * - heartbeat
 * - ocean resonance
 * - tectonic breathing
 * - consciousness rotation
 *
 * Geometry preserved.
 * ==========================================================
 */

import {
  useFrame,
} from "@react-three/fiber";

import {
  useMemo,
  useRef,
} from "react";

import {
  Group,
} from "three";

import {
  useGenesis,
} from "../GenesisCore";

import CoreConductor
  from "../materials/CoreConductor";

import GenesisCore
  from "../materials/GenesisCore";

import GenesisSeed
  from "../materials/GenesisSeed";

import GenesisCorona
  from "../materials/GenesisCorona";

import CrystalShell
  from "../materials/CrystalShell";

import ElectricShell
  from "../materials/ElectricShell";

import HaloShell
  from "../materials/HaloShell";

export default function CoreSystem() {

  const {

    state,

  } = useGenesis();

  const conductor =

    useMemo(

      () => new CoreConductor(),

      [],

    );

  const core =

    useRef<Group>(null);

  const activity =

    (

      state.thinking ? 1 : 0

    )

    +

    (

      state.speaking ? 0.7 : 0

    )

    +

    (

      state.listening ? 0.4 : 0

    )

    +

    (

      state.actions.length > 0

        ? 0.5

        : 0

    );

  useFrame((_, delta) => {

    if (!core.current) {

      return;

    }

    conductor.update(

      delta,

      activity,

    );

    const {

      heartbeat,

      resonance,

      quake,

    } = conductor.state;

    const scale =

      1

      +

      heartbeat

      +

      resonance

      +

      activity * 0.02;

    core.current.scale.setScalar(

      scale

    );

    core.current.position.x =

      quake;

    core.current.position.y =

      Math.sin(

        conductor.state.time * 0.2

      )

      *

      0.015;

    core.current.rotation.y +=

      delta *

      (

        state.online

          ?

          0.08 +

          state.messages.length * 0.001

          :

          0.03

      );

  });

  return (

    <group

      ref={core}

      renderOrder={200}

    >

      <GenesisSeed

        activity={activity}

      />

      <GenesisCore

        activity={activity}

      />

      <CrystalShell

        activity={activity}

      />

      <ElectricShell

        activity={activity}

      />

      <HaloShell

        activity={activity}

      />

      <GenesisCorona

        activity={activity}

      />

    </group>

  );

}