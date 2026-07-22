/**
 * ==========================================================
 * LÉLUVERSE
 * SURFACE OCEAN
 *
 * Animated planetary ocean surface
 * surrounding the Deep Ocean.
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
  Mesh,
} from "three";

import OceanMaterial
  from "../../materials/OceanMaterial";

import type {
  OceanState,
} from "./Ocean";

interface Props {

  oceanState?: OceanState;

}

export default function SurfaceOcean({

  oceanState = {},

}: Props) {

  const surface =

    useRef<Mesh>(null);

  const material =

    useMemo(

      () => new OceanMaterial(),

      [],

    );

  const time =

    useRef(0);

  useFrame((_, delta) => {

    if (!surface.current) {

      return;

    }

    time.current += delta;

    const tide =

      oceanState.tide ?? 0.5;

    const current =

      oceanState.current ?? 0.5;

    const tsunami =

      oceanState.tsunami ?? 0;

    material.uniforms.uTime.value =

      time.current;

    material.uniforms.uActivity.value =

      tsunami +

      current * 0.5;

    surface.current.rotation.y +=

      delta *

      0.012 *

      current;

    surface.current.rotation.x =

      Math.sin(

        time.current * 0.10

      ) *

      0.01 *

      tide;

    surface.current.rotation.z =

      Math.cos(

        time.current * 0.08

      ) *

      0.008 *

      tide;

    const breathe =

      1 +

      Math.sin(

        time.current * 0.45

      ) *

      0.01 *

      tide +

      tsunami * 0.02;

    surface.current.scale.setScalar(

      breathe,

    );

  });

  return (

    <mesh

      ref={surface}

      renderOrder={40}

    >

      <sphereGeometry

        args={[

          3.12,

          256,

          256,

        ]}

      />

      <primitive

        object={material}

        attach="material"

      />

    </mesh>

  );

}