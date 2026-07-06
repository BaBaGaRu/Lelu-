/**
 * ==========================================================
 * LÉLUVERSE
 * PHYSICS TYPES
 * ==========================================================
 *
 * Controls the physical laws of every world.
 */

export type GravityMode =
  | "Earth"
  | "Moon"
  | "Zero"
  | "Heavy"
  | "Custom";

export interface PhysicsState {

  gravityMode: GravityMode;

  gravity: number;

  friction: number;

  airDensity: number;

  buoyancy: number;

  windResistance: number;

  elasticity: number;

  collision: boolean;

  fluidSimulation: boolean;

  active: boolean;

}