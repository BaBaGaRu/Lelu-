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







export default function GenesisRenderer(){


  const root =

    useRef<Group>(null);







  useFrame((_,delta)=>{


    if(!root.current)

      return;



    root.current.rotation.y +=

      delta *

      0.002;


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


          <CoreMutationVisualizer />


        </CoreLayer>







        {/* OUTER SHELLS */}


        <CoreAtmosphere />



        <Ocean />



        <LifeEvolutionVisualizer />



        <CoreMemoryVeins />





      </group>





    </group>

  );

}