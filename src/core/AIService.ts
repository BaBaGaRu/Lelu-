/**
 * ==========================================================
 * LÉLU
 * AI SERVICE
 * ==========================================================
 */

import AIBootstrap
  from "./AIBootstrap";

export default class AIService {

  private readonly bootstrap =
    new AIBootstrap();

  async initialize(): Promise<void> {

    await this.bootstrap.boot();

  }

  async send(
    prompt: string,
  ): Promise<string> {

    return await this.bootstrap.process(
      prompt,
    );

  }

}