/**
 * ==========================================================
 * LÉLUVERSE
 * SHORE FOAM
 *
 * Floating foam that gathers along the outer edge of
 * the Genesis Ocean.
 *
 * Responsibilities
 * ----------------
 * • Shoreline foam
 * • Circular foam bands
 * • Slow drift
 * • Tide response
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

interface FoamPatch {

  radius: number;

  angle: number;

  height: number;

  size: number;

  speed: number;

  offset: number;

  opacity: number;

}

export default function ShoreFoam({
  oceanState = {},
}: Props) {

  const group =
    useRef<Group>(null);

  const time =
    useRef(0);

  const foam =
    useMemo<FoamPatch[]>(() => {

      return Array.from({

        length: 220,

      }, (): FoamPatch => ({

        radius:
          2.30 +
          Math.random() * 0.18,

        angle:
          Math.random() *
          Math.PI * 2,

        height:
          2.18 +
          Math.random() * 0.04,

        size:
          0.03 +
          Math.random() * 0.08,

        speed:
          0.08 +
          Math.random() * 0.25,

        offset:
          Math.random() * 100,

        opacity:
          0.06 +
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

        const patch =
          foam[i];

        const angle =

          patch.angle +

          time.current *

          patch.speed *

          current *

          0.08;

        mesh.position.x =

          Math.cos(angle) *

          patch.radius;

        mesh.position.z =

          Math.sin(angle) *

          patch.radius;

        mesh.position.y =

          patch.height +

          Math.sin(

            time.current *

            1.8 +

            patch.offset,

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
          0.3;

        const pulse =

          1 +

          Math.sin(

            time.current *

            2.5 +

            patch.offset,

          ) *

          0.18;

        mesh.scale.setScalar(

          patch.size *

          pulse,

        );

      },

    );

  });

  return (

    <group ref={group}>

      {foam.map((

        patch,

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
              patch.opacity
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