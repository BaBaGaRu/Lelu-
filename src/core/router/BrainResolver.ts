/**
 * ==========================================================
 * LÉLU
 * BRAIN RESOLVER
 * ==========================================================
 */

import type {
  AIResponse,
} from "../../providers/AIProvider";

import type RouterContext
  from "./RouterContext";

import type {
  BrainResult,
} from "./RouterResults";

export default class BrainResolver {

  /**
   * Attempt to answer directly
   * from the Brain.
   */
  public async execute(
    context:
      RouterContext,
  ): Promise<BrainResult> {

    const prompt =
      context.request.prompt;

    if (

      !context.brain.knows(
        prompt,
      )

    ) {

      return {

        handled:
          false,

      };

    }

    const response:
      AIResponse = {

      text:

        context.brain.compose(
          prompt,
        ),

      provider:
        "brain",

      model:
        "memory",

      processingTime:

        Date.now() -
        context.started,

      metadata: {

        source:
          "Brain",

      },

    };

    context.logger.info(

      "BrainResolver",

      "Resolved from memory",

      {

        prompt,

      },

    );

    return {

      handled:
        true,

      response,

    };

  }

}