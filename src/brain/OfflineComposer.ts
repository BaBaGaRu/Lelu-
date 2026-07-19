/**
 * ==========================================================
 * LÉLU
 * OFFLINE COMPOSER
 * ==========================================================
 */

import PatternMemory from "./PatternMemory";

import type ResponsePattern from "./ResponsePattern";

export default class OfflineComposer {

  constructor(
    private readonly memory: PatternMemory,
  ) {}

  public compose(
    prompt: string,
  ): string {

    const matches =
      this.memory.search(
        prompt,
      );

    if (matches.length === 0) {
      return this.defaultResponse(
        prompt,
      );
    }

    const best =
      this.pickBest(
        matches,
      );

    return best.response;

  }

  private pickBest(
    matches: ResponsePattern[],
  ): ResponsePattern {

    if (matches.length === 0) {
      throw new Error(
        "No matching response patterns.",
      );
    }

    let best =
      matches[0];

    let bestScore =
      best.confidence +
      best.successfulUses;

    for (const pattern of matches) {

      const score =
        pattern.confidence +
        pattern.successfulUses;

      if (score > bestScore) {

        best = pattern;
        bestScore = score;

      }

    }

    return best;

  }

  private defaultResponse(
    prompt: string,
  ): string {

    const message =
      prompt.trim();

    if (message.length === 0) {

      return "I'm listening.";

    }

    return `I don't have enough experience with "${message}" yet, but I'm learning.`;

  }

  public hasKnowledge(
    prompt: string,
  ): boolean {

    return (
      this.memory.search(
        prompt,
      ).length > 0
    );

  }

  public suggestions(
    prompt: string,
  ): string[] {

    const matches =
      this.memory.search(
        prompt,
      );

    return matches

      .slice(
        0,
        5,
      )

      .map(
        (
          pattern,
        ) => pattern.response,
      );

  }

}