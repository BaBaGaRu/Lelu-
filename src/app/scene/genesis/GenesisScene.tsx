/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS SCENE
 *
 * The birthplace of Lélu.
 * Every reality begins here.
 * ==========================================================
 */

import GenesisController from "./GenesisController";

export default function GenesisScene() {

  return (

    <>

      <color
        attach="background"
        args={["#000000"]}
      />

      <GenesisController />

    </>

  );

}