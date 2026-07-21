/**
 * ==========================================================
 * LÉLUVERSE
 * OCEAN VISUALIZER
 *
 * Visible planetary water layer.
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

import OceanShader from "./ocean/shaders/OceanShader";

import {
  useGenesis,
} from "../GenesisCore";

export default function OceanVisualizer() {

  const {

    state,

  } = useGenesis();

  const ocean =

    useRef<Group>(null);

  const waves =

    useRef<Group>(null);

  const time =

    useRef(0);

  const rings =

    useMemo(

      () =>

        Array.from({

          length: 12,

        }),

      [],

    );

  useFrame((_, delta) => {

    time.current += delta;

    OceanShader.uniforms.uTime.value =

      time.current;

    if (

      !ocean.current ||

      !waves.current

    ) {

      return;

    }

    const water =

      (state as any)

        .ocean ??

      {};

    const tide =

      water.tide ??

      0.5;

    const tsunami =

      water.tsunami ??

      0;

    const current =

      water.current ??

      0.5;

    ocean.current.rotation.y +=

      delta *

      current *

      0.02;

    ocean.current.scale.y =

      1 +

      Math.sin(

        time.current *

        0.8

      ) *

      0.03 *

      tide;

    waves.current.rotation.y +=

      delta *

      current;

    waves.current.scale.setScalar(

      1 +

      tsunami *

      2

    );

  });

  return (

    <group

      ref={ocean}

    >

      <mesh>

        <sphereGeometry

          args={[

            2.2,

            256,

            256,

          ]}

        />

        <primitive

          object={OceanShader}

          attach="material"

        />

      </mesh>

      <group

        ref={waves}

      >

        {

          rings.map((_, i) => (

            <mesh

              key={i}

              rotation={[

                Math.PI / 2,

                0,

                0,

              ]}

            >

              <torusGeometry

                args={[

                  2.5 +

                  i *

                  0.18,

                  0.01,

                  32,

                  128,

                ]}

              />

              <meshBasicMaterial

                color="#33ccff"

                transparent

                opacity={0.12}

              />

            </mesh>

          ))

        }

      </group>

      <pointLight

        intensity={4}

        distance={35}

        color="#33aaff"

      />

    </group>

  );

}