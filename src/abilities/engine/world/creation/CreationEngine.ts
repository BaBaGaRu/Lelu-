/**
 * ==========================================================
 * LÉLUVERSE
 * CREATION ENGINE
 * ==========================================================
 *
 * Everything meaningful begins here.
 */

import type { Creation } from "./CreationTypes";

class CreationEngine {

  private creations = new Map<string, Creation>();

  public boot(): void {

    console.log("══════════════════════════════");
    console.log("CREATION ENGINE ONLINE");
    console.log(`Creations : ${this.creations.size}`);
    console.log("══════════════════════════════");

  }

  public create(item: Creation): void {

    this.creations.set(item.id, item);

  }

  public update(item: Creation): void {

    this.creations.set(item.id, item);

  }

  public get(id: string): Creation | undefined {

    return this.creations.get(id);

  }

  public getAll(): Creation[] {

    return [...this.creations.values()];

  }

  public delete(id: string): void {

    this.creations.delete(id);

  }

}

const creationEngine = new CreationEngine();

export default creationEngine;