/**
 * ==========================================================
 * LÉLUVERSE
 * FOAM TRAILS
 *
 * Long flowing trails of foam left behind by
 * ocean currents and rotating water.
 *
 * Responsibilities
 * ----------------
 * • Foam streaks
 * • Current ribbons
 * • Spiral drift
 * • Tide animation
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

interface Trail {

  radius: number;

  angle: number;

  height: number;

  width: number;

  length: number;

  speed: number;

  offset: number;

  opacity: number;

}

export default function FoamTrails({
  oceanState = {},
}: Props) {

  const group =
    useRef<Group>(null);

  const time =
    useRef(0);

  const trails =
    useMemo<Trail[]>(() => {

      return Array.from({

        length: 140,

      }, (): Trail => ({

        radius:
          0.45 +
          Math.random() * 2,

        angle:
          Math.random() *
          Math.PI * 2,

        height:
          2.20 +
          Math.random() * 0.04,

        width:
          0.03 +
          Math.random() * 0.04,

        length:
          0.10 +
          Math.random() * 0.18,

        speed:
          0.05 +
          Math.random() * 0.18,

        offset:
          Math.random() * 100,

        opacity:
          0.05 +
          Math.random() * 0.10,

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

        const trail =
          trails[i];

        const angle =

          trail.angle +

          time.current *

          trail.speed *

          current;

        mesh.position.x =

          Math.cos(angle) *

          trail.radius;

        mesh.position.z =

          Math.sin(angle) *

          trail.radius;

        mesh.position.y =

          trail.height +

          Math.sin(

            time.current *

            1.4 +

            trail.offset,

          ) *

          0.02 *

          tide;

        mesh.lookAt(
          0,
          mesh.position.y,
          0,
        );

        mesh.rotation.z +=
          delta *
          0.15;

        mesh.scale.set(

          trail.length *

          (

            1 +

            Math.sin(

              time.current *

              2 +

              trail.offset,

            ) *

            0.12

          ),

          trail.width,

          1,

        );

      },

    );

  });

  return (

    <group ref={group}>

      {trails.map((

        trail,

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

            color="#ffffff"

            transparent

            opacity={
              trail.opacity
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