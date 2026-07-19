/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS BRIDGE
 *
 * Connects:
 *
 * AIService
 *      ↓
 * Actions + Cognition
 *      ↓
 * GenesisCore
 *      ↓
 * Genesis World
 *
 * ==========================================================
 */


import {
  useEffect,
} from "react";


import {
  useGenesis,
} from "./GenesisCore";


import AIService, {

  type AIActionEvent,

  type CognitionEvent,

} from "../../../core/AIService";





export default function GenesisBridge() {


  const {

    addAction,

    updateCognition,

  } = useGenesis();





  useEffect(() => {


    const ai =

      new AIService();





    const removeActions =

      ai.subscribeActions(

        (

          event:

            AIActionEvent,

        ) => {


          addAction({

            id:

              event.id,


            type:

              event.type,


            label:

              event.label,


            source:

              "ai",


            status:

              event.status === "error"

                ? "failed"

                : event.status,


            progress:

              event.status === "complete"

                ? 100

                : 0,


            timestamp:

              event.timestamp,

          });


        },

      );





    const removeCognition =

      ai.subscribeCognition(

        (

          state:

            CognitionEvent,

        ) => {


          updateCognition({

            agents:

              state.agents,


            workspaces:

              state.workspaces,


            nodes:

              state.nodes,

          });


        },

      );





    return () => {


      removeActions();


      removeCognition();


    };


  }, [

    addAction,

    updateCognition,

  ]);





  return null;

}