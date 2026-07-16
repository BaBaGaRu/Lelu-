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
    input: string,
  ): AIProvider {

    const text =
      input.toLowerCase();

    if (

      text.includes("gemini") ||

      text.includes("google")

    ) {

      return "google";

    }

    if (

      text.includes("openrouter")

    ) {

      return "openrouter";

    }

    if (

      text.includes("cerebras")

    ) {

      return "cerebras";

    }

    if (

      text.includes("mistral")

    ) {

      return "mistral";

    }

    if (

      text.includes("fireworks")

    ) {

      return "fireworks";

    }

    return "groq";

  }

  fallback(
    current: AIProvider,
  ): AIProvider {

    const index =
      this.providers.indexOf(
        current,
      );

    return this.providers[

      (index + 1) %

      this.providers.length

    ];

  }

  all(): AIProvider[] {

    return [

      ...this.providers,

    ];

  }

}