/**
 * ==========================================================
 * LÉLU
 * AI ADAPTER
 * ==========================================================
 */

import type { AIProvider } from "./AIProviderRouter";
import AIConfig from "./AIConfig";

export default class AIAdapter {

  readonly config =
    new AIConfig();

  async request(
    provider: AIProvider,
    prompt: string,
  ): Promise<string> {

    switch (provider) {

      case "groq":

        return await this.openAICompatible(
          provider,
          prompt,
        );

      case "openrouter":

        return await this.openAICompatible(
          provider,
          prompt,
        );

      case "cerebras":

        return await this.openAICompatible(
          provider,
          prompt,
        );

      case "mistral":

        return await this.openAICompatible(
          provider,
          prompt,
        );

      case "fireworks":

        return await this.openAICompatible(
          provider,
          prompt,
        );

      case "google":

        return await this.googleRequest(
          prompt,
        );

      default:

        throw new Error(
          "Unsupported AI provider.",
        );

    }

  }

  private async openAICompatible(
    provider: AIProvider,
    prompt: string,
  ): Promise<string> {

    const cfg =
      this.config.providers[provider];

    const response =
      await fetch(

        cfg.endpoint,

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${cfg.apiKey}`,

          },

          body: JSON.stringify({

            model: cfg.model,

            messages: [

              {

                role: "user",

                content: prompt,

              },

            ],

          }),

        },

      );

    if (!response.ok) {

      throw new Error(
        `${provider} request failed.`,
      );

    }

    const json =
      await response.json();

    return (

      json.choices?.[0]?.message?.content ??

      "No response."

    );

  }

  private async googleRequest(
    _prompt: string,
  ): Promise<string> {

    /**
     * We'll implement the Gemini request
     * properly in the next step.
     */

    return "Google adapter not connected yet.";

  }

}