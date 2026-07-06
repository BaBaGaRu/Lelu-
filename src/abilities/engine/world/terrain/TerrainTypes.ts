/**
 * ==========================================================
 * LÉLUVERSE
 * TERRAIN TYPES
 * ==========================================================
 *
 * Terrain forms the landscape of every world.
 */

export type TerrainType =
  | "Plain"
  | "Hill"
  | "Mountain"
  | "Valley"
  | "Cliff"
  | "Plateau"
  | "Canyon"
  | "Volcano"
  | "Island"
  | "Beach"
  | "Cave"
  | "Crystal"
  | "Floating"
  | "Mechanical"
  | "Dream";

export interface Terrain {

  id: string;

  name: string;

  type: TerrainType;

  elevation: number;

  roughness: number;

  fertility: number;

  stability: number;

  erosion: number;

  traversable: boolean;

  active: boolean;

}