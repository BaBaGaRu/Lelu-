/**
 * ==========================================================
 * LÉLU
 * AI ROUTER
 * ==========================================================
 */

import ProviderRegistry
  from "./ProviderRegistry";

import ResearchCoordinator
  from "./ResearchCoordinator";

import type {
  KnowledgeResult,
} from "../providers/Provider";

import AIProviderRegistry
  from "./tools/AIProviderRegistry";

export type AIIntent =
  | "chat"
  | "engineering"
  | "memory"
  | "genesis"
  | "voice"
  | "search";

export default class AIRouter {

  private readonly research =
    new ResearchCoordinator();

  constructor(

    private readonly knowledgeProviders:
      ProviderRegistry,

    private readonly aiProviders:
      AIProviderRegistry,

  ) {}

  async process(
    input: string,
  ): Promise<string> {

    const intent =
      this.detectIntent(
        input,
      );

    if (
      intent === "search"
    ) {

      const results =
        await this.research.search(
          input,
        );

      if (
        results.length === 0
      ) {

        return "No results found.";

      }

      return results

        .map(

          (
            result: KnowledgeResult,
          ) =>

`${result.title}

${result.content}

${result.url ?? ""}`,

        )

        .join("\n\n");

    }

    const providers =
      this.aiProviders.all();

    const provider =
      providers.find(

        provider =>

          provider.enabled &&

          provider.canHandle(
            input,
          ),

      );

    if (!provider) {

      return `No AI provider found.

Registered Providers:
${providers.length > 0

  ? providers

      .map(
        provider =>
          provider.name,
      )

      .join(", ")

  : "None"}`;

    }

    return await provider.generate(
      input,
    );

  }

  private detectIntent(
    input: string,
  ): AIIntent {

    const text =
      input.toLowerCase();

    if (

      text.includes("wire") ||

      text.includes("circuit") ||

      text.includes("voltage") ||

      text.includes("engineering")

    ) {

      return "engineering";

    }

    if (
      text.includes(
        "remember",
      )
    ) {

      return "memory";

    }

    if (
      text.includes(
        "genesis",
      )
    ) {

      return "genesis";

    }

    if (
      text.includes(
        "voice",
      )
    ) {

      return "voice";

    }

    if (
      text.includes(
        "search",
      )
    ) {

      return "search";

    }

    return "chat";

  }

}