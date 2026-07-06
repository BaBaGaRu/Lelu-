/**
 * ==========================================================
 * LÉLU
 * AI PROVIDER ROUTER
 * ==========================================================
 */

import {
  AIProvider,
  type AIProvider as AIProviderType,
} from "./AIProvider";

export default class AIProviderRouter {

  select(
    input: string,
  ): AIProviderType {

    const text =
      input.toLowerCase();

    if (

      text.includes("wire") ||

      text.includes("voltage") ||

      text.includes("nec") ||

      text.includes("engineering") ||

      text.includes("circuit")

    ) {

      return AIProvider.CEREBRAS;

    }

    if (

      text.includes("image") ||

      text.includes("photo") ||

      text.includes("vision") ||

      text.includes("camera")

    ) {

      return AIProvider.GOOGLE;

    }

    if (

      text.includes("fast") ||

      text.includes("voice") ||

      text.includes("conversation")

    ) {

      return AIProvider.GROQ;

    }

    if (

      text.includes("reason") ||

      text.includes("logic") ||

      text.includes("analyze")

    ) {

      return AIProvider.MISTRAL;

    }

    if (

      text.includes("creative") ||

      text.includes("story") ||

      text.includes("design")

    ) {

      return AIProvider.FIREWORKS;

    }

    return AIProvider.OPENROUTER;

  }

}