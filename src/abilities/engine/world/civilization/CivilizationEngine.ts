/**
 * ==========================================================
 * LÉLUVERSE
 * CIVILIZATION ENGINE
 * ==========================================================
 *
 * Manages every civilization inside the Léluverse.
 */

import type { Civilization } from "./CivilizationTypes";

class CivilizationEngine {

  private civilizations = new Map<string, Civilization>();

  public boot(): void {

    console.log("══════════════════════════════");

    console.log("CIVILIZATION ENGINE ONLINE");

    console.log(`Civilizations : ${this.civilizations.size}`);

    console.log("══════════════════════════════");

  }

  public create(civilization: Civilization): void {

    this.civilizations.set(civilization.id, civilization);

  }

  public get(id: string): Civilization | undefined {

    return this.civilizations.get(id);

  }

  public getAll(): Civilization[] {

    return [...this.civilizations.values()];

  }

  public remove(id: string): void {

    this.civilizations.delete(id);

  }

}

const civilizationEngine = new CivilizationEngine();

export default civilizationEngine;