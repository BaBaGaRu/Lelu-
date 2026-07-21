/**
 * ==========================================================
 * LÉLUVERSE
 * FOAM CLUSTERS
 *
 * Floating groups of ocean foam that gather and
 * separate as the currents move.
 *
 * Responsibilities
 * ----------------
 * • Floating foam islands
 * • Ocean current response
 * • Tide breathing
 * • Cluster motion
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

interface Cluster {

  x: number;

  y: number;

  z: number;

  size: number;

  speed: number;

  offset: number;

  opacity: number;

}

export default function FoamClusters({
  oceanState = {},
}: Props) {

  const group =
    useRef<Group>(null);

  const time =
    useRef(0);

  const clusters =
    useMemo<Cluster[]>(() => {

      return Array.from({

        length: 90,

      }, (): Cluster => ({

        x:
          (Math.random() - 0.5) * 4.6,

        y:
          2.18 +
          Math.random() * 0.05,

        z:
          (Math.random() - 0.5) * 4.6,

        size:
          0.08 +
          Math.random() * 0.18,

        speed:
          0.08 +
          Math.random() * 0.18,

        offset:
          Math.random() * 100,

        opacity:
          0.18 +
          Math.random() * 0.18,

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

        const cluster =
          clusters[i];

        mesh.position.x =
          cluster.x +
          Math.sin(
            time.current *
            cluster.speed +
            cluster.offset,
          ) *
          0.15 *
          current;

        mesh.position.z =
          cluster.z +
          Math.cos(
            time.current *
            cluster.speed +
            cluster.offset,
          ) *
          0.15 *
          current;

        mesh.position.y =
          cluster.y +
          Math.sin(
            time.current *
            1.5 +
            cluster.offset,
          ) *
          0.025 *
          tide;

        mesh.rotation.z +=
          delta *
          0.25;

        const pulse =
          1 +
          Math.sin(
            time.current *
            2.5 +
            cluster.offset,
          ) *
          0.18;

        mesh.scale.setScalar(
          cluster.size *
          pulse,
        );

      },
    );

  });

  return (

    <group ref={group}>

      {clusters.map((
        cluster,
        i,
      ) => (

        <mesh
          key={i}
        >

          <circleGeometry
            args={[
              1,
              20,
            ]}
          />

          <meshBasicMaterial

            color="#ffffff"

            transparent

            opacity={
              cluster.opacity
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