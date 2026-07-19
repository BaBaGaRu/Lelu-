/**
 * ==========================================================
 * LÉLUVERSE
 * CORE MUTATION VISUALIZER
 *
 * Makes evolution visible.
 * ==========================================================
 */


import {
  useFrame,
} from "@react-three/fiber";


import {
  useRef,
} from "react";


import {
  Color,
  Mesh,
} from "three";


export default function CoreMutationVisualizer() {


  const outer =

    useRef<Mesh>(null);


  const inner =

    useRef<Mesh>(null);


  const color =

    useRef(

      new Color("#88ddff")

    );


  const time =

    useRef(0);





  useFrame((_, delta)=>{


    if (

      !outer.current ||

      !inner.current

    ) return;





    time.current += delta;





    const pulse =

      1 +

      Math.sin(

        time.current *

        1.2

      )

      *

      0.08;





    outer.current.scale.setScalar(

      pulse

    );





    inner.current.rotation.y +=

      delta *

      0.5;





    const hue =

      (

        time.current *

        0.03

      )

      %

      1;





    color.current.setHSL(

      hue,

      0.8,

      0.6

    );





    const material =

      outer.current.material as any;


    material.color.copy(

      color.current

    );


  });





  return (

    <group>


      <mesh

        ref={outer}

      >

        <sphereGeometry

          args={[

            1.05,

            64,

            64,

          ]}

        />


        <meshBasicMaterial

          transparent

          opacity={0.05}

        />


      </mesh>





      <mesh

        ref={inner}

      >

        <torusGeometry

          args={[

            0.9,

            0.015,

            32,

            256,

          ]}

        />


        <meshBasicMaterial

          color="#ffffff"

          transparent

          opacity={0.2}

        />


      </mesh>


    </group>

  );

}