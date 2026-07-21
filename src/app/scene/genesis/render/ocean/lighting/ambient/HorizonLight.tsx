/**
 * ==========================================================
 * LÉLUVERSE
 * HORIZON LIGHT
 *
 * Soft horizon illumination surrounding
 * the Genesis Ocean.
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

interface HorizonBeam {

  radius: number;

  angle: number;

  height: number;

  width: number;

  opacity: number;

  speed: number;

  offset: number;

}

export default function HorizonLight({

  oceanState = {},

}: Props) {

  const group =
    useRef<Group>(null);

  const beams =
    useMemo<HorizonBeam[]>(() => {

      return Array.from({

        length: 72,

      }, (): HorizonBeam => ({

        radius:
          2.9 +
          Math.random() * 0.3,

        angle:
          Math.random() *
          Math.PI *
          2,

        height:
          2.35 +
          Math.random() * 0.15,

        width:
          0.15 +
          Math.random() * 0.20,

        opacity:
          0.025 +
          Math.random() * 0.05,

        speed:
          0.02 +
          Math.random() * 0.04,

        offset:
          Math.random() * 100,

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

        const beam =
          beams[i];

        const angle =

          beam.angle +

          time *

          beam.speed;

        mesh.position.x =

          Math.cos(angle) *

          beam.radius;

        mesh.position.z =

          Math.sin(angle) *

          beam.radius;

        mesh.position.y =

          beam.height +

          Math.sin(

            time +

            beam.offset,

          ) *

          0.05 *

          tide;

        mesh.lookAt(

          0,

          mesh.position.y,

          0,

        );

        mesh.scale.set(

          beam.width,

          0.6 +

          Math.sin(

            time * 0.7 +

            beam.offset,

          ) *

          0.12,

          1,

        );

      },

    );

  });

  return (

    <group ref={group}>

      {beams.map((

        beam,

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

            color="#bfeeff"

            transparent

            opacity={
              beam.opacity
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