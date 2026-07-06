/**
 * ==========================================================
 * LÉLUVERSE
 * WONDER ENGINE
 * ==========================================================
 *
 * Searches for new ideas, hidden patterns and unexplored
 * possibilities throughout the Léluverse.
 */

import type { Wonder } from "./WonderTypes";

class WonderEngine {

  private wonders = new Map<string, Wonder>();

  public boot(): void {

    console.log("══════════════════════════════");
    console.log("WONDER ENGINE ONLINE");
    console.log(`Wonder : ${this.wonders.size}`);
    console.log("══════════════════════════════");

  }

  public add(wonder: Wonder): void {

    this.wonders.set(wonder.id, wonder);

  }

  public get(id: string): Wonder | undefined {

    return this.wonders.get(id);

  }

  public getAll(): Wonder[] {

    return [...this.wonders.values()];

  }

  public remove(id: string): void {

    this.wonders.delete(id);

  }

}

const wonderEngine = new WonderEngine();

export default wonderEngine;