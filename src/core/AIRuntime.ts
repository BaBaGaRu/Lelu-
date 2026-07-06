/**
 * ==========================================================
 * LÉLU
 * AI RUNTIME
 * ==========================================================
 */

import AICore from "./AICore";

export default class AIRuntime {

  readonly core =
    new AICore();

  async initialize(): Promise<void> {

    // Reserved for future startup.

  }

  async process(
    input: string,
  ): Promise<string> {

    return await this.core.process(
      input,
    );

  }

}