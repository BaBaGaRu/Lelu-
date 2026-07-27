/**
 * ==========================================================
 * LÉLUVERSE
 * CORE ATMOSPHERE SYSTEM
 *
 * Living shell around Genesis Core.
 *
 * Visual layer only.
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
  Mesh,
} from "three";





export default function CoreAtmosphere(){


  const field =
    useRef<Group>(null);


  const aura =
    useRef<Mesh>(null);


  const aurora =
    useRef<Mesh>(null);


  const resonance =
    useRef<Mesh>(null);


  const time =
    useRef(0);





  useFrame((_,delta)=>{


    if(
      !field.current ||
      !aura.current ||
      !aurora.current ||
      !resonance.current
    ){

      return;

    }





    time.current += delta;





    field.current.rotation.y +=

      delta *

      0.04;





    const pulse =

      1 +

      Math.sin(

        time.current *

        0.7

      )

      *

      0.04;





    aura.current.scale.setScalar(

      pulse

    );





    aurora.current.scale.setScalar(

      1.05 +

      Math.sin(

        time.current *

        0.4

      )

      *

      0.03

    );





    resonance.current.scale.setScalar(

      1.12 +

      Math.sin(

        time.current *

        1.6

      )

      *

      0.05

    );


  });







  return (

    <group

      ref={field}

      name="CoreAtmosphere"

    >



      <mesh

        ref={aura}

        renderOrder={100}

      >

        <sphereGeometry

          args={[

            0.72,

            64,

            64,

          ]}

        />

        <meshBasicMaterial

          color="#55ddff"

          transparent

          opacity={0.035}

          depthWrite={false}

        />

      </mesh>





      <mesh

        ref={aurora}

        renderOrder={101}

      >

        <sphereGeometry

          args={[

            0.9,

            64,

            64,

          ]}

        />

        <meshBasicMaterial

          color="#8fffff"

          transparent

          opacity={0.025}

          depthWrite={false}

        />

      </mesh>





      <mesh

        ref={resonance}

        renderOrder={102}

      >

        <sphereGeometry

          args={[

            1.1,

            64,

            64,

          ]}

        />

        <meshBasicMaterial

          color="#dfffff"

          transparent

          opacity={0.012}

          depthWrite={false}

        />

      </mesh>





      <pointLight

        intensity={2}

        distance={8}

        color="#7eeeff"

      />



    </group>

  );

}