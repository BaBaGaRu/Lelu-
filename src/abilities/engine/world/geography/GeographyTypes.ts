/**
 * ==========================================================
 * LÉLUVERSE
 * GEOGRAPHY TYPES
 * ==========================================================
 *
 * Geography defines every physical location within the
 * Léluverse.
 */

export type GeographyCategory =
  | "World"
  | "Continent"
  | "Region"
  | "Biome"
  | "District"
  | "City"
  | "Village"
  | "Landmark"
  | "Temple"
  | "Museum"
  | "Forest"
  | "Mountain"
  | "Ocean"
  | "River"
  | "Island"
  | "Planet"
  | "Galaxy"
  | "Dimension";

export interface GeographyLocation {

  id: string;

  name: string;

  category: GeographyCategory;

  parent: string | null;

  discovered: boolean;

  exploration: number;

  connected: string[];

}