/**
 * ==========================================================
 * LÉLUVERSE
 * MIND ENGINE
 * ==========================================================
 *
 * Coordinates Lélu's internal systems.
 */

import type {
  MindState,
  MindStatus,
} from "./MindTypes";

class MindEngine {

  private status: MindStatus = {

    state: "Idle",

    focus: "Genesis",

    energy: 100,

    curiosity: 100,

    creativity: 100,

    imagination: 100,

    reflection: 100,

    awareness: 100,

    active: true,

  };

  public boot(): void {

    console.log("══════════════════════════════");

    console.log("MIND ENGINE ONLINE");

    console.log(`State : ${this.status.state}`);

    console.log("══════════════════════════════");

  }

  public setState(state: MindState): void {

    this.status.state = state;

  }

  public getState(): MindState {

    return this.status.state;

  }

  public getStatus(): MindStatus {

    return this.status;

  }

}

const mindEngine = new MindEngine();

export default mindEngine;