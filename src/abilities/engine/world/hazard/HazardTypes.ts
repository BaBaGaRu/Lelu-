/**
 * ==========================================================
 * LÉLUVERSE
 * HAZARD TYPES
 * ==========================================================
 */

export type HazardCategory =
  | "Natural"
  | "Biological"
  | "Environmental"
  | "Technological"
  | "Infrastructure"
  | "Cosmic"
  | "Temporal"
  | "Reality"
  | "Portal"
  | "Simulation";

export interface Hazard {

  id: string;

  name: string;

  description: string;

  category: HazardCategory;

  severity: number;

  probability: number;

  affectedWorld: string;

  affectedBiome?: string;

  active: boolean;

  contained: boolean;

  recoverable: boolean;

}