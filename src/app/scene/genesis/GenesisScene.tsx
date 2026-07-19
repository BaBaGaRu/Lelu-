/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS SCENE
 *
 * The birthplace of Lélu.
 *
 * Includes:
 * - Three canvas
 * - Genesis controller
 * - Crash protection
 * ==========================================================
 */


import {
  Canvas,
} from "@react-three/fiber";


import GenesisController
  from "./GenesisController";


import GenesisErrorBoundary
  from "./GenesisErrorBoundary";





export default function GenesisScene() {


  return (

    <Canvas

      style={{

        width:"100vw",

        height:"100vh",

        position:"fixed",

        top:0,

        left:0,

      }}


      camera={{

        position:[

          0,

          0,

          8,

        ],

        fov:55,

      }}


      shadows


      gl={{

        antialias:true,

      }}

    >


      <color

        attach="background"

        args={[

          "#000000",

        ]}

      />





      <ambientLight

        intensity={0.2}

      />





      <GenesisErrorBoundary>


        <GenesisController />


      </GenesisErrorBoundary>


    </Canvas>

  );

}