/**
 * ==========================================================
 * LÉLU
 * AI CONTROLLER
 * ==========================================================
 */

import AIService from "./AIService";

export default class AIController {

  readonly service =
    new AIService();

  async initialize(): Promise<void> {

    await this.service.initialize();

  }

  async chat(
    message: string,
  ): Promise<string> {

    const response = await this.service.chat(
      message,
    );

    return response.text;

  }

}