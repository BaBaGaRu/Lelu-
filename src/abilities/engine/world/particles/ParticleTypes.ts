/**
 * ==========================================================
 * LÉLUVERSE
 * PARTICLE TYPES
 * ==========================================================
 *
 * Every visible particle represents information,
 * thought, memory or energy.
 */

export type ParticleType =
  | "Thought"
  | "Memory"
  | "Idea"
  | "Conversation"
  | "Knowledge"
  | "Creation"
  | "Emotion"
  | "Voice"
  | "Energy"
  | "Star"
  | "Seed"
  | "Relic"
  | "Blueprint"
  | "Dream";

export interface Particle {

  id: string;

  type: ParticleType;

  x: number;

  y: number;

  z: number;

  size: number;

  energy: number;

  brightness: number;

  velocity: number;

  active: boolean;

  related: string[];

}