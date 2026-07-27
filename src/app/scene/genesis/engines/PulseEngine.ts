/**
 * ==========================================================
 * LÉLUVERSE
 * PULSE ENGINE
 *
 * Living heartbeat controller.
 *
 * Generates rhythmic energy pulses for
 * the Genesis core visuals.
 * ==========================================================
 */

import type {
  GenesisState,
} from "../state/GenesisState";


export default class PulseEngine {


  private time = 0;



  update(

    state: GenesisState,

    delta:number,

  ):void {


    if(state.paused)

      return;



    this.time += delta;



    /*
     * Core heartbeat
     */

    const pulse =

      (

        Math.sin(

          this.time *

          2.5

        ) + 1

      ) *

      0.5;



    /*
     * Feed visual energy
     */

    state.energy = Math.min(

      1,

      state.energy +

      pulse *

      delta *

      0.001,

    );



    /*
     * Consciousness pulse
     */

    state.consciousness =

      Math.min(

        1,

        (

          state.awareness +

          pulse

        ) /

        2,

      );



    /*
     * Core evolution response
     */

    state.evolutionSystem.mutation =

      Math.min(

        1,

        state.evolutionSystem.mutation +

        pulse *

        delta *

        0.003,

      );


  }


}