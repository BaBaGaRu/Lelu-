/**
 * ==========================================================
 * LÉLU
 * AI RUNTIME
 * ==========================================================
 */

import AICore from "./AICore";
import AIRouter from "./AIRouter";

export default class AIRuntime {

  readonly core =
    new AICore();

  readonly router =
    new AIRouter();

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