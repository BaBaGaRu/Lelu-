/**
 * ==========================================================
 * LÉLUVERSE
 * LIFE EVOLUTION VISUALIZER
 *
 * Living biosphere layer.
 *
 * Connected to Genesis universe state.
 *
 * Uses:
 * - life
 * - energy
 * - awareness
 * - intelligence
 * - evolutionSystem
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





export default function LifeEvolutionVisualizer(){


  const {
    universe,
  } = useGenesis();





  const lifeGroup =

    useRef<Group>(null);



  const growthGroup =

    useRef<Group>(null);



  const time =

    useRef(0);





  const organisms =

    useMemo(

      () =>

        Array.from({

          length:40,

        }),

      [],

    );







  useFrame((_, delta)=>{


    if(

      !lifeGroup.current ||

      !growthGroup.current

    ){

      return;

    }





    time.current += delta;





    const lifeAmount =

      universe.life ?? 0;



    const energyAmount =

      universe.energy ?? 0;



    const intelligenceAmount =

      universe.intelligence ?? 0;



    const awarenessAmount =

      universe.awareness ?? 0;



    const growthAmount =

      universe.evolutionSystem?.growth ?? 0;



    const mutationAmount =

      universe.evolutionSystem?.mutation ?? 0;



    const adaptationAmount =

      universe.evolutionSystem?.adaptation ?? 0;







    /*
     * Biosphere breathing
     */


    lifeGroup.current.scale.setScalar(


      1 +

      Math.sin(

        time.current *

        0.5

      )

      *

      lifeAmount *

      0.05

      +

      energyAmount *

      0.01

      +

      awarenessAmount *

      0.005


    );







    /*
     * Evolution movement
     */


    growthGroup.current.rotation.y +=


      delta *

      (

        0.1 +

        intelligenceAmount *

        0.5 +

        growthAmount *

        0.3 +

        mutationAmount *

        0.2

      );





    growthGroup.current.rotation.x =


      Math.sin(

        time.current *

        0.2

      )

      *

      (

        growthAmount +

        adaptationAmount

      )

      *

      0.1;



  });







  return (



    <group

      ref={lifeGroup}

      name="LifeEvolution"

    >





      {/* ======================================
          BIOSPHERE FIELD
      ====================================== */}



      <mesh>


        <sphereGeometry

          args={[

            2.6,

            48,

            48,

          ]}

        />


        <meshBasicMaterial

          color="#44ff88"

          transparent

          opacity={

            0.015 +

            energyAmountSafe(

              universe.energy

            ) *

            0.03

          }

          depthWrite={false}

        />


      </mesh>







      {/* ======================================
          ORGANIC EVOLUTION NODES
      ====================================== */}



      <group

        ref={growthGroup}

        name="EvolutionNodes"

      >



        {

          organisms.map((_, i)=>(


            <mesh

              key={i}

              position={[


                Math.sin(i) *

                2,


                Math.cos(i * 2) *

                1.5,


                Math.sin(i * 3),


              ]}

            >



              <sphereGeometry

                args={[


                  0.03 +

                  (i % 4) *

                  0.01,


                  12,


                  12,


                ]}

              />



              <meshBasicMaterial

                color="#66ff99"

                transparent

                opacity={

                  0.2 +

                  awarenessAmountSafe(

                    universe.awareness

                  ) *

                  0.5

                }

                depthWrite={false}

              />



            </mesh>


          ))

        }



      </group>







      <pointLight

        intensity={

          2 +

          energyAmountSafe(

            universe.energy

          ) *

          4 +

          awarenessAmountSafe(

            universe.awareness

          ) *

          2

        }

        distance={40}

        color="#55ff99"

      />





    </group>


  );

}






function energyAmountSafe(

  value:number | undefined,

){

  return value ?? 0;

}



function awarenessAmountSafe(

  value:number | undefined,

){

  return value ?? 0;

}