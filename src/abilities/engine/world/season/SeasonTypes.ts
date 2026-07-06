/**
 * ==========================================================
 * LÉLUVERSE
 * SEASON TYPES
 * ==========================================================
 *
 * Seasons govern long-term environmental change.
 */

export type SeasonType =
  | "Spring"
  | "Summer"
  | "Autumn"
  | "Winter"
  | "Monsoon"
  | "Dry"
  | "Aurora"
  | "Bloom"
  | "Harvest"
  | "Genesis"
  | "Dream"
  | "Celestial";

export interface Season {

  id: string;

  name: string;

  type: SeasonType;

  temperatureModifier: number;

  rainfallModifier: number;

  daylightModifier: number;

  growthModifier: number;

  migrationModifier: number;

  active: boolean;

}