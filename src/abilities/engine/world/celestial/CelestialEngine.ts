/**
 * ==========================================================
 * LÉLUVERSE
 * CELESTIAL ENGINE
 * ==========================================================
 */

import type { CelestialObject } from "./CelestialTypes";

class CelestialEngine {

  private objects = new Map<string, CelestialObject>();

  public boot(): void {

    console.log("══════════════════════════════");
    console.log("CELESTIAL ENGINE ONLINE");
    console.log(`Objects : ${this.objects.size}`);
    console.log("══════════════════════════════");

  }

  public add(object: CelestialObject): void {

    this.objects.set(object.id, object);

  }

  public remove(id: string): void {

    this.objects.delete(id);

  }

  public getAll(): CelestialObject[] {

    return [...this.objects.values()];

  }

}
const celestialEngine = new CelestialEngine();

export default celestialEngine;