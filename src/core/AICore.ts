/**
 * ==========================================================
 * LÉLU
 * AI CORE
 * ==========================================================
 */

import AIClient from "./AIClient";
import AIRouter from "./AIRouter";

export default class AICore {
  private readonly router = new AIRouter();
  private readonly client = new AIClient();

  async process(input: string): Promise<string> {
    const intent = this.router.route(input);

    console.log("[LÉLU]", intent);

    return this.client.chat(input);
  }
}