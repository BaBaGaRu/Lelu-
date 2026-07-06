/**
 * ==========================================================
 * LÉLU
 * AI SERVICE
 * ==========================================================
 */

import AIBootstrap from "./AIBootstrap";

export default class AIService {

  readonly bootstrap =
    new AIBootstrap();

  async initialize(): Promise<void> {

    await this.bootstrap.boot();

  }

  async send(
    input: string,
  ): Promise<string> {

    return await this.bootstrap.process(
      input,
    );

  }

}