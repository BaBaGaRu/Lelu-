/**
 * ==========================================================
 * LÉLUVERSE
 * RESOURCE ENGINE
 * ==========================================================
 */

import type { Resource } from "./ResourceTypes";

class ResourceEngine {

  private resources = new Map<string, Resource>();

  public boot(): void {

    console.log("══════════════════════════════");

    console.log("RESOURCE ENGINE ONLINE");

    console.log(`Resources : ${this.resources.size}`);

    console.log("══════════════════════════════");

  }

  public create(resource: Resource): void {

    this.resources.set(resource.id, resource);

  }

  public get(id: string): Resource | undefined {

    return this.resources.get(id);

  }

  public getAll(): Resource[] {

    return [...this.resources.values()];

  }

  public remove(id: string): void {

    this.resources.delete(id);

  }

}

const resourceEngine = new ResourceEngine();

export default resourceEngine;