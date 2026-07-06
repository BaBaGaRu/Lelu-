/**
 * ==========================================================
 * LÉLUVERSE
 * ENGINE REGISTRY
 * ==========================================================
 */

import type { EngineDefinition } from "./EngineTypes";

class EngineRegistry {

  private engines = new Map<string, EngineDefinition>();

  public register(engine: EngineDefinition): void {

    this.engines.set(engine.id, engine);

  }

  public unregister(id: string): void {

    this.engines.delete(id);

  }

  public get(id: string): EngineDefinition | undefined {

    return this.engines.get(id);

  }

  public getAll(): EngineDefinition[] {

    return [...this.engines.values()];

  }

  public getByDomain(domain: EngineDefinition["domain"]): EngineDefinition[] {

    return [...this.engines.values()].filter(
      engine => engine.domain === domain
    );

  }

}

const engineRegistry = new EngineRegistry();

export default engineRegistry;