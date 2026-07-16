/**
 * ==========================================================
 * LÉLU
 * AI BOOTSTRAP
 * ==========================================================
 */

import AIManager
  from "./AIManager";

import ExecutionLogger
  from "./ExecutionLogger";

export default class AIBootstrap {

  private readonly manager =
    new AIManager();

  private readonly logger =
    new ExecutionLogger();

  private initialized =
    false;

  async boot(): Promise<void> {

    if (this.initialized) {

      return;

    }

    this.logger.info(
      "Bootstrap",
      "Booting AI Runtime",
    );

    await this.manager.initialize();

    this.initialized = true;

    this.logger.info(
      "Bootstrap",
      "AI Runtime Ready",
    );

  }

  async process(
    input: string,
  ): Promise<string> {

    if (!this.initialized) {

      await this.boot();

    }

    this.logger.info(
      "Bootstrap",
      "Processing Request",
    );

    const reply =
      await this.manager.process(
        input,
      );

    this.logger.info(
      "Bootstrap",
      "Request Complete",
    );

    return reply;

  }

  async shutdown(): Promise<void> {

    this.logger.info(
      "Bootstrap",
      "Shutdown",
    );

    this.initialized = false;

  }

}