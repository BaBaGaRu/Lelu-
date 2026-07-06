/**
 * ==========================================================
 * LÉLU
 * AI BOOTSTRAP
 * ==========================================================
 */

import AIManager from "./AIManager";

export default class AIBootstrap {

  readonly manager =
    new AIManager();

  async boot(): Promise<void> {

    await this.manager.initialize();

  }

  async process(
    input: string,
  ): Promise<string> {

    return await this.manager.process(
      input,
    );

  }

}