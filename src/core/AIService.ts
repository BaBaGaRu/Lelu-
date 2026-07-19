/**
 * ==========================================================
 * LÉLU
 * AI SERVICE
 * ==========================================================
 */

import AIRuntime
  from "./AIRuntime";

import MemoryBridge
  from "./MemoryBridge";

import type {
  AIRequest,
  AIResponse,
} from "../providers/AIProvider";


export default class AIService {


  private readonly runtime:
    AIRuntime;


  private readonly memory:
    MemoryBridge;



  constructor() {

    this.runtime =
      new AIRuntime();


    this.memory =
      new MemoryBridge(

        this.runtime.brain,

      );

  }



  /**
   * ==========================================================
   * Initialize
   * ==========================================================
   */
  public async initialize():
    Promise<void> {

    await this.runtime.initialize();

    await this.runtime.brain.initialize();

  }





  /**
   * ==========================================================
   * Chat
   * ==========================================================
   */
  public async chat(
    prompt:
      string,
  ):
    Promise<AIResponse> {


    const request:
      AIRequest = {


      messages:
      [

        {
          role:
            "user",

          content:
            prompt,

        },

      ],


      prompt,


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



    await this.memory.learn(

      prompt,

      response.text,

    );



    return {

      ...response,


      metadata:
      {

        ...(response.metadata ?? {}),


        memory:
          true,

      },

    };

  }





  /**
   * ==========================================================
   * Runtime status
   * ==========================================================
   */
  public ready():
    boolean {

    return this.runtime.isReady();

  }





  /**
   * ==========================================================
   * Shutdown
   * ==========================================================
   */
  public async shutdown():
    Promise<void> {

    await this.runtime.shutdown();

  }

}