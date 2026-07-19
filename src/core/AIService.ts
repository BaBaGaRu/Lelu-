/**
 * ==========================================================
 * LÉLU
 * AI SERVICE
 *
 * Final cognition learning loop
 *
 * Connects:
 * - AI Runtime
 * - Memory
 * - User profile
 * - Genesis actions
 * - Cognition updates
 * ==========================================================
 */


import AIRuntime
  from "./AIRuntime";


import MemoryBridge
  from "./MemoryBridge";


import UserManager
  from "./user/UserManager";


import type {
  AIRequest,
  AIResponse,
} from "../providers/AIProvider";





export interface AIActionEvent {


  id:
    string;


  type:

    | "browse"

    | "search"

    | "build"

    | "learn"

    | "create";


  label:
    string;


  status:

    | "running"

    | "complete"

    | "error";


  timestamp:
    number;

}





export interface CognitionEvent {


  agents:
    unknown[];


  workspaces:
    unknown[];


  nodes:
    unknown[];

}





export default class AIService {


  private readonly runtime:
    AIRuntime;


  private readonly user:
    UserManager;


  private readonly memory:
    MemoryBridge;


  private readonly actionListeners:

    Set<(event:AIActionEvent)=>void> =

      new Set();


  private readonly cognitionListeners:

    Set<(state:CognitionEvent)=>void> =

      new Set();





  constructor() {


    this.runtime =

      new AIRuntime();



    this.user =

      new UserManager();



    this.memory =

      new MemoryBridge(

        this.runtime.brain,

        this.user,

      );

  }





  public subscribeActions(

    listener:

      (event:AIActionEvent)=>void,

  ):
    ()=>void {


    this.actionListeners.add(

      listener,

    );



    return () => {


      this.actionListeners.delete(

        listener,

      );

    };

  }





  public subscribeCognition(

    listener:

      (state:CognitionEvent)=>void,

  ):
    ()=>void {


    this.cognitionListeners.add(

      listener,

    );



    return () => {


      this.cognitionListeners.delete(

        listener,

      );

    };

  }





  private emitAction(

    type:

      AIActionEvent["type"],


    label:
      string,


    status:

      AIActionEvent["status"],

  ):
    string {


    const event:

      AIActionEvent =

    {


      id:

        crypto.randomUUID(),



      type,



      label,



      status,



      timestamp:

        Date.now(),

    };





    for (

      const listener of this.actionListeners

    ) {


      listener(

        event,

      );

    }





    return event.id;

  }





  private emitCognition(

    cognition:

      CognitionEvent,

  ):
    void {


    for (

      const listener of this.cognitionListeners

    ) {


      listener(

        cognition,

      );

    }

  }





  public async initialize():

    Promise<void> {


    await this.runtime.initialize();



    await this.user.initialize();



    await this.runtime.brain.initialize();

  }





  public async chat(

    prompt:
      string,

  ):
    Promise<AIResponse> {


    const message =

      prompt.trim();





    if (!message) {


      return {


        text:

          "I need something to think about.",


        provider:

          "brain",


        model:

          "empty-input",


        processingTime:

          0,

      };

    }





    const actionId =

      this.emitAction(

        "learn",

        `Processing ${message}`,

        "running",

      );





    const request:

      AIRequest =

    {


      messages:

      [

        {

          role:

            "user",


          content:

            message,

        },

      ],


      prompt:

        message,


      timestamp:

        Date.now(),

    };





    const enriched =

      await this.memory.enrich(

        request,

      );





    const response =

      await this.runtime.process(

        enriched,

      );





    this.emitAction(

      "learn",

      "Response generated",

      "complete",

    );





    await this.memory.learn(

      message,

      response.text,

    );





    await this.runtime.brain

      .getConversation()

      .update(

        message,

      );





    const memories =

      await this.runtime.brain

        .recall(

          message,

        );





    for (

      const memory of memories

    ) {


      await this.user.learn(

        memory.category,

        memory.response,

      );

    }





    const cognition =

      this.runtime.brain

        .cognitiveState();





    this.emitCognition({

      agents:

        cognition.agents,


      workspaces:

        cognition.workspaces,


      nodes:

        cognition.nodes,

    });





    return {


      ...response,



      metadata:

      {

        ...(response.metadata ?? {}),



        action:

          actionId,



        cognition:

          true,



        memory:

          true,



        profile:

          true,

      },

    };

  }





  public ready():

    boolean {


    return this.runtime.isReady();

  }





  public async shutdown():

    Promise<void> {


    await this.runtime.shutdown();

  }

}