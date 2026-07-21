/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS RENDERER
 *
 * Full living universe stack
 * ==========================================================
 */

import Cosmos from "../environment/Cosmos";

import CoreSystem from "../systems/CoreSystem";
import CoreAtmosphere from "../systems/CoreAtmosphere";
import CoreMemoryVeins from "./CoreMemoryVeins";

import Ocean from "./ocean/Ocean";

export default function GenesisRenderer() {

  return (

    <>

      <Cosmos />
      <Ocean />

      <CoreSystem />
      <CoreAtmosphere />
      <CoreMemoryVeins />

    </>

  );

}