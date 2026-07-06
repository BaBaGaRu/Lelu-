/**
 * ==========================================================
 * LÉLUVERSE
 * ATMOSPHERE TYPES
 * ==========================================================
 *
 * Controls the atmosphere of every world.
 */

export type AtmosphereType =
  | "Earth"
  | "Thin"
  | "Dense"
  | "Crystal"
  | "Nebula"
  | "Dream"
  | "Digital"
  | "Celestial"
  | "Storm"
  | "Void";

export interface Atmosphere {

  id: string;

  name: string;

  type: AtmosphereType;

  pressure: number;

  oxygen: number;

  humidity: number;

  visibility: number;

  cloudDensity: number;

  haze: number;

  auroraStrength: number;

  breathable: boolean;

  active: boolean;

}