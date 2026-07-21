/**
 * ==========================================================
 * LÉLUVERSE
 * FOAM DRIFT
 *
 * Ocean foam drifting across the surface with
 * planetary currents.
 *
 * Responsibilities
 * ----------------
 * • Foam movement
 * • Current simulation
 * • Tide response
 * • Organic drift
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

interface DriftParticle {

  x: number;

  y: number;

  z: number;

  size: number;

  speed: number;

  offset: number;

  opacity: number;

}

export default function FoamDrift({
  oceanState = {},
}: Props) {

  const group =
    useRef<Group>(null);

  const time =
    useRef(0);

  const particles =
    useMemo<DriftParticle[]>(() => {

      return Array.from({

        length: 260,

      }, (): DriftParticle => ({

        x:
          (Math.random() - 0.5) * 5,

        y:
          2.21 +
          Math.random() * 0.05,

        z:
          (Math.random() - 0.5) * 5,

        size:
          0.03 +
          Math.random() * 0.10,

        speed:
          0.05 +
          Math.random() * 0.18,

        offset:
          Math.random() * 100,

        opacity:
          0.05 +
          Math.random() * 0.08,

      }));

    }, []);

  useFrame((_, delta) => {

    if (!group.current)
      return;

    time.current += delta;

    const current =
      oceanState.current ?? 0.5;

    const tide =
      oceanState.tide ?? 0.5;

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
          0.28 *
          current;

        mesh.position.z =
          particle.z +
          Math.cos(
            time.current *
            particle.speed +
            particle.offset,
          ) *
          0.28 *
          current;

        mesh.position.y =
          particle.y +
          Math.sin(
            time.current *
            0.8 +
            particle.offset,
          ) *
          0.015 *
          tide;

        mesh.rotation.z +=
          delta *
          0.18;

        const pulse =
          1 +
          Math.sin(
            time.current *
            2 +
            particle.offset,
          ) *
          0.15;

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
              18,
            ]}
          />

          <meshBasicMaterial

            color="#ffffff"

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