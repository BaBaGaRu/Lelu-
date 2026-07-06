/**
 * ==========================================================
 * LÉLUVERSE
 * PHYSICS ENGINE
 * ==========================================================
 */

import type { PhysicsState } from "./PhysicsTypes";

class PhysicsEngine {

  private state: PhysicsState = {

    gravityMode: "Earth",

    gravity: 9.81,

    friction: 1,

    airDensity: 1,

    buoyancy: 1,

    windResistance: 1,

    elasticity: 0.5,

    collision: true,

    fluidSimulation: true,

    active: true,

  };

  public boot(): void {

    console.log("══════════════════════════════");

    console.log("PHYSICS ENGINE ONLINE");

    console.log(`Gravity : ${this.state.gravityMode}`);

    console.log("══════════════════════════════");

  }

  public getState(): PhysicsState {

    return this.state;

  }

  public setState(state: PhysicsState): void {

    this.state = state;

  }

}

const physicsEngine = new PhysicsEngine();

export default physicsEngine;