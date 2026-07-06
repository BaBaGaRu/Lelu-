/**
 * ==========================================================
 * LÉLUVERSE
 * THEME ENGINE
 * ==========================================================
 *
 * Controls the visual identity of the Léluverse.
 */

import type { Theme, ThemeDNA } from "./ThemeTypes";

class ThemeEngine {

  private themes = new Map<string, Theme>();

  private dna: ThemeDNA = {

    nature: 50,

    motherboard: 50,

    galaxy: 40,

    crystal: 25,

    ocean: 20,

    fire: 15,

    storm: 15,

    sacredGeometry: 10,

    history: 20,

    relics: 10,

    murals: 30,

    creativity: 80,

    dreams: 40,

  };

  public boot(): void {

    console.log("══════════════════════════════");
    console.log("THEME ENGINE ONLINE");
    console.log(`Themes : ${this.themes.size}`);
    console.log("══════════════════════════════");

  }

  public add(theme: Theme): void {

    this.themes.set(theme.id, theme);

  }

  public remove(id: string): void {

    this.themes.delete(id);

  }

  public getThemes(): Theme[] {

    return [...this.themes.values()];

  }

  public getDNA(): ThemeDNA {

    return this.dna;

  }

  public setDNA(dna: ThemeDNA): void {

    this.dna = dna;

  }

}

const themeEngine = new ThemeEngine();

export default themeEngine;