/**
 * ==========================================================
 * LÉLUVERSE
 * ENGINE RUNTIME
 *
 * Living engine execution bridge.
 *
 * Connects:
 * - EngineRegistry
 * - EngineBootstrap
 * - GenesisState
 *
 * ==========================================================
 */


import EngineRegistry
  from "./EngineRegistry";


import EngineBootstrap
  from "./EngineBootstrap";


import type {
  GenesisState,
} from "../state/GenesisState";





export default class EngineRuntime {



  private readonly registry:

    EngineRegistry;





  constructor(){


    this.registry =

      new EngineRegistry();



    EngineBootstrap.register(

      this.registry,

    );


  }







  update(

    state:GenesisState,

    delta:number,

  ):void {


    this.registry.update(

      state,

      delta,

    );


  }







  getRegistry(){

    return this.registry;

  }

}