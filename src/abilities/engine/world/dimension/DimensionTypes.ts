/**
 * ==========================================================
 * LÉLUVERSE
 * DIMENSION TYPES
 * ==========================================================
 *
 * Dimensions define different realities with unique laws.
 */

export type DimensionType =
  | "Physical"
  | "Digital"
  | "Dream"
  | "Memory"
  | "Knowledge"
  | "Creation"
  | "Spirit"
  | "Celestial"
  | "Temporal"
  | "Infinite";

export interface Dimension {

  id: string;

  name: string;

  description: string;

  type: DimensionType;

  active: boolean;

  discovered: boolean;

  accessible: boolean;

  stability: number;

  universes: string[];

}