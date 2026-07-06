/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS CONTROLLER
 * ==========================================================
 */

import GenesisCore from "./GenesisCore";
import GenesisTime from "./GenesisTime";
import GenesisInterface from "./GenesisInterface";
import GenesisPlayground from "./GenesisPlayground";

export default function GenesisController() {

  return (

    <>

      <GenesisTime />

      <GenesisCore />

      <GenesisInterface />

      <GenesisPlayground />

    </>

  );

}