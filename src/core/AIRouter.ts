/**
 * ==========================================================
 * LÉLU
 * AI ROUTER
 * ==========================================================
 */

export enum AIIntent {

  CHAT = "chat",

  ENGINEERING = "engineering",

  MEMORY = "memory",

  GENESIS = "genesis",

  VOICE = "voice",

  SEARCH = "search",

}

export default class AIRouter {

  route(
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

      return AIIntent.ENGINEERING;

    }

    if (

      text.includes("remember")

    ) {

      return AIIntent.MEMORY;

    }

    if (

      text.includes("genesis")

    ) {

      return AIIntent.GENESIS;

    }

    return AIIntent.CHAT;

  }

}