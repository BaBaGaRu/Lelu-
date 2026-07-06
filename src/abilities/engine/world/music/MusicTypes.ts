/**
 * ==========================================================
 * LÉLUVERSE
 * MUSIC TYPES
 * ==========================================================
 *
 * Music is a living part of the Léluverse.
 */

export type MusicMood =
  | "Peaceful"
  | "Creative"
  | "Focused"
  | "Dreaming"
  | "Wonder"
  | "Epic"
  | "Mystical"
  | "Nature"
  | "Engineering"
  | "Exploration";

export interface MusicTrack {

  id: string;

  title: string;

  composer: string;

  mood: MusicMood;

  bpm: number;

  volume: number;

  looping: boolean;

  active: boolean;

  related: string[];

}

export interface MusicState {

  masterVolume: number;

  ambienceVolume: number;

  effectsVolume: number;

  adaptive: boolean;

  currentMood: MusicMood;

}