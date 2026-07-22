/**
 * ==========================================================
 * LÉLUVERSE
 * SURFACE OCEAN
 *
 * Animated ocean surface surrounding Genesis.
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import { useMemo } from "react";

import OceanMaterial from "../../materials/OceanMaterial";

interface Props {

  activity: number;

}

export default function SurfaceOcean({

  activity,

}: Props) {

  const material = useMemo(

    () => new OceanMaterial(),

    []

  );

  useFrame((_, delta) => {

    material.uniforms.uTime.value += delta;

    material.uniforms.uActivity.value = activity;

  });

  return (

    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      renderOrder={40}
    >

      <circleGeometry
        args={[
          2.75,
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