/**
 * ==========================================================
 * LÉLUVERSE
 * BUBBLE SPRAY
 *
 * Bubble spray rising from breaking waves.
 *
 * Responsibilities
 * ----------------
 * • Rising bubbles
 * • Surface spray
 * • Tide response
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
} from "three";

import type { OceanState } from "../../Ocean";

interface Props {
  oceanState?: OceanState;
}

interface Bubble {

  x: number;

  y: number;

  z: number;

  size: number;

  speed: number;

  rise: number;

  offset: number;

  opacity: number;

}

export default function BubbleSpray({
  oceanState = {},
}: Props) {

  const group =
    useRef<Group>(null);

  const time =
    useRef(0);

  const bubbles =
    useMemo<Bubble[]>(() => {

      return Array.from({

        length: 320,

      }, (): Bubble => ({

        x:
          (Math.random() - 0.5) * 4.4,

        y:
          2.08 +
          Math.random() * 0.08,

        z:
          (Math.random() - 0.5) * 4.4,

        size:
          0.008 +
          Math.random() * 0.03,

        speed:
          0.4 +
          Math.random() * 0.8,

        rise:
          0.25 +
          Math.random() * 0.55,

        offset:
          Math.random() * 100,

        opacity:
          0.08 +
          Math.random() * 0.12,

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

        const bubble =
          bubbles[i];

        mesh.position.x =
          bubble.x +
          Math.sin(
            time.current *
            bubble.speed +
            bubble.offset,
          ) *
          0.08 *
          current;

        mesh.position.z =
          bubble.z +
          Math.cos(
            time.current *
            bubble.speed +
            bubble.offset,
          ) *
          0.08 *
          current;

        mesh.position.y =
          bubble.y +

          ((time.current *
            bubble.rise +
            bubble.offset) %
            1.5);

        if (
          mesh.position.y >
          3.6
        ) {

          mesh.position.y =
            bubble.y;

        }

        const pulse =

          1 +

          Math.sin(

            time.current *

            6 +

            bubble.offset,

          ) *

          0.25 *

          tide;

        mesh.scale.setScalar(

          bubble.size *

          pulse,

        );

      },

    );

  });

  return (

    <group ref={group}>

      {bubbles.map((

        bubble,

        i,

      ) => (

        <mesh
          key={i}
        >

          <sphereGeometry
            args={[
              1,
              10,
              10,
            ]}
          />

          <meshBasicMaterial

            color="#ffffff"

            transparent

            opacity={
              bubble.opacity
            }

            depthWrite={false}

          />

        </mesh>

      ))}

    </group>

  );

}