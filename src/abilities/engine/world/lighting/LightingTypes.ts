/**
 * ==========================================================
 * LÉLUVERSE
 * LIGHTING TYPES
 * ==========================================================
 *
 * Controls every light source throughout the Léluverse.
 */

export type LightingMode =
  | "Natural"
  | "Artificial"
  | "Aurora"
  | "Crystal"
  | "Celestial"
  | "Dream"
  | "Fire"
  | "Bioluminescent"
  | "Engineering"
  | "Dynamic";

export interface LightSource {

  id: string;

  name: string;

  mode: LightingMode;

  intensity: number;

  color: string;

  range: number;

  flicker: boolean;

  shadows: boolean;

  active: boolean;

}

export interface LightingState {

  globalBrightness: number;

  ambientLight: number;

  exposure: number;

  bloom: number;

  fogDensity: number;

  active: boolean;

}