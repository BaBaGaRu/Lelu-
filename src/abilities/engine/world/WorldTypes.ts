/**
 * ==========================================================
 * LÉLUVERSE
 * WORLD TYPES
 * ==========================================================
 *
 * Defines the core data structures for the Léluverse.
 * Every engine interacts with these types.
 */

export type WorldTime =
  | "Dawn"
  | "Morning"
  | "Day"
  | "Evening"
  | "Night";

export type Season =
  | "Spring"
  | "Summer"
  | "Autumn"
  | "Winter";

export type BiomeType =
  | "Genesis Garden"
  | "Motherboard Forest"
  | "Ocean of Memory"
  | "Crystal Caverns"
  | "Nebula"
  | "Dream Archive"
  | "Engineering Forge"
  | "Living Observatory";

export interface WorldDNA {
  nature: number;
  technology: number;
  cosmos: number;
  water: number;
  fire: number;
  earth: number;
  air: number;
  crystal: number;
  lightning: number;
  creativity: number;
  harmony: number;
}

export interface WorldWeather {
  name: string;
  intensity: number;
  duration: number;
}

export interface WorldStats {
  evolution: number;
  activeMurals: number;
  activeAvatars: number;
  activeSpecies: number;
  discoveries: number;
  projects: number;
}

export interface WorldState {
  id: string;

  name: string;

  biome: BiomeType;

  time: WorldTime;

  season: Season;

  weather: WorldWeather;

  dna: WorldDNA;

  stats: WorldStats;
}