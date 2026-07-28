/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS RENDERER
 *
 * Master visual compositor.
 *
 * Structure:
 *
 * Universe
 *  ├── Stars
 *  ├── Cosmos
 *
 * Genesis Core
 *  ├── CoreLayer
 *  │     ├── GenesisCore
 *  │     └── Mutation
 *  │
 *  ├── Atmosphere
 *  ├── Ocean
 *  ├── Life
 *  └── Memory
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
  Group,
} from "three";



import Cosmos
  from "../environment/Cosmos";


import StarField
  from "../environment/stars/StarField";



import CoreLayer
  from "./CoreLayer";


import Ocean
  from "./ocean/Ocean";

import CrystalShell
  from "../materials/CrystalShell";

import ElectricShell
  from "../materials/ElectricShell";

import HaloShell
  from "../materials/HaloShell";

import LifeEvolutionVisualizer
  from "./LifeEvolutionVisualizer";


import CoreMemoryVeins
  from "./CoreMemoryVeins";


import CoreMutationVisualizer
  from "./CoreMutationVisualizer";


import CoreAtmosphere
  from "../systems/CoreAtmosphere";


import GenesisCore
  from "../materials/GenesisCore";

import { useGenesis } from "../GenesisCore";





export default function GenesisRenderer(){


  const root =

    useRef<Group>(null);

    const {

  engineRuntime,

  updateUniverse,

} = useGenesis();

const weights =
  engineRuntime
    ?.getEngineBus()
    .getWeights() ?? {
      plasma: 1,
      ocean: 0,
      crystal: 1,
      electric: 1,
      halo: 1,
    };



  useFrame((_, delta) => {

  if (root.current) {
    root.current.rotation.y += delta * 0.002;
  }

  if (!engineRuntime) {
    return;
  }

  updateUniverse((state) => {
    engineRuntime.update(state, delta);
  });

});







  return (

    <group

      ref={root}

      name="GenesisWorld"

    >





      {/* ==========================================
          OUTER COSMOS
      ========================================== */}



      <group

        name="Universe"

      >

        <StarField />

        <Cosmos />

      </group>







      {/* ==========================================
          LIVING GENESIS CORE
      ========================================== */}



      <group

        name="BlueGenesisCore"

      >





        {/* CORE BODY */}


        <CoreLayer>


          <GenesisCore />

          <CrystalShell
  activity={weights.crystal}
/>

<ElectricShell
  activity={weights.electric}
/>

<HaloShell
  activity={weights.halo}
/>

          <CoreMutationVisualizer />


        </CoreLayer>

      
        <Ocean />




        {/* OUTER SHELLS */}


        <CoreAtmosphere />

        

        <LifeEvolutionVisualizer />



        <CoreMemoryVeins />





      </group>





    </group>

  );

}