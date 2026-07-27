/**
 * ==========================================================
 * LÉLUVERSE
 * CORE MUTATION VISUALIZER
 *
 * Visible plasma mutation field.
 *
 * Surrounds the Genesis Core.
 * Does not create a second core.
 *
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
} from "three";



import {
  useGenesis,
} from "../GenesisCore";





export default function CoreMutationVisualizer(){


  const {

    universe,

  } = useGenesis();





  const field =

    useRef<Mesh>(null);





  const time =

    useRef(0);







  useFrame((_,delta)=>{


    if(!field.current)

      return;



    time.current += delta;



    const mutation =

      universe.evolutionSystem?.mutation ?? 0;



    const awareness =

      universe.awareness ?? 0;



    const activity =

      Math.max(

        mutation,

        awareness,

        0.15

      );





    field.current.rotation.y +=

      delta *

      (

        0.2 +

        activity *

        0.5

      );





    const pulse =

      1 +

      Math.sin(

        time.current * 2

      )

      *

      (

        0.03 +

        activity * 0.08

      );





    field.current.scale.setScalar(

      pulse

    );



  });







  return (

    <mesh

      ref={field}

      name="MutationPlasma"

      renderOrder={220}

    >



      <sphereGeometry

        args={[

          0.95,

          128,

          128,

        ]}

      />



      <shaderMaterial

        transparent

        depthWrite={false}

        uniforms={{

          uTime:{

            value:0,

          },

        }}



        vertexShader={`

          varying vec3 vPosition;

          uniform float uTime;


          void main(){

            vPosition = position;


            vec3 p = position;


            float wave =

              sin(

                position.y * 10.0 +

                uTime * 3.0

              ) * 0.04;


            p += normal * wave;


            gl_Position =

              projectionMatrix *

              modelViewMatrix *

              vec4(

                p,

                1.0

              );

          }

        `}



        fragmentShader={`

          uniform float uTime;

          varying vec3 vPosition;


          void main(){


            float plasma =

              sin(

                vPosition.x * 12.0 +

                uTime * 4.0

              ) * 0.5 + 0.5;


            vec3 color =

              mix(

                vec3(0.1,0.8,1.0),

                vec3(0.8,0.2,1.0),

                plasma

              );


            gl_FragColor =

              vec4(

                color,

                0.18

              );


          }

        `}

      />


    </mesh>

  );

}