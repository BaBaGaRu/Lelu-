/**
 * ==========================================================
 * LÉLUVERSE
 * CIVILIZATION TYPES
 * ==========================================================
 *
 * Civilizations are living societies that evolve over time.
 */

export type CivilizationCategory =
  | "Historical"
  | "Modern"
  | "Future"
  | "Fantasy"
  | "Digital"
  | "Celestial"
  | "User"
  | "Lélu";

export interface Civilization {

  id: string;

  name: string;

  description: string;

  category: CivilizationCategory;

  universe: string;

  dimension: string;

  population: number;

  prosperity: number;

  knowledge: number;

  creativity: number;

  engineering: number;

  harmony: number;

  active: boolean;

  discovered: boolean;

  created: Date;

  related: string[];

}