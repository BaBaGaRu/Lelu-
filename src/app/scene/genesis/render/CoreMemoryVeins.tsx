/**
 * ==========================================================
 * LÉLUVERSE
 * CORE MEMORY VEINS
 *
 * Living memory structures around the Blue Genesis Core.
 *
 * Connected to:
 * - Genesis universe memory
 * - learning
 * - awareness
 * - consciousness
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





export default function CoreMemoryVeins(){



  const {

    universe,

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


    if(!group.current)

      return;





    const memoryEnergy =


      (

        universe.memory.shortTerm +

        universe.memory.longTerm +

        universe.memory.archived

      )

      *

      0.33;





    group.current.rotation.y +=


      delta *

      (

        0.03 +

        memoryEnergy *

        0.08

      );



    group.current.scale.setScalar(


      1 +

      memoryEnergy *

      0.1


    );



  });







  const opacity =


    0.08 +

    universe.memory.importance *

    0.4;







  return (



    <group

      ref={group}

      name="CoreMemoryVeins"

    >



      {

        veins.map((_,index)=>(



          <mesh

            key={index}

            rotation={[


              index *

              0.4,


              index *

              0.2,


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

              opacity={opacity}

              depthWrite={false}

            />



          </mesh>



        ))

      }



    </group>


  );

}