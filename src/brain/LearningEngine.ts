/**
 * ==========================================================
 * LÉLU
 * LEARNING ENGINE
 * ==========================================================
 */

import PatternMemory
  from "./PatternMemory";

import type ResponsePattern
  from "./ResponsePattern";


export default class LearningEngine {


  constructor(

    private readonly memory:
      PatternMemory,

  ) {}



  public async learn(

    prompt:
      string,

    response:
      string,

    intent =
      "general",

    keywords:
      string[] = [],

    context:
      Record<
        string,
        unknown
      > = {},

  ):
    Promise<ResponsePattern> {


    const pattern:
      ResponsePattern = {


      id:
        crypto.randomUUID(),


      prompt,


      response,


      intent,


      keywords,


      context,


      confidence:
        1,


      successfulUses:
        1,


      failedUses:
        0,


      createdAt:
        Date.now(),


      updatedAt:
        Date.now(),


    };



    await this.memory.add(
      pattern,
    );



    return pattern;

  }



  public reinforce(
    id:
      string,
  ):
    void {


    const pattern =
      this.memory.get(
        id,
      );


    if (
      pattern ===
      undefined
    ) {

      return;

    }



    pattern.successfulUses++;


    pattern.confidence =

      pattern.successfulUses /

      Math.max(

        1,

        pattern.successfulUses +

        pattern.failedUses,

      );



    pattern.updatedAt =
      Date.now();

  }



  public weaken(
    id:
      string,
  ):
    void {


    const pattern =
      this.memory.get(
        id,
      );


    if (
      pattern ===
      undefined
    ) {

      return;

    }



    pattern.failedUses++;


    pattern.confidence =

      pattern.successfulUses /

      Math.max(

        1,

        pattern.successfulUses +

        pattern.failedUses,

      );



    pattern.updatedAt =
      Date.now();

  }

}