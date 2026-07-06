/**
 * ==========================================================
 * LÉLUVERSE
 * RIVER ENGINE
 * ==========================================================
 */

import type { River } from "./RiverTypes";

class RiverEngine {

  private rivers = new Map<string, River>();

  public boot(): void {

    console.log("══════════════════════════════");

    console.log("RIVER ENGINE ONLINE");

    console.log(`Rivers : ${this.rivers.size}`);

    console.log("══════════════════════════════");

  }

  public create(river: River): void {

    this.rivers.set(river.id, river);

  }

  public get(id: string): River | undefined {

    return this.rivers.get(id);

  }

  public getAll(): River[] {

    return [...this.rivers.values()];

  }

  public remove(id: string): void {

    this.rivers.delete(id);

  }

}

const riverEngine = new RiverEngine();

export default riverEngine;