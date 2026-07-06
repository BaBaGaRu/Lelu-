/**
 * ==========================================================
 * LÉLUVERSE
 * EVOLUTION TYPES
 * ==========================================================
 *
 * Evolution controls how the Léluverse changes over time.
 * Every living system evolves through this engine.
 */

export type EvolutionState =
  | "Dormant"
  | "Growing"
  | "Blooming"
  | "Transforming"
  | "Legendary";

export interface EvolutionNode {

  id: string;

  name: string;

  type: string;

  stage: EvolutionState;

  experience: number;

  level: number;

  growthRate: number;

  lastUpdated: Date;

  active: boolean;

}