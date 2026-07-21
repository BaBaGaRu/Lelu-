/**
 * ==========================================================
 * LÉLUVERSE
 * ENERGY BLOOM
 *
 * Large energetic blooms that pulse through
 * the Genesis Ocean.
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";

import {
  useMemo,
  useRef,
} from "react";

import {
  DoubleSide,
  Group,
  Mesh,
} from "three";

import type {
  OceanState,
} from "../../Ocean";

interface Props {

  oceanState?: OceanState;

}

interface Bloom {

  radius: number;

  angle: number;

  depth: number;

  size: number;

  speed: number;

  pulse: number;

  offset: number;

  opacity: number;

}

export default function EnergyBloom({

  oceanState = {},

}: Props) {

  const group =
    useRef<Group>(null);

  const blooms =
    useMemo<Bloom[]>(() => {

      return Array.from({

        length: 36,

      }, (): Bloom => ({

        radius:
          Math.random() * 1.8,

        angle:
          Math.random() *
          Math.PI * 2,

        depth:
          -0.3 -
          Math.random() * 1.8,

        size:
          0.18 +
          Math.random() * 0.45,

        speed:
          0.03 +
          Math.random() * 0.12,

        pulse:
          0.5 +
          Math.random() * 1.6,

        offset:
          Math.random() * 100,

        opacity:
          0.02 +
          Math.random() * 0.05,

      }));

    }, []);

  useFrame((state) => {

    if (!group.current)
      return;

    const time =
      state.clock.elapsedTime;

    const current =
      oceanState.current ?? 0.5;

    const tide =
      oceanState.tide ?? 0.5;

    group.current.children.forEach(

      (child, i) => {

        const mesh =
          child as Mesh;

        const bloom =
          blooms[i];

        const angle =

          bloom.angle +

          time *

          bloom.speed *

          current;

        mesh.position.x =

          Math.cos(angle) *

          bloom.radius;

        mesh.position.z =

          Math.sin(angle) *

          bloom.radius;

        mesh.position.y =

          bloom.depth +

          Math.sin(

            time *

            bloom.speed +

            bloom.offset,

          ) *

          0.08 *

          tide;

        const pulse =

          1 +

          Math.sin(

            time *

            bloom.pulse +

            bloom.offset,

          ) *

          0.35;

        mesh.scale.setScalar(

          bloom.size *

          pulse,

        );

        mesh.rotation.z +=
          0.0015;

      },

    );

  });

  return (

    <group ref={group}>

      {blooms.map((

        bloom,

        i,

      ) => (

        <mesh
          key={i}
        >

          <circleGeometry
            args={[
              1,
              32,
            ]}
          />

          <meshBasicMaterial

            color="#63dfff"

            transparent

            opacity={
              bloom.opacity
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