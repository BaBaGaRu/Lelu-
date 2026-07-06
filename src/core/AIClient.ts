/**
 * ==========================================================
 * LÉLU
 * AI CLIENT
 * SAFE VERSION
 * ==========================================================
 */

import AIProviderRouter from "./AIProviderRouter";

export default class AIClient {

  readonly router =
    new AIProviderRouter();

  async chat(
    input: string,
  ): Promise<string> {

    const provider =
      this.router.select(input);

    console.log(
      "[AI]",
      provider,
      input,
    );

    return `[${provider}] ${input}`;

  }

}