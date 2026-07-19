/**
 * ==========================================================
 * LÉLU
 * DECISION ENGINE
 * ==========================================================
 */

import Brain
  from "../brain/Brain";

export type Decision =

  | "memory"

  | "research"

  | "provider"

  | "hybrid";

export interface DecisionResult {

  decision:
    Decision;

  confidence:
    number;

  useMemory:
    boolean;

  useResearch:
    boolean;

  useProvider:
    boolean;

}

export default class DecisionEngine {

  constructor(

    private readonly brain:
      Brain,

  ) {}

  /**
   * Decide how Lélu should answer.
   */
  public decide(
    prompt: string,
  ): DecisionResult {

    const knows =
      this.brain.knows(
        prompt,
      );

    if (

      knows

    ) {

      const confidence =
        this.brain.confidenceOf(
          prompt,
        );

      if (

        confidence >=
        0.90

      ) {

        return {

          decision:
            "memory",

          confidence,

          useMemory:
            true,

          useResearch:
            false,

          useProvider:
            false,

        };

      }

      if (

        confidence >=
        0.60

      ) {

        return {

          decision:
            "hybrid",

          confidence,

          useMemory:
            true,

          useResearch:
            true,

          useProvider:
            true,

        };

      }

    }

    const text =
      prompt.toLowerCase();

    const research =
      this.requiresResearch(
        text,
      );

    return {

      decision:

        research

          ? "research"

          : "provider",

      confidence:
        0,

      useMemory:
        false,

      useResearch:
        research,

      useProvider:
        !research,

    };

  }

  /**
   * Determine if external
   * knowledge is needed.
   */
  private requiresResearch(
    text: string,
  ): boolean {

    return (

      text.includes(
        "search",
      ) ||

      text.includes(
        "find",
      ) ||

      text.includes(
        "look up",
      ) ||

      text.includes(
        "latest",
      ) ||

      text.includes(
        "current",
      ) ||

      text.includes(
        "today",
      ) ||

      text.includes(
        "news",
      ) ||

      text.includes(
        "research",
      ) ||

      text.includes(
        "documentation",
      )

    );

  }

}