/**
 * ==========================================================
 * LÉLU
 * AI CORE
 * ==========================================================
 */

export type AIModule = {

  id: string;

  execute(
    input: string,
  ): Promise<string>;

};

export default class AICore {

  private readonly modules =
    new Map<string, AIModule>();

  register(
    module: AIModule,
  ): void {

    this.modules.set(
      module.id,
      module,
    );

  }

  get(
    id: string,
  ): AIModule | undefined {

    return this.modules.get(id);

  }

  async execute(

    id: string,

    input: string,

  ): Promise<string> {

    const module =
      this.modules.get(id);

    if (!module) {

      return `Module "${id}" not found.`;

    }

    return module.execute(
      input,
    );

  }

}