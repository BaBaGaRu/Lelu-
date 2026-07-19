/**
 * ==========================================================
 * LÉLUVERSE
 * OCEAN VISUALIZER
 *
 * Visible planetary water layer.
 *
 * Displays:
 * - ocean waves
 * - tidal rings
 * - current movement
 * - tsunami pulses
 *
 * Reads OceanSystem state.
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





export default function OceanVisualizer() {


  const {

    state,

  } = useGenesis();





  const ocean =

    useRef<Group>(null);


  const waves =

    useRef<Group>(null);





  const time =

    useRef(0);





  const rings = useMemo(

    () =>

      Array.from({

        length:12,

      }),

    [],

  );





  useFrame((_,delta)=>{


    if (

      !ocean.current ||

      !waves.current

    ) {

      return;

    }





    time.current += delta;





    const water =

      (state as any)

        .ocean

        ??

        {};





    const tide =

      water.tide

      ??

      0.5;





    const tsunami =

      water.tsunami

      ??

      0;





    const current =

      water.current

      ??

      0.5;





    /*
     * Ocean breathing
     */


    ocean.current.scale.y =

      1 +

      Math.sin(

        time.current *

        0.8

      )

      *

      0.03 *

      tide;





    /*
     * Current flow
     */


    waves.current.rotation.y +=

      delta *

      current;





    /*
     * Tsunami expansion
     */


    waves.current.scale.setScalar(

      1 +

      tsunami *

      2

    );


  });





  return (

    <group

      ref={ocean}

    >


      {/* ======================================
          WATER FIELD
      ====================================== */}


      <mesh>


        <sphereGeometry

          args={[

            2.2,

            64,

            64,

          ]}

        />


        <meshBasicMaterial

          color="#0066ff"

          transparent

          opacity={0.04}

        />


      </mesh>





      {/* ======================================
          WAVE RINGS
      ====================================== */}


      <group

        ref={waves}

      >


        {

          rings.map((_,i)=>(


            <mesh

              key={i}

              rotation={[

                Math.PI / 2,

                0,

                0,

              ]}

            >


              <torusGeometry

                args={[

                  2.5 +

                  i *

                  0.18,

                  0.01,

                  32,

                  128,

                ]}

              />


              <meshBasicMaterial

                color="#33ccff"

                transparent

                opacity={0.12}

              />


            </mesh>


          ))

        }


      </group>





      <pointLight

        intensity={4}

        distance={35}

        color="#33aaff"

      />


    </group>

  );

}