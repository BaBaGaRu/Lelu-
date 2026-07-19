/**
 * ==========================================================
 * LÉLU
 * BRAIN
 * ==========================================================
 */

import PatternMemory
  from "./PatternMemory";

import LearningEngine
  from "./LearningEngine";

import OfflineComposer
  from "./OfflineComposer";

import ConfidenceEngine
  from "./ConfidenceEngine";

import type ResponsePattern
  from "./ResponsePattern";


export default class Brain {


  private readonly memory =
    new PatternMemory();


  private readonly learning =
    new LearningEngine(
      this.memory,
    );


  private readonly composer =
    new OfflineComposer(
      this.memory,
    );


  private readonly confidence =
    new ConfidenceEngine();



  /**
   * Initialize memory.
   */
  public async initialize():
    Promise<void> {

    await this.memory.initialize();

  }



  /**
   * Learn from an interaction.
   */
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


    return await this.learning.learn(

      prompt,

      response,

      intent,

      keywords,

      context,

    );

  }



  /**
   * Recall matching patterns.
   */
  public async recall(

    prompt:
      string,

  ):
    Promise<ResponsePattern[]> {


    return await this.memory.search(

      prompt,

    );

  }



  /**
   * Compose an offline response.
   */
  public compose(

    prompt:
      string,

  ):
    string {

    return this.composer.compose(
      prompt,
    );

  }



  /**
   * Determine the best pattern.
   */
  public async best(

    prompt:
      string,

  ):
    Promise<ResponsePattern | undefined> {


    const patterns =
      await this.memory.search(
        prompt,
      );


    return this.confidence.best(
      patterns,
    );

  }



  /**
   * Determine confidence.
   */
  public async confidenceOf(

    prompt:
      string,

  ):
    Promise<number> {


    const pattern =
      await this.best(
        prompt,
      );


    if (
      pattern === undefined
    ) {

      return 0;

    }


    return this.confidence.calculate(
      pattern,
    );

  }



  /**
   * Whether memory contains
   * information about a prompt.
   */
  public knows(

    prompt:
      string,

  ):
    boolean {

    return this.composer.hasKnowledge(
      prompt,
    );

  }



  /**
   * Suggested responses.
   */
  public suggestions(

    prompt:
      string,

  ):
    string[] {

    return this.composer.suggestions(
      prompt,
    );

  }



  /**
   * Forget everything.
   */
  public async reset():
    Promise<void> {

    await this.memory.clear();

  }

}