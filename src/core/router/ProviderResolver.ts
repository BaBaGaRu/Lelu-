/**
 * ==========================================================
 * LÉLU
 * PROVIDER RESOLVER
 * ==========================================================
 */

import type AIProvider
  from "../../providers/AIProvider";

import type {
  AIResponse,
} from "../../providers/AIProvider";

import type RouterContext
  from "./RouterContext";

import type {
  ProviderResult,
} from "./RouterResults";


export default class ProviderResolver {


  public async execute(
    context:
      RouterContext,
  ):
    Promise<ProviderResult> {


    const providers =
      await context.aiProviders.available();



    if (
      providers.length === 0
    ) {

      return {

        handled:
          true,

        response:
          this.offline(
            context.started,
          ),

      };

    }



    for (
      const provider of providers
    ) {


      if (
        !provider.canHandle(
          context.request.prompt,
        )
      ) {

        continue;

      }



      try {


        context.logger.info(

          "ProviderResolver",

          `Trying ${provider.name}`,

        );



        const response =
          await this.executeProvider(

            provider,

            context,

          );



        if (
          response
        ) {

          return {

            handled:
              true,

            response,

          };

        }


      }

      catch(error) {


        context.logger.error(

          "ProviderResolver",

          `${provider.name} failed, trying next provider`,

          {

            error:

              error instanceof Error

                ? error.message

                : String(error),

          },

        );


        continue;

      }

    }



    return {

      handled:
        true,

      response:
        this.offline(
          context.started,
        ),

    };

  }



  private async executeProvider(

    provider:
      AIProvider,

    context:
      RouterContext,

  ):
    Promise<AIResponse> {


    const response =
      await provider.generate(

        context.request,

      );



    return {

      ...response,

      provider:

        response.provider ||

        provider.name,


      model:

        response.model ||

        provider.name,


      processingTime:

        response.processingTime ||

        Date.now() -
        context.started,

    };

  }



  private offline(
    started:
      number,
  ):
    AIResponse {


    return {

      text:
        "Lélu could not generate a response.",

      provider:
        "offline",

      model:
        "offline",

      processingTime:
        Date.now() -
        started,

    };

  }

}