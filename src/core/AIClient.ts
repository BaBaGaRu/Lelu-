/**
 * ==========================================================
 * LÉLU
 * AI CLIENT
 * ==========================================================
 */

import AIProviderRouter from "./AIProviderRouter";

import GroqAdapter from "./adapters/GroqAdapter";
import GeminiAdapter from "./adapters/GeminiAdapter";

export default class AIClient {

  readonly router =
    new AIProviderRouter();

  readonly groq =
    new GroqAdapter();

  readonly gemini =
    new GeminiAdapter();

  async chat(
    input: string,
  ): Promise<string> {

    let provider =
      this.router.select(input);

    const attempted =
      new Set<string>();

    while (

      !attempted.has(provider)

    ) {

      attempted.add(provider);

      try {

        switch (provider) {

          case "groq":

            return await this.groq.chat(
              input,
            );

          case "google":

            return await this.gemini.chat(
              input,
            );

          default:

            provider =
              this.router.fallback(
                provider,
              );

        }

      }

      catch (

        error

      ) {

        console.warn(

          `[${provider}] failed`,

          error,

        );

        provider =
          this.router.fallback(
            provider,
          );

      }

    }

    throw new Error(

      "No AI providers available.",

    );

  }

}