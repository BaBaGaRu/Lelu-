/**
 * ==========================================================
 * LÉLUVERSE
 * AGE ENGINE
 * ==========================================================
 */

import type { Age } from "./AgeTypes";

class AgeEngine {

  private ages = new Map<string, Age>();

  private current = "Genesis";

  public boot(): void {

    console.log("══════════════════════════════");

    console.log("AGE ENGINE ONLINE");

    console.log(`Age : ${this.current}`);

    console.log("══════════════════════════════");

  }

  public create(age: Age): void {

    this.ages.set(age.id, age);

  }

  public setCurrent(name: string): void {

    this.current = name;

  }

  public getCurrent(): string {

    return this.current;

  }

  public getAll(): Age[] {

    return [...this.ages.values()];

  }

}

const ageEngine = new AgeEngine();

export default ageEngine;