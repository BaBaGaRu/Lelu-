/**
 * ==========================================================
 * LÉLU
 * AI CORE
 * ==========================================================
 */

import AIClient from "./AIClient";
import AIRouter from "./AIRouter";
import ProviderRegistry from "./ProviderRegistry";

export default class AICore {

  private readonly router: AIRouter;

  private readonly client: AIClient;

  constructor(
    providers: ProviderRegistry,
  ) {

    this.router =
      new AIRouter(
        providers,
      );

    this.client =
      new AIClient();

  }

  async process(
    input: string,
  ): Promise<string> {

    const intent =
      this.router.route(
        input,
      );

    console.log(
      "[LÉLU]",
      intent,
    );

    return await this.client.chat(
    
    
    b   nput,
    );

  }

}