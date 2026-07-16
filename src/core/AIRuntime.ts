/**
 * ==========================================================
 * LÉLU
 * AI RUNTIME
 * ==========================================================
 */

import AICore
  from "./AICore";

import AIRouter
  from "./AIRouter";

import ExecutionLogger
  from "./ExecutionLogger";

import registerProviders
  from "./RegisterProviders";

import registerAIProviders
  from "./RegisterAIProviders";

export default class AIRuntime {

  readonly core:
    AICore;

  readonly router:
    AIRouter;

  private readonly logger =
    new ExecutionLogger();

  private initialized =
    false;

  constructor() {

    const knowledgeRegistry =
      registerProviders();

    const aiRegistry =
      registerAIProviders();

    this.core =
      new AICore(
        knowledgeRegistry,
      );

    this.router =
      new AIRouter(
        knowledgeRegistry,
        aiRegistry,
      );

  }

  async initialize(): Promise<void> {

    if (this.initialized) {

      return;

    }

    this.logger.info(
      "Runtime",
      "Initializing",
    );

    this.initialized = true;

    this.logger.info(
      "Runtime",
      "Ready",
    );

  }

  async process(
    input: string,
  ): Promise<string> {

    if (!this.initialized) {

      await this.initialize();

    }

    this.logger.info(
      "Runtime",
      "Routing Request",
    );

    const reply =
      await this.router.process(
        input,
      );

    this.logger.info(
      "Runtime",
      "Request Complete",
    );

    return reply;

  }

  async shutdown(): Promise<void> {

    this.logger.info(
      "Runtime",
      "Shutdown",
    );

    this.initialized = false;

  }

}