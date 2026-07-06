/**
 * ==========================================================
 * LÉLUVERSE
 * SKY TYPES
 * ==========================================================
 */

export type SkyType =
  | "Earth"
  | "Dream"
  | "Nebula"
  | "Aurora"
  | "Crystal"
  | "Digital"
  | "Celestial"
  | "Storm"
  | "Void";

export interface SkyState {

  type: SkyType;

  cloudCoverage: number;

  starVisibility: number;

  auroraIntensity: number;

  nebulaIntensity: number;

  moonVisibility: number;

  sunVisibility: number;

  rainbowChance: number;

  active: boolean;

}