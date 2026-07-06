/**
 * ==========================================================
 * LÉLUVERSE
 * UNIVERSAL ENGINE
 * ==========================================================
 *
 * The highest engine beneath the Kernel.
 *
 * It does not create.
 *
 * It governs.
 *
 * It maintains harmony between every engine,
 * every world, and every creation.
 */

import type {
  UniversalLaw,
  UniversalState,
} from "./UniversalTypes";

class UniversalEngine {

  private laws = new Map<string, UniversalLaw>();

  private state: UniversalState = {

    age: 0,

    universes: 1,

    worlds: 1,

    civilizations: 0,

    creations: 0,

    avatars: 0,

    species: 0,

    activeLaws: 0,

    harmony: 100,

    evolution: 0,

  };

  public boot(): void {

    console.log("══════════════════════════════");

    console.log("UNIVERSAL ENGINE ONLINE");

    console.log(`Worlds : ${this.state.worlds}`);

    console.log(`Harmony : ${this.state.harmony}`);

    console.log("══════════════════════════════");

  }

  public addLaw(law: UniversalLaw): void {

    this.laws.set(law.id, law);

    this.state.activeLaws = this.laws.size;

  }

  public getLaws(): UniversalLaw[] {

    return [...this.laws.values()];

  }

  public getState(): UniversalState {

    return this.state;

  }

}
const universalEngine = new UniversalEngine();

export default universalEngine;