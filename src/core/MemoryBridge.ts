/**
 * ==========================================================
 * LÉLU
 * MEMORY BRIDGE
 * ==========================================================
 */

import Brain
  from "../brain/Brain";

import type {
  AIRequest,
} from "../providers/AIProvider";


export default class MemoryBridge {


  constructor(

    private readonly brain:
      Brain,

  ) {}



  /**
   * ==========================================================
   * Add memory context to request
   * ==========================================================
   */
  public async enrich(
    request:
      AIRequest,
  ):
    Promise<AIRequest> {


    const memories =
      await this.brain.recall(
        request.prompt,
      );



    if (
      memories.length === 0
    ) {

      return request;

    }



    const memoryText =
      memories

        .map(

          memory =>

            memory.response,

        )

        .join("\n");



    return {

      ...request,


      context:
        memoryText,


      messages:
      [

        ...(request.messages ?? []),


        {

          role:
            "system",


          content:
`Relevant memories from Lélu's memory system:

${memoryText}`,

        },

      ],

    };

  }



  /**
   * ==========================================================
   * Learn from interaction
   * ==========================================================
   */
  public async learn(

    prompt:
      string,

    response:
      string,

  ):
    Promise<void> {


    await this.brain.learn(

      prompt,

      response,

      "user_memory",

      this.extractKeywords(
        prompt,
      ),

      {

        source:
          "conversation",

        type:
          "user_fact",

      },

    );

  }



  /**
   * ==========================================================
   * Extract searchable words
   * ==========================================================
   */
  private extractKeywords(

    text:
      string,

  ):
    string[] {


    return text

      .toLowerCase()

      .replace(
        /[^a-z0-9\s]/g,
        "",
      )

      .split(
        /\s+/,
      )

      .filter(

        word =>
          word.length > 3,

      );

  }

}