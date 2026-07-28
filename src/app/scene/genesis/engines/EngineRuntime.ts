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

import EngineBus
  from "./EngineBus";



export default class EngineRuntime {



  private readonly registry:

    EngineRegistry;

private readonly engineBus:

  EngineBus;



  constructor(){


    this.registry =

      new EngineRegistry();

this.engineBus =

  new EngineBus(

    this.registry,

  );

    EngineBootstrap.register(

      this.registry,

    );


  }







  async initialize(): Promise<void> {

    await this.registry.initialize();

  }



  async dispatch(event:string, payload?:unknown): Promise<void> {

    await this.registry.dispatch(event, payload);

  }




update(
  state: GenesisState,
  delta: number,
): void {

  this.registry.update(
    state,
    delta,
  );

  this.engineBus.update(
    state,
    delta,
  );

}

getEngineBus(): EngineBus {

  return this.engineBus;

}







  







  getRegistry(){

    return this.registry;

  }

}