/**
 * ==========================================================
 * LÉLU
 * AI ROUTER
 * ==========================================================
 */

type AIIntent =
  | "chat"
  | "engineering"
  | "memory"
  | "genesis"
  | "voice"
  | "search";

export default class AIRouter {

  route(
    input: string,
  ): AIIntent {

    const text = input.toLowerCase();

    if (
      text.includes("wire") ||
      text.includes("circuit") ||
      text.includes("voltage") ||
      text.includes("engineering")
    ) {
      return "engineering";
    }

    if (text.includes("remember")) {
      return "memory";
    }

    if (text.includes("genesis")) {
      return "genesis";
    }

    if (text.includes("voice")) {
      return "voice";
    }

    if (text.includes("search")) {
      return "search";
    }

    return "chat";

  }

}