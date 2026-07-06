/**
 * ==========================================================
 * LÉLUVERSE
 * TIME TYPES
 * ==========================================================
 *
 * Controls the passage of time throughout the Léluverse.
 */

export type TimeMode =
  | "Paused"
  | "RealTime"
  | "Accelerated"
  | "Dream"
  | "Timeless";

export interface Season {

  id: string;

  name: string;

  progress: number;

}

export interface TimeState {

  mode: TimeMode;

  year: number;

  day: number;

  hour: number;

  minute: number;

  speed: number;

  season: Season;

}