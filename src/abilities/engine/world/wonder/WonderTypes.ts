/**
 * ==========================================================
 * LÉLUVERSE
 * WONDER TYPES
 * ==========================================================
 *
 * Wonder drives curiosity, discovery and exploration.
 */

export type WonderCategory =
  | "Question"
  | "Observation"
  | "Pattern"
  | "Connection"
  | "Discovery"
  | "Possibility"
  | "Experiment"
  | "Beauty"
  | "Mystery";

export interface Wonder {

  id: string;

  title: string;

  description: string;

  category: WonderCategory;

  curiosity: number;

  confidence: number;

  created: Date;

  active: boolean;

  related: string[];

}