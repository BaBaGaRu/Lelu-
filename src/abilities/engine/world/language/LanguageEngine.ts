/**
 * ==========================================================
 * LÉLUVERSE
 * LANGUAGE ENGINE
 * ==========================================================
 *
 * Controls communication throughout the Léluverse.
 */

import type { Language } from "./LanguageTypes";

class LanguageEngine {

  private languages = new Map<string, Language>();

  public boot(): void {

    console.log("══════════════════════════════");

    console.log("LANGUAGE ENGINE ONLINE");

    console.log(`Languages : ${this.languages.size}`);

    console.log("══════════════════════════════");

  }

  public create(language: Language): void {

    this.languages.set(language.id, language);

  }

  public get(id: string): Language | undefined {

    return this.languages.get(id);

  }

  public getAll(): Language[] {

    return [...this.languages.values()];

  }

  public remove(id: string): void {

    this.languages.delete(id);

  }

}

const languageEngine = new LanguageEngine();

export default languageEngine;