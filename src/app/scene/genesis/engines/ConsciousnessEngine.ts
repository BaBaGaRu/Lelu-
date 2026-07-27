/**
 * ==========================================================
 * LÉLUVERSE
 * CONSCIOUSNESS ENGINE
 *
 * Living cognition layer.
 *
 * Converts life and experience into awareness.
 * ==========================================================
 */

import type {
  GenesisState,
} from "../state/GenesisState";


export default class ConsciousnessEngine {


  update(

    state: GenesisState,

    delta:number,

  ):void {


    if(state.paused)

      return;



    if(state.life <= 0)

      return;



    /*
     * Awareness emerges from life
     */

    const awarenessGrowth =

      state.life *

      state.memory.importance;



    state.awareness = Math.min(

      1,

      state.awareness +

      awarenessGrowth *

      delta *

      0.01,

    );



    /*
     * Intelligence emerges from awareness
     */

    state.intelligence = Math.min(

      1,

      state.intelligence +

      state.awareness *

      delta *

      0.008,

    );



    /*
     * Curiosity drives exploration
     */

    state.curiosity = Math.min(

      1,

      state.curiosity +

      (

        state.intelligence +

        state.awareness

      ) *

      delta *

      0.004,

    );



    /*
     * Learning synchronization
     */

    state.learning = Math.min(

      1,

      state.learning +

      state.curiosity *

      delta *

      0.006,

    );



    /*
     * Consciousness field
     */

    state.consciousness = Math.min(

      1,

      (

        state.awareness +

        state.intelligence +

        state.learning

      ) / 3,

    );



    /*
     * Teaching ability
     */

    state.teaching =

      state.intelligence;



  }


}