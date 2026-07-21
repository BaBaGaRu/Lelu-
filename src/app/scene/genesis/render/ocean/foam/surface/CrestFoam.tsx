/**
 * ==========================================================
 * LÉLUVERSE
 * CREST FOAM
 *
 * Foam generated along the tops of rolling waves.
 *
 * Responsibilities
 * ----------------
 * • Crest foam ribbons
 * • Wave peak motion
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
  DoubleSide,
} from "three";

import type { OceanState } from "../../Ocean";

interface Props {
  oceanState?: OceanState;
}

interface Crest {

  radius: number;

  angle: number;

  height: number;

  size: number;

  speed: number;

  offset: number;

  opacity: number;

}

export default function CrestFoam({
  oceanState = {},
}: Props) {

  const group =
    useRef<Group>(null);

  const time =
    useRef(0);

  const crests =
    useMemo<Crest[]>(() => {

      return Array.from({

        length: 120,

      }, (): Crest => ({

        radius:
          2.05 +
          Math.random() * 0.35,

        angle:
          Math.random() *
          Math.PI * 2,

        height:
          2.18 +
          Math.random() * 0.06,

        size:
          0.04 +
          Math.random() * 0.10,

        speed:
          0.15 +
          Math.random() * 0.45,

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

    const tide =
      oceanState.tide ?? 0.5;

    const current =
      oceanState.current ?? 0.5;

    group.current.children.forEach(
      (child, i) => {

        const mesh =
          child as Mesh;

        const crest =
          crests[i];

        const angle =

          crest.angle +

          time.current *

          crest.speed *

          current *

          0.15;

        mesh.position.x =

          Math.cos(angle) *

          crest.radius;

        mesh.position.z =

          Math.sin(angle) *

          crest.radius;

        mesh.position.y =

          crest.height +

          Math.sin(

            time.current *

            2 +

            crest.offset,

          ) *

          0.03 *

          tide;

        mesh.lookAt(
          0,
          mesh.position.y,
          0,
        );

        const pulse =

          1 +

          Math.sin(

            time.current *

            3 +

            crest.offset,

          ) *

          0.2;

        mesh.scale.setScalar(

          crest.size *

          pulse,

        );

        mesh.rotation.z +=

          delta *

          0.4;

      },

    );

  });

  return (

    <group ref={group}>

      {crests.map((

        crest,

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

            color="#ffffff"

            transparent

            opacity={
              crest.opacity
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