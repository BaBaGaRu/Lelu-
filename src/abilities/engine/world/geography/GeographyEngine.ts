/**
 * ==========================================================
 * LÉLUVERSE
 * GEOGRAPHY ENGINE
 * ==========================================================
 */

import type { GeographyLocation } from "./GeographyTypes";

class GeographyEngine {

  private locations = new Map<string, GeographyLocation>();

  public boot(): void {

    console.log("══════════════════════════════");

    console.log("GEOGRAPHY ENGINE ONLINE");

    console.log(`Locations : ${this.locations.size}`);

    console.log("══════════════════════════════");

  }

  public add(location: GeographyLocation): void {

    this.locations.set(location.id, location);

  }

  public get(id: string): GeographyLocation | undefined {

    return this.locations.get(id);

  }

  public getAll(): GeographyLocation[] {

    return [...this.locations.values()];

  }

  public remove(id: string): void {

    this.locations.delete(id);

  }

}

const geographyEngine = new GeographyEngine();

export default geographyEngine;