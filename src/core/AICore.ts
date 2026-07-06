import AIClient from "./AIClient";
import AIRouter from "./AIRouter";

export default class AICore {

  readonly router =
    new AIRouter();

  readonly client =
    new AIClient();

  async process(
    input: string,
  ): Promise<string> {

    return await this.client.chat(
      input,
    );

  }

}