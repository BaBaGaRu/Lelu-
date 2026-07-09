/**
 * ==========================================================
 * LÉLU
 * AI PROVIDER ROUTER
 * ==========================================================
 */

export type AIProvider =

  | "groq"
  | "google"
  | "openrouter"
  | "cerebras"
  | "mistral"
  | "fireworks";

export default class AIProviderRouter {

  private readonly providers: AIProvider[] = [

    "groq",

    "google",

    "openrouter",

    "cerebras",

    "mistral",

    "fireworks",

  ];

  select(
    _input: string,
  ): AIProvider {

    return this.providers[0];

  }

  fallback(
    current: AIProvider,
  ): AIProvider {

    const index =
      this.providers.indexOf(current);

    return this.providers[

      (index + 1) %

      this.providers.length

    ];

  }

  all(): AIProvider[] {

    return this.providers;

  }

}