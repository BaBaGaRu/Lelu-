/**
 * ==========================================================
 * LÉLUVERSE
 * GOD RAYS
 *
 * Soft underwater light shafts.
 * Integrated into the ocean volume.
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
  AdditiveBlending,
} from "three";

import type {
  OceanState,
} from "../../Ocean";


interface Props {
  oceanState?: OceanState;
}


interface Ray {

  radius:number;

  angle:number;

  depth:number;

  width:number;

  length:number;

  speed:number;

  offset:number;

}


export default function GodRays({

  oceanState = {},

}:Props){


  const group =
    useRef<Group>(null);


  const rays =
    useMemo<Ray[]>(()=>{

      return Array.from(
        {
          length:24,
        },

        ():Ray=>({

          radius:
            0.5 +
            Math.random()*2.5,

          angle:
            Math.random() *
            Math.PI *
            2,

          depth:
            -1.5 -
            Math.random()*2,

          width:
            0.04 +
            Math.random()*0.08,

          length:
            1 +
            Math.random()*1.8,

          speed:
            0.01 +
            Math.random()*0.03,

          offset:
            Math.random()*100,

        })

      );

    },[]);



  useFrame((state)=>{


    if(!group.current)
      return;


    const time =
      state.clock.elapsedTime;


    const tide =
      oceanState.tide ?? 0.5;


    group.current.children.forEach(

      (child,i)=>{


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
          ray.depth +
          Math.sin(
            time * 0.5 +
            ray.offset
          ) *
          0.05 *
          tide;


        mesh.lookAt(
          0,
          0,
          0,
        );


      }

    );


  });



  return (

    <group ref={group}>

      {
        rays.map((ray,i)=>(

          <mesh key={i}>

            <planeGeometry
              args={[
                1,
                1,
              ]}
            />

            <meshBasicMaterial

              color="#fff6c9"

              transparent

              opacity={0.02}

              side={DoubleSide}

              depthWrite={false}

              depthTest={true}

              blending={AdditiveBlending}

            />

          </mesh>

        ))
      }

    </group>

  );

}