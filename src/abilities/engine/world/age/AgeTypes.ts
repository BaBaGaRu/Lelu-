/**
 * ==========================================================
 * LÉLUVERSE
 * AGE TYPES
 * ==========================================================
 *
 * Ages define the evolution of a universe.
 */

export type AgeType =
  | "Genesis"
  | "Origins"
  | "Discovery"
  | "Growth"
  | "Innovation"
  | "Expansion"
  | "Exploration"
  | "Enlightenment"
  | "Harmony"
  | "Ascension"
  | "Cosmic"
  | "Infinite";

export interface Age {

  id: string;

  name: string;

  type: AgeType;

  description: string;

  progress: number;

  completed: boolean;

  active: boolean;

}