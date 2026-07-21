/**
 * ==========================================================
 * LÉLUVERSE
 * CORE SYSTEM
 *
 * The living heart of Genesis.
 *
 * Behaviors:
 * - heartbeat
 * - ocean resonance
 * - tectonic breathing
 * - consciousness rotation
 *
 * Geometry preserved.
 * ==========================================================
 */


import {
  useFrame,
} from "@react-three/fiber";


import {
  useRef,
} from "react";


import {
  Group,
} from "three";


import {
  useGenesis,
} from "../GenesisCore";





export default function CoreSystem() {


  const {

    state,

  } = useGenesis();





  const core =

    useRef<Group>(null);





  const time =

    useRef(0);





  useFrame((_, delta) => {


    if (!core.current) {

      return;

    }





    time.current += delta;





    /*
     * Activity resonance
     */


    const activity =

      (

        state.thinking ? 1 : 0

      )

      +

      (

        state.speaking ? 0.7 : 0

      )

      +

      (

        state.listening ? 0.4 : 0

      )

      +

      (

        state.actions.length > 0

          ? 0.5

          : 0

      );





    /*
     * Heartbeat
     *
     * Deep biological pulse.
     */


    const heartbeat =

      Math.sin(

        time.current * 3

      )

      *

      0.035;





    /*
     * Ocean resonance
     *
     * Slow planetary breathing.
     */


    const ocean =

      Math.sin(

        time.current * 0.35

      )

      *

      0.025;





    /*
     * Tectonic rumble
     *
     * Subtle earth-like vibration.
     */


    const quake =

      Math.sin(

        time.current * 12

      )

      *

      0.003

      *

      (

        1 +

        activity

      );





    const scale =

      1

      +

      heartbeat

      +

      ocean

      +

      activity * 0.02;





    core.current.scale.setScalar(

      scale

    );





    core.current.position.x =

      quake;





    core.current.position.y =

      Math.sin(

        time.current * 0.2

      )

      *

      0.015;





    /*
     * Conscious rotation
     */


    core.current.rotation.y +=

      delta *

      (

        state.online

          ?

          0.08 +

            state.messages.length * 0.001

          :

          0.03

      );


  });





  return (

    <group

      ref={core}
      renderOrder={200}

    >


      {/* CORE SHELL */}


      <mesh renderOrder={201}>


        <icosahedronGeometry

          args={[

            0.55,

            64,

          ]}

        />


        <meshPhysicalMaterial

          color="#88ddff"

          emissive="#55ccff"

          emissiveIntensity={4}

          transmission={1}

          thickness={2}

          roughness={0}

          metalness={0.15}

          clearcoat={1}

          clearcoatRoughness={0}

        />


      </mesh>





      {/* INNER CORE */}


      <mesh renderOrder={202}>


        <sphereGeometry

          args={[

            0.18,

            64,

            64,

          ]}

        />


        <meshBasicMaterial

          color="#ffffff"

        />


      </mesh>





      {/* CORE LIGHT */}


      <pointLight

        intensity={35}

        distance={80}

        color="#77ddff"

      />


    </group>

  );

}