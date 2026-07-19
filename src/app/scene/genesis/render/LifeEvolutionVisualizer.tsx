/**
 * ==========================================================
 * LÉLUVERSE
 * LIFE EVOLUTION VISUALIZER
 *
 * Living biosphere layer.
 *
 * Displays:
 * - organic growth
 * - life energy
 * - evolutionary waves
 * - ecosystem fields
 * - intelligence emergence
 *
 * Visual layer only.
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





export default function LifeEvolutionVisualizer() {


  const {

    state,

  } = useGenesis();





  const life =

    useRef<Group>(null);


  const growth =

    useRef<Group>(null);





  const time =

    useRef(0);





  const organisms = useMemo(

    () =>

      Array.from({

        length:40,

      }),

    [],

  );





  useFrame((_,delta)=>{


    if (

      !life.current ||

      !growth.current

    ) {

      return;

    }





    time.current += delta;





    const reality =

      (state as any);





    const lifeEnergy =

      reality.life

      ??

      0.2;





    const intelligence =

      reality.intelligence

      ??

      0.1;





    /*
     * Biosphere breathing
     */


    life.current.scale.setScalar(

      1 +

      Math.sin(

        time.current *

        0.5

      )

      *

      lifeEnergy *

      0.05

    );





    /*
     * Evolution movement
     */


    growth.current.rotation.y +=

      delta *

      (

        0.1 +

        intelligence *

        0.5

      );


  });





  return (

    <group

      ref={life}

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

          opacity={0.025}

        />


      </mesh>





      {/* ======================================
          ORGANIC EVOLUTION NODES
      ====================================== */}


      <group

        ref={growth}

      >


        {

          organisms.map((_,i)=>(


            <mesh

              key={i}

              position={[

                Math.sin(i)*2,

                Math.cos(i*2)*1.5,

                Math.sin(i*3),

              ]}

            >


              <sphereGeometry

                args={[

                  0.03 +

                  (i%4)*0.01,

                  12,

                  12,

                ]}

              />


              <meshBasicMaterial

                color="#66ff99"

                transparent

                opacity={0.35}

              />


            </mesh>


          ))

        }


      </group>





      <pointLight

        intensity={6}

        distance={40}

        color="#55ff99"

      />


    </group>

  );

}