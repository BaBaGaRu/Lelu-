/**
 * ==========================================================
 * LÉLUVERSE
 * CLIMATE TYPES
 * ==========================================================
 */

export type ClimateType =
  | "Tropical"
  | "Temperate"
  | "Desert"
  | "Polar"
  | "Mountain"
  | "Oceanic"
  | "Rainforest"
  | "Savanna"
  | "Tundra"
  | "Volcanic"
  | "Dream"
  | "Crystal"
  | "Celestial";

export interface Climate {

  id: string;

  name: string;

  type: ClimateType;

  averageTemperature: number;

  averageRainfall: number;

  humidity: number;

  windStrength: number;

  seasonalVariation: number;

  stability: number;

  active: boolean;

}