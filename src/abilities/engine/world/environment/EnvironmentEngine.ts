/**
 * ==========================================================
 * LÉLUVERSE
 * ENVIRONMENT ENGINE
 * ==========================================================
 *
 * Synchronizes every environmental engine.
 */

import type { EnvironmentState } from "./EnvironmentTypes";

class EnvironmentEngine {

  private state: EnvironmentState | null = null;

  public boot(): void {

    console.log("══════════════════════════════");

    console.log("ENVIRONMENT ENGINE ONLINE");

    console.log("World synchronized.");

    console.log("══════════════════════════════");

  }

  public load(state: EnvironmentState): void {

    this.state = state;

  }

  public getState(): EnvironmentState | null {

    return this.state;

  }

}

const environmentEngine = new EnvironmentEngine();

export default environmentEngine;