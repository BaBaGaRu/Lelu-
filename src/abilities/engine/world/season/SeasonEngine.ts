/**
 * ==========================================================
 * LÉLUVERSE
 * SEASON ENGINE
 * ==========================================================
 */

import type { Season } from "./SeasonTypes";

class SeasonEngine {

  private seasons = new Map<string, Season>();

  private current = "Spring";

  public boot(): void {

    console.log("══════════════════════════════");

    console.log("SEASON ENGINE ONLINE");

    console.log(`Season : ${this.current}`);

    console.log("══════════════════════════════");

  }

  public create(season: Season): void {

    this.seasons.set(season.id, season);

  }

  public setCurrent(name: string): void {

    this.current = name;

  }

  public getCurrent(): string {

    return this.current;

  }

  public getAll(): Season[] {

    return [...this.seasons.values()];

  }

}

const seasonEngine = new SeasonEngine();

export default seasonEngine;