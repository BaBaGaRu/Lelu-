/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS SCENE
 *
 * The birthplace of Lélu.
 * Every reality begins here.
 * ==========================================================
 */

import { Canvas } from "@react-three/fiber";

import GenesisController
  from "./GenesisController";

export default function GenesisScene() {

  return (

    <Canvas

      camera={{

        position: [0, 0, 8],

        fov: 55,

      }}

      shadows

    >

      <color
        attach="background"
        args={["#000000"]}
      />

      <ambientLight
        intensity={0.2}
      />

      <GenesisController />

    </Canvas>

  );

}