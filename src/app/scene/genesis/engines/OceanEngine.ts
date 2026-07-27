/**
 * ==========================================================
 * LÉLUVERSE
 * OCEAN ENGINE
 *
 * Planetary ocean evolution system.
 *
 * Controls:
 * - tides
 * - currents
 * - waves
 * - storms
 * - ocean stability
 * - life interaction
 * ==========================================================
 */

import type {
  GenesisState,
} from "../state/GenesisState";


export default class OceanEngine {


  private time = 0;



  update(

    state: GenesisState,

    delta:number,

  ):void {


    if(state.paused)

      return;



    this.time += delta;



    const ocean =
      state.ocean;



    /*
     * Ocean awakens with life
     */

    const lifeForce =

      state.life;



    /*
     * Tidal rhythm
     */

    ocean.tide =

      0.5 +

      Math.sin(

        this.time *

        0.05

      ) *

      0.5;



    /*
     * Currents
     */

    ocean.current =

      0.4 +

      Math.sin(

        this.time *

        0.12

      ) *

      0.2;



    /*
     * Wave activity
     */

    ocean.wave =

      Math.abs(

        Math.sin(

          this.time *

          0.4

        )

      ) *

      lifeForce;



    /*
     * Storm energy
     */

    ocean.stormSurge =

      Math.min(

        1,

        ocean.wave *

        0.5 +

        state.chaos *

        0.2,

      );



    /*
     * Tsunami events
     */

    ocean.tsunami =

      Math.max(

        0,

        Math.sin(

          this.time *

          0.01

        ) *

        state.chaos *

        0.1,

      );



    /*
     * Stability
     */

    ocean.stability =

      Math.max(

        0,

        1 -

        (

          ocean.tsunami *

          0.5

        ),

      );



    /*
     * Ocean supports life
     */

    if(

      lifeForce >

      0.2

    ){

      state.life = Math.min(

        1,

        state.life +

        ocean.stability *

        delta *

        0.002,

      );

    }



  }


}