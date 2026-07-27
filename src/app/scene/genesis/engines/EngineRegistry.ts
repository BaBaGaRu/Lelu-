/**
 * ==========================================================
 * LÉLUVERSE
 * ENGINE REGISTRY
 *
 * Central manager for all Genesis engines.
 *
 * Responsibilities:
 * - Register engines
 * - Control execution order
 * - Prevent duplicate engines
 * - Safe engine updates
 * - Runtime inspection
 *
 * ==========================================================
 */


import type {
  GenesisState,
} from "../state/GenesisState";





export interface GenesisEngine {


  readonly id?: string;


  readonly priority?: number;


  enabled?: boolean;


  initialize?(): void | Promise<void>;

  handleEvent?(event: string, payload?: unknown): void | Promise<void>;


  update(

    state: GenesisState,

    delta: number,

  ): void;


}





export interface EngineStatus {


  id:string;


  enabled:boolean;


  priority:number;


  error?:string;


}





export default class EngineRegistry {




  private readonly engines =

    new Map<string, GenesisEngine>();







  register(

    engine:GenesisEngine,

  ):void {



    const id =


      engine.id ??

      engine.constructor.name;





    if(

      this.engines.has(id)

    ){

      return;

    }





    this.engines.set(

      id,

      {


        ...engine,


        id,


        priority:

          engine.priority ??

          100,


        enabled:

          engine.enabled ??

          true,


      } as GenesisEngine,


    );



  }







  unregister(

    id:string,

  ):void {


    this.engines.delete(

      id,

    );


  }







  get(

    id:string,

  ):


  GenesisEngine | undefined {


    return this.engines.get(

      id,

    );


  }







  enable(

    id:string,

  ):void {


    const engine =

      this.engines.get(id);





    if(engine){


      engine.enabled = true;


    }


  }







  disable(

    id:string,

  ):void {


    const engine =

      this.engines.get(id);





    if(engine){


      engine.enabled = false;


    }


  }







  async initialize(): Promise<void> {

    for (const engine of this.getAll()) {

      if (engine.enabled === false) {

        continue;

      }

      try {

        await engine.initialize?.();

      }

      catch (error) {

        engine.enabled = false;

        console.error(`Genesis engine initialization failed: ${engine.id}`, error);

      }

    }

  }



  async dispatch(event:string, payload?:unknown): Promise<void> {

    for (const engine of this.getAll()) {

      if (engine.enabled === false) {

        continue;

      }

      try {

        await engine.handleEvent?.(event, payload);

      }

      catch (error) {

        engine.enabled = false;

        console.error(`Genesis engine event failed: ${engine.id}`, error);

      }

    }

  }



  update(

    state:GenesisState,

    delta:number,

  ):void {



    const engines =

      this.getAll();





    for(

      const engine

      of engines

    ){



      if(

        engine.enabled === false

      ){

        continue;

      }





      try {



        engine.update(

          state,

          delta,

        );





      }

      catch(error){



        engine.enabled = false;



        console.error(

          `Genesis engine failed: ${engine.id}`,

          error,

        );


      }


    }


  }







  getAll():GenesisEngine[] {


    return Array.from(

      this.engines.values(),

    )

    .sort(


      (a,b)=>



        (

          a.priority ??

          100

        )

        -

        (

          b.priority ??

          100

        )



    );


  }







  getStatus():EngineStatus[] {



    return this.getAll()

      .map(engine=>({



        id:

          engine.id ??


          engine.constructor.name,



        enabled:

          engine.enabled !== false,



        priority:

          engine.priority ?? 100,



      }));


  }







  clear():void {


    this.engines.clear();


  }



}