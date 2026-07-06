/**
 * ==========================================================
 * LÉLUVERSE
 * ECOLOGY ENGINE
 * ==========================================================
 *
 * Controls all living ecosystems.
 */

import type { EcologyLife } from "./EcologyTypes";

class EcologyEngine {

  private life = new Map<string, EcologyLife>();

  public boot(): void {

    console.log("══════════════════════════════");

    console.log("ECOLOGY ENGINE ONLINE");

    console.log(`Species : ${this.life.size}`);

    console.log("══════════════════════════════");

  }

  public add(item: EcologyLife): void {

    this.life.set(item.id, item);

  }

  public get(id: string): EcologyLife | undefined {

    return this.life.get(id);

  }

  public getAll(): EcologyLife[] {

    return [...this.life.values()];

  }

  public remove(id: string): void {

    this.life.delete(id);

  }

}

const ecologyEngine = new EcologyEngine();

export default ecologyEngine;