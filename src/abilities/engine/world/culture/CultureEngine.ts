/**
 * ==========================================================
 * LÉLUVERSE
 * CULTURE ENGINE
 * ==========================================================
 */

import type { Culture } from "./CultureTypes";

class CultureEngine {

  private cultures = new Map<string, Culture>();

  public boot(): void {

    console.log("══════════════════════════════");

    console.log("CULTURE ENGINE ONLINE");

    console.log(`Cultures : ${this.cultures.size}`);

    console.log("══════════════════════════════");

  }

  public create(culture: Culture): void {

    this.cultures.set(culture.id, culture);

  }

  public get(id: string): Culture | undefined {

    return this.cultures.get(id);

  }

  public getAll(): Culture[] {

    return [...this.cultures.values()];

  }

  public remove(id: string): void {

    this.cultures.delete(id);

  }

}

const cultureEngine = new CultureEngine();

export default cultureEngine;