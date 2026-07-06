/**
 * ==========================================================
 * LÉLUVERSE
 * NATURAL EVENT ENGINE
 * ==========================================================
 */

import type { NaturalEvent } from "./EventTypes";

class EventEngine {

  private events = new Map<string, NaturalEvent>();

  public boot(): void {

    console.log("══════════════════════════════");

    console.log("EVENT ENGINE ONLINE");

    console.log(`Events : ${this.events.size}`);

    console.log("══════════════════════════════");

  }

  public create(event: NaturalEvent): void {

    this.events.set(event.id, event);

  }

  public get(id: string): NaturalEvent | undefined {

    return this.events.get(id);

  }

  public getAll(): NaturalEvent[] {

    return [...this.events.values()];

  }

  public remove(id: string): void {

    this.events.delete(id);

  }

}

const eventEngine = new EventEngine();

export default eventEngine;