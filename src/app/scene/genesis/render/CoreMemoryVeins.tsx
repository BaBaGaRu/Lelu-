/**
 * ==========================================================
 * LÉLUVERSE
 * CORE MEMORY VEINS
 *
 * Living memory structures around the Core.
 * ==========================================================
 */


import {
  useFrame,
} from "@react-three/fiber";


import {
  useMemo,
  useRef,
} from "react";


import {
  Group,
} from "three";


import {
  useGenesis,
} from "../GenesisCore";





export default function CoreMemoryVeins() {


  const {

    state,

  } = useGenesis();


  const group =

    useRef<Group>(null);





  const veins =

    useMemo(

      () =>

        Array.from({

          length:12,

        }),

      [],

    );





  useFrame((_,delta)=>{


    if (!group.current)

      return;





    group.current.rotation.y +=

      delta * 0.03;


  });





  return (

    <group ref={group}>


      {

        veins.map((_,index)=>(


          <mesh

            key={index}

            rotation={[

              index * 0.4,

              index * 0.2,

              0,

            ]}

          >


            <torusGeometry

              args={[

                0.75 +

                index *

                0.015,

                0.003,

                8,

                128,

              ]}

            />


            <meshBasicMaterial

              color="#8fffff"

              transparent

              opacity={

                0.08 +

                state.messages.length *

                0.002

              }

            />


          </mesh>


        ))

      }


    </group>

  );

}