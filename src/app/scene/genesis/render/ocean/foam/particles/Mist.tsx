/**
 * ==========================================================
 * LÉLUVERSE
 * MIST
 *
 * Fine ocean mist suspended above the Genesis Ocean.
 *
 * Responsibilities
 * ----------------
 * • Floating mist
 * • Surface haze
 * • Tide breathing
 * • Current drift
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

import type { OceanState } from "../../Ocean";

interface Props {
  oceanState?: OceanState;
}

interface MistParticle {

  x: number;

  y: number;

  z: number;

  size: number;

  speed: number;

  offset: number;

  opacity: number;

}

export default function Mist({
  oceanState = {},
}: Props) {

  const group =
    useRef<Group>(null);

  const time =
    useRef(0);

  const particles =
    useMemo<MistParticle[]>(() => {

      return Array.from({

        length: 180,

      }, (): MistParticle => ({

        x:
          (Math.random() - 0.5) * 5,

        y:
          2.35 +
          Math.random() * 0.30,

        z:
          (Math.random() - 0.5) * 5,

        size:
          0.08 +
          Math.random() * 0.22,

        speed:
          0.04 +
          Math.random() * 0.14,

        offset:
          Math.random() * 100,

        opacity:
          0.015 +
          Math.random() * 0.03,

      }));

    }, []);

  useFrame((_, delta) => {

    if (!group.current)
      return;

    time.current += delta;

    const tide =
      oceanState.tide ?? 0.5;

    const current =
      oceanState.current ?? 0.5;

    group.current.children.forEach(
      (child, i) => {

        const mesh =
          child as Mesh;

        const particle =
          particles[i];

        mesh.position.x =
          particle.x +
          Math.sin(
            time.current *
            particle.speed +
            particle.offset,
          ) *
          0.25 *
          current;

        mesh.position.z =
          particle.z +
          Math.cos(
            time.current *
            particle.speed +
            particle.offset,
          ) *
          0.25 *
          current;

        mesh.position.y =
          particle.y +
          Math.sin(
            time.current *
            0.8 +
            particle.offset,
          ) *
          0.05 *
          tide;

        mesh.rotation.z +=
          delta *
          0.04;

        const pulse =
          1 +
          Math.sin(
            time.current *
            1.2 +
            particle.offset,
          ) *
          0.12;

        mesh.scale.setScalar(
          particle.size *
          pulse,
        );

      },

    );

  });

  return (

    <group ref={group}>

      {particles.map((

        particle,

        i,

      ) => (

        <mesh
          key={i}
        >

          <circleGeometry
            args={[
              1,
              16,
            ]}
          />

          <meshBasicMaterial

            color="#f7fdff"

            transparent

            opacity={
              particle.opacity
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