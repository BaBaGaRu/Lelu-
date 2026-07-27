/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS TIME
 *
 * Master simulation heartbeat.
 *
 * Runs:
 * - engine runtime
 * - universe updates
 * - cosmic clock
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
  useGenesis,
} from "./GenesisCore";


import EngineRuntime
  from "./engines/EngineRuntime";





const runtime =

  new EngineRuntime();







export default function GenesisTime(){



  const elapsed =

    useRef(0);





  const {

    updateUniverse,

  } = useGenesis();







  useFrame((_,delta)=>{


    elapsed.current += delta;





    updateUniverse(

      (state)=>{


        runtime.update(

          state,

          delta,

        );



      },

    );



  });







  return null;


}