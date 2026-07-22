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

import GenesisCoreMaterial
  from "./GenesisCoreMaterial";

interface Props {

  activity: number;

}

export default function GenesisCore({

  activity,

}: Props) {

  const mesh =

    useRef<Mesh>(null);

  const material =

    useMemo(

      () => new GenesisCoreMaterial(),

      [],

    );

  useFrame((_, delta) => {

    material.uniforms.uTime.value += delta;

    material.uniforms.uActivity.value = activity;

    if (!mesh.current) {

      return;

    }

    mesh.current.rotation.y += delta * 0.15;

    mesh.current.rotation.x += delta * 0.04;

  });

  return (

    <mesh

      ref={mesh}

      renderOrder={201}

      material={material}

    >

      <icosahedronGeometry

        args={[

          0.55,

          64,

        ]}

      />

    </mesh>

  );

}