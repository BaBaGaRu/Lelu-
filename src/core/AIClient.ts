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

  private readonly router =
    new AIProviderRouter();

  private readonly groq =
    new GroqAdapter();

  private readonly gemini =
    new GeminiAdapter();

  async chat(
    prompt: string,
  ): Promise<string> {

    let provider =
      this.router.select(
        prompt,
      );

    const attempted =
      new Set<string>();

    while (

      !attempted.has(provider)

    ) {

      attempted.add(
        provider,
      );

      try {

        switch (provider) {

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