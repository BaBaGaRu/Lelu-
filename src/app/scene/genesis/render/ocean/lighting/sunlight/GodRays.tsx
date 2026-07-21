/**
 * ==========================================================
 * LÉLUVERSE
 * GOD RAYS
 *
 * Sun beams piercing through the Genesis Ocean.
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";

import {
  useMemo,
  useRef,
} from "react";

import {
  Group,
  Mesh,
  DoubleSide,
} from "three";

import type {
  OceanState,
} from "../../Ocean";

interface Props {

  oceanState?: OceanState;

}

interface Ray {

  radius: number;

  angle: number;

  height: number;

  width: number;

  length: number;

  speed: number;

  offset: number;

  opacity: number;

}

export default function GodRays({

  oceanState = {},

}: Props) {

  const group =
    useRef<Group>(null);

  const rays =
    useMemo<Ray[]>(() => {

      return Array.from({

        length: 48,

      }, (): Ray => ({

        radius:
          Math.random() * 1.8,

        angle:
          Math.random() *
          Math.PI * 2,

        height:
          3.8 +
          Math.random() * 0.5,

        width:
          0.08 +
          Math.random() * 0.12,

        length:
          1.8 +
          Math.random() * 2.5,

        speed:
          0.01 +
          Math.random() * 0.03,

        offset:
          Math.random() * 100,

        opacity:
          0.025 +
          Math.random() * 0.035,

      }));

    }, []);

  useFrame((state) => {

    if (!group.current)
      return;

    const time =
      state.clock.elapsedTime;

    const tide =
      oceanState.tide ?? 0.5;

    group.current.children.forEach(

      (child, i) => {

        const mesh =
          child as Mesh;

        const ray =
          rays[i];

        const angle =

          ray.angle +

          time *

          ray.speed;

        mesh.position.x =

          Math.cos(angle) *

          ray.radius;

        mesh.position.z =

          Math.sin(angle) *

          ray.radius;

        mesh.position.y =

          ray.height +

          Math.sin(

            time * 0.4 +

            ray.offset,

          ) *

          0.08 *

          tide;

        mesh.lookAt(

          0,

          0,

          0,

        );

        mesh.scale.set(

          ray.width,

          ray.length *

          (

            1 +

            Math.sin(

              time +

              ray.offset,

            ) *

            0.08

          ),

          1,

        );

      },

    );

  });

  return (

    <group ref={group}>

      {rays.map((

        ray,

        i,

      ) => (

        <mesh
          key={i}
        >

          <planeGeometry
            args={[
              1,
              1,
            ]}
          />

          <meshBasicMaterial

            color="#fff6c9"

            transparent

            opacity={
              ray.opacity
            }

            side={
              DoubleSide
            }

            depthWrite={false}

          />

        </mesh>

      ))}

    </group>

  );

}