/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS CORE
 *
 * Living interface state.
 *
 * Controls:
 * - chat
 * - panels
 * - cognition state
 * - workspaces
 * - live actions
 * - browser/task visualization
 * - ecosystem state
 * ==========================================================
 */


import {

  createContext,

  useContext,

  useMemo,

  useState,

  type ReactNode,

} from "react";


import type {

  GenesisAction,

  GenesisActionStatus,

} from "./GenesisActions";





export type GenesisMode =

  | "chat"

  | "engineering"

  | "creative"

  | "research";





export type GenesisPanel =

  | "none"

  | "chat"

  | "history"

  | "logs"

  | "workspaces"

  | "agents";





export interface GenesisMessage {

  id:string;

  role:

    | "user"

    | "assistant";

  text:string;

  timestamp:number;

  source:

    | "ai"

    | "local";

  provider?:string;

  confidence?:number;

}





export interface GenesisNotification {

  id:string;

  title:string;

  description?:string;

  created:number;

}





export interface GenesisCognitionState {

  agents:unknown[];

  workspaces:unknown[];

  nodes:unknown[];

}





/*
 * ECOSYSTEM STATE
 */


export interface GenesisEcosystemState {

  biodiversity:number;

  vegetation:number;

  biomass:number;

  stability:number;

  adaptation:number;

  extinction:number;

}





export interface GenesisState {


  initialized:boolean;


  thinking:boolean;


  speaking:boolean;


  listening:boolean;


  online:boolean;


  mode:GenesisMode;


  messages:GenesisMessage[];


  notifications:GenesisNotification[];


  activePanel:GenesisPanel;


  minimized:boolean;


  activeWorkspace:string | null;


  cognition:GenesisCognitionState | null;


  actions:GenesisAction[];


  ecosystem:GenesisEcosystemState;


}





export interface GenesisContextValue {


  state:GenesisState;



  setMode(

    mode:GenesisMode,

  ):void;



  addMessage(

    message:GenesisMessage,

  ):void;



  clearConversation():void;



  setThinking(

    value:boolean,

  ):void;



  setSpeaking(

    value:boolean,

  ):void;



  setListening(

    value:boolean,

  ):void;



  openPanel(

    panel:GenesisPanel,

  ):void;



  minimize():void;



  expand():void;



  focusWorkspace(

    id:string,

  ):void;



  updateCognition(

    cognition:GenesisCognitionState,

  ):void;



  updateEcosystem(

    ecosystem:GenesisEcosystemState,

  ):void;



  addAction(

    action:GenesisAction,

  ):void;



  updateAction(

    id:string,

    status:GenesisActionStatus,

  ):void;



  notify(

    title:string,

    description?:string,

  ):void;


}





const GenesisContext =

  createContext<GenesisContextValue | null>(

    null,

  );





export function useGenesis(){


  const context =

    useContext(

      GenesisContext,

    );


  if(!context){

    throw new Error(

      "useGenesis must be used inside GenesisCore.",

    );

  }


  return context;

}





interface GenesisCoreProps {

  children?:ReactNode;

}





export default function GenesisCore({

  children,

}:GenesisCoreProps){


  const [state,setState] =

    useState<GenesisState>({


      initialized:true,


      thinking:false,


      speaking:false,


      listening:false,


      online:true,


      mode:"chat",


      messages:[],


      notifications:[],


      activePanel:"none",


      minimized:false,


      activeWorkspace:null,


      cognition:null,


      actions:[],


      ecosystem:{


        biodiversity:0.1,


        vegetation:0.1,


        biomass:0.1,


        stability:0.8,


        adaptation:0,


        extinction:0,


      },


    });





  const value =

    useMemo<GenesisContextValue>(

      () => ({


        state,



        setMode(mode){


          setState(current=>({

            ...current,

            mode,

          }));

        },



        addMessage(message){


          setState(current=>({

            ...current,

            messages:[

              ...current.messages,

              message,

            ],

          }));

        },



        clearConversation(){


          setState(current=>({

            ...current,

            messages:[],

          }));

        },



        setThinking(value){


          setState(current=>({

            ...current,

            thinking:value,

          }));

        },



        setSpeaking(value){


          setState(current=>({

            ...current,

            speaking:value,

          }));

        },



        setListening(value){


          setState(current=>({

            ...current,

            listening:value,

          }));

        },



        openPanel(panel){


          setState(current=>({

            ...current,

            activePanel:panel,

            minimized:false,

          }));

        },



        minimize(){


          setState(current=>({

            ...current,

            minimized:true,

          }));

        },



        expand(){


          setState(current=>({

            ...current,

            minimized:false,

          }));

        },



        focusWorkspace(id){


          setState(current=>({

            ...current,

            activeWorkspace:id,

          }));

        },



        updateCognition(cognition){


          setState(current=>({

            ...current,

            cognition,

          }));

        },



        updateEcosystem(ecosystem){


          setState(current=>({

            ...current,

            ecosystem,

          }));

        },



        addAction(action){


          setState(current=>({

            ...current,

            actions:[

              ...current.actions,

              action,

            ],

          }));

        },



        updateAction(id,status){


          setState(current=>({

            ...current,

            actions:

              current.actions.map(

                action =>

                  action.id === id

                    ? {

                        ...action,

                        status,

                      }

                    :

                      action,

              ),

          }));

        },



        notify(title,description){


          setState(current=>({


            ...current,


            notifications:[


              ...current.notifications,


              {


                id:crypto.randomUUID(),


                title,


                description,


                created:Date.now(),


              },


            ],


          }));

        },


      }),


      [

        state,

      ],

    );





  return (

    <GenesisContext.Provider

      value={value}

    >

      {children}

    </GenesisContext.Provider>

  );

}