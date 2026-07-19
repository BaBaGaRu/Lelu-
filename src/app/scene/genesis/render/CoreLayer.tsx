/**
 * ==========================================================
 * LÉLUVERSE
 * CORE LAYER
 *
 * Living Genesis core visual layer.
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





export default function CoreLayer(){


  const {

    state,

  } = useGenesis();





  const root =

    useRef<Group>(null);





  useFrame((_, delta)=>{


    if(

      !root.current

    ){

      return;

    }





    const genesis =

      state as any;





    const energy =

      genesis.energy ??

      0.5;





    const age =

      genesis.age ??

      0;





    const pulse =

      1 +

      Math.sin(

        Date.now() *

        0.002

      )

      *

      0.04 +

      energy *

      0.05;





    root.current.scale.setScalar(

      pulse

    );





    root.current.rotation.y +=

      delta *

      (

        0.05 +

        age *

        0.0001

      );


  });





  return (

    <group

      ref={root}

    >


      <mesh>


        <icosahedronGeometry

          args={[

            0.8,

            64,

          ]}

        />


        <meshPhysicalMaterial

          color="#66ddff"

          emissive="#44ccff"

          emissiveIntensity={3}

          transmission={1}

          thickness={2}

          roughness={0}

          metalness={0.2}

          clearcoat={1}

        />


      </mesh>





      <mesh>


        <sphereGeometry

          args={[

            0.25,

            48,

            48,

          ]}

        />


        <meshBasicMaterial

          color="#ffffff"

        />


      </mesh>





      <pointLight

        intensity={20}

        distance={60}

        color="#66ddff"

      />


    </group>

  );

}