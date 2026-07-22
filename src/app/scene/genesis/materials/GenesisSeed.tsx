import {
  useFrame,
} from "@react-three/fiber";

import {
  useRef,
} from "react";

import {
  Mesh,
} from "three";

interface Props {

  activity: number;

}

export default function GenesisSeed({

  activity,

}: Props) {

  const seed =

    useRef<Mesh>(null);

  useFrame((_, delta) => {

    if (!seed.current) {

      return;

    }

    const pulse =

      1 +

      Math.sin(

        performance.now() * 0.003

      ) *

      (

        0.04 +

        activity * 0.015

      );

    seed.current.scale.setScalar(

      pulse

    );

    seed.current.rotation.y +=

      delta * 0.25;

  });

  return (

    <mesh

      ref={seed}

      renderOrder={202}

    >

      <sphereGeometry

        args={[

          0.17,

          48,

          48,

        ]}

      />

      <meshBasicMaterial

        color="#ffffff"

        toneMapped={false}

      />

      <pointLight

        color="#88ddff"

        intensity={

          14 +

          activity * 8

        }

        distance={25}

      />

    </mesh>

  );

}