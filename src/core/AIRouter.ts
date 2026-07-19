/**
 * ==========================================================
 * LÉLU
 * AI ROUTER
 * ==========================================================
 */

import type {
  AIResponse,
} from "../providers/AIProvider";

import type RouterContext
  from "./router/RouterContext";

import BrainResolver
  from "./router/BrainResolver";

import ResearchResolver
  from "./router/ResearchResolver";

import ProviderResolver
  from "./router/ProviderResolver";

import ResponseBuilder
  from "./router/ResponseBuilder";

export default class AIRouter {

  constructor(

    private readonly brain:
      BrainResolver,

    private readonly research:
      ResearchResolver,

    private readonly providers:
      ProviderResolver,

    private readonly responses =
      new ResponseBuilder(),

  ) {}

  /**
   * Route an AI request.
   */
  public async route(
    context:
      RouterContext,
  ): Promise<AIResponse> {

    const brain =
      await this.brain.execute(
        context,
      );

    if (

      brain.handled &&

      brain.response

    ) {

      return brain.response;

    }

    const research =
      await this.research.execute(
        context,
      );

    if (

      research.handled

    ) {

      return this.responses.fromResearch(

        research.results,

        context.started,

      );

    }

    const provider =
      await this.providers.execute(
        context,
      );

    if (

      provider.handled &&

      provider.response

    ) {

      return provider.response;

    }

    return this.responses.offline(

      context.started,

    );

  }

}