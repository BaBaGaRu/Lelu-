/**
 * ==========================================================
 * LÉLUVERSE
 * ENVIRONMENT REGISTRY
 * ==========================================================
 */

import type { WorldEnvironment } from "./EnvironmentRegistryTypes";

class EnvironmentRegistry {

  private environments = new Map<string, WorldEnvironment>();

  public register(environment: WorldEnvironment): void {

    this.environments.set(environment.worldId, environment);

  }

  public get(worldId: string): WorldEnvironment | undefined {

    return this.environments.get(worldId);

  }

  public getAll(): WorldEnvironment[] {

    return [...this.environments.values()];

  }

  public unregister(worldId: string): void {

    this.environments.delete(worldId);

  }

}

const environmentRegistry = new EnvironmentRegistry();

export default environmentRegistry;