/**
 * ==========================================================
 * LÉLUVERSE
 * BIOME TYPES
 * ==========================================================
 *
 * Biomes define the living environments of every world.
 */

export type BiomeType =
  | "Forest"
  | "Jungle"
  | "Desert"
  | "Mountain"
  | "Ocean"
  | "River"
  | "Lake"
  | "Wetland"
  | "Tundra"
  | "Savanna"
  | "Grassland"
  | "Volcanic"
  | "Cave"
  | "Sky"
  | "Crystal"
  | "Mechanical"
  | "Digital"
  | "Celestial"
  | "Dream"
  | "Memory";

export interface Biome {

  id: string;

  name: string;

  description: string;

  type: BiomeType;

  climate: string;

  elevation: number;

  fertility: number;

  biodiversity: number;

  danger: number;

  exploration: number;

  discovered: boolean;

  active: boolean;

}