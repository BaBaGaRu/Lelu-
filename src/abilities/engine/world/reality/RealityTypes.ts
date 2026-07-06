/**
 * ==========================================================
 * LÉLUVERSE
 * REALITY TYPES
 * ==========================================================
 *
 * Reality determines how the Léluverse behaves,
 * moves and feels.
 */

export type RealityMode =
  | "Calm"
  | "Flow"
  | "Flying"
  | "Falling"
  | "Swimming"
  | "Orbit"
  | "Storm"
  | "Tornado"
  | "Dream"
  | "Psychedelic"
  | "ZeroGravity"
  | "Exploration";

export interface RealityState {

  mode: RealityMode;

  gravity: number;

  wind: number;

  current: number;

  motion: number;

  dreamIntensity: number;

  psychedelicIntensity: number;

  cameraSpeed: number;

  worldRotation: number;

  transitionSpeed: number;

  timeScale: number;

}