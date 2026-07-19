/**
 * ==========================================================
 * LÉLU
 * AI CLIENT
 * ==========================================================
 */

import AIProviderRouter
  from "./AIProviderRouter";

import GroqAdapter
  from "./adapters/GroqAdapter";

import GeminiAdapter
  from "./adapters/GeminiAdapter";

import OpenRouterAdapter
  from "./adapters/OpenRouterAdapter";


export default class AIClient {

  private readonly router =
    new AIProviderRouter();


  private readonly groq =
    new GroqAdapter();


  private readonly gemini =
    new GeminiAdapter();


  private readonly openRouter =
    new OpenRouterAdapter();



  async chat(
    prompt: string,
  ): Promise<string> {


    let provider =
      this.router.select(
        prompt,
      );


    const attempted =
      new Set<string>();


    let lastError:
      unknown;



    while (
      !attempted.has(provider)
    ) {

      attempted.add(provider);


      try {

        switch (provider) {


          case "openrouter":

            return await this.openRouter.chat(
              prompt,
            );


          case "groq":

            return await this.groq.chat(
              prompt,
            );


          case "google":

            return await this.gemini.chat(
              prompt,
            );


          default:

            provider =
              this.router.fallback(
                provider,
              );

            continue;

        }


      } catch (error) {


        lastError =
          error;


        console.error(
          `[AIClient] ${provider} failed`,
          error,
        );


        provider =
          this.router.fallback(
            provider,
          );


      }

    }


    if (
      lastError instanceof Error
    ) {

      throw new Error(
        `All AI providers failed. Last error: ${lastError.message}`,
      );

    }


    throw new Error(
      "No AI providers available.",
    );

  }

}