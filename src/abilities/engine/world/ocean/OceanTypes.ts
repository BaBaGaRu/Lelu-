/**
 * ==========================================================
 * LÉLUVERSE
 * OCEAN TYPES
 * ==========================================================
 *
 * Oceans are living systems connecting worlds,
 * climates and ecosystems.
 */

export type OceanType =
  | "Freshwater"
  | "Saltwater"
  | "Crystal"
  | "Memory"
  | "Dream"
  | "Celestial"
  | "Underground"
  | "Infinite";

export interface Ocean {

  id: string;

  name: string;

  description: string;

  type: OceanType;

  depth: number;

  temperature: number;

  salinity: number;

  currentStrength: number;

  waveHeight: number;

  biodiversity: number;

  active: boolean;

}