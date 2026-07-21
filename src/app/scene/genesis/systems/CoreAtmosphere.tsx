/**
 * ==========================================================
 * LÉLUVERSE
 * CORE ATMOSPHERE SYSTEM
 *
 * Living field around the Genesis heart.
 *
 * Features:
 * - breathing aura
 * - resonance waves
 * - plasma glow
 * - future thermal fusion layer
 * ==========================================================
 */


import {
  useFrame,
} from "@react-three/fiber";


import {
  useRef,
} from "react";


import {
  Mesh,
  Group,
} from "three";


import {
  useGenesis,
} from "../GenesisCore";





export default function CoreAtmosphere() {


  const {

    state,

  } = useGenesis();





  const field =

    useRef<Group>(null);





  const halo =

    useRef<Mesh>(null);





  const wave =

    useRef<Mesh>(null);





  const time =

    useRef(0);





  useFrame((_, delta)=>{


    if (

      !field.current ||

      !halo.current ||

      !wave.current

    ) {

      return;

    }





    time.current += delta;





    const activity =

      (

        state.thinking ? 1 : 0

      )

      +

      (

        state.speaking ? 0.5 : 0

      )

      +

      (

        state.actions.length > 0

          ? 0.5

          : 0

      );





    /*
     * Soft ocean breathing
     */


    const breath =

      1 +

      Math.sin(

        time.current * 0.5

      )

      *

      0.08;





    halo.current.scale.setScalar(

      breath +

      activity * 0.02

    );





    /*
     * Resonance wave
     */


    const pulse =

      1 +

      (

        Math.sin(

          time.current * 2

        )

        *

        0.15

      );





    wave.current.scale.setScalar(

      pulse

    );





    /*
     * Slow planetary drift
     */


    field.current.rotation.y +=

      delta *

      0.08;


  });





  return (

    <group

      ref={field}
      renderOrder={180}

    >


      {/* INNER AURA */}


      <mesh

        ref={halo}
        renderOrder={181}

      >

        <sphereGeometry

          args={[

            0.7,

            64,

            64,

          ]}

        />


        <meshBasicMaterial

          color="#55ddff"

          transparent

          opacity={0.05}

        />


      </mesh>





      {/* OUTER RESONANCE WAVE */}


      <mesh

        ref={wave}
        renderOrder={182}

      >

        <sphereGeometry

          args={[

            1.15,

            64,

            64,

          ]}

        />


        <meshBasicMaterial

          color="#7c3cff"

          transparent

          opacity={0.02}

        />


      </mesh>





      {/* FIELD LIGHT */}


      <pointLight

        intensity={8}

        distance={20}

        color="#66ddff"

      />


    </group>

  );

}