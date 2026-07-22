/**
 * ==========================================================
 * LÉLUVERSE
 * ELECTRIC SHELL
 *
 * Living electromagnetic field
 * surrounding the Crystal Shell.
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

import ElectricMaterial
  from "./ElectricMaterial";

interface Props {

  activity: number;

}

export default function ElectricShell({

  activity,

}: Props) {

  const shell =

    useRef<Mesh>(null);

  const material =

    useMemo(

      () => new ElectricMaterial(),

      [],

    );

  useFrame((_, delta) => {

    material.uniforms.uTime.value +=
      delta;

    material.uniforms.uActivity.value =
      activity;

    material.uniforms.uIntensity.value =

      1 +

      activity * 0.35;

    if (!shell.current) {

      return;

    }

    shell.current.rotation.y +=

      delta * 0.22;

    shell.current.rotation.z -=

      delta * 0.11;

    const pulse =

      1 +

      Math.sin(

        performance.now() * 0.0025

      ) *

      0.015;

    shell.current.scale.setScalar(

      pulse

    );

  });

  return (

    <mesh

      ref={shell}

      renderOrder={205}

      material={material}

    >

      <icosahedronGeometry

        args={[

          0.78,

          64,

        ]}

      />

    </mesh>

  );

}