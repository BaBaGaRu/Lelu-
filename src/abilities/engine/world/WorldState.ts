/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS WORLD
 * ==========================================================
 *
 * The first world of the Léluverse.
 * Every future world grows from this origin.
 */

import type { WorldState } from "./WorldTypes";

export const GenesisWorld: WorldState = {
  id: "genesis-001",

  name: "Genesis Garden",

  biome: "Genesis Garden",

  time: "Morning",

  season: "Spring",

  weather: {
    name: "Calm",
    intensity: 0.2,
    duration: 0,
  },

  dna: {
    nature: 60,
    technology: 40,
    cosmos: 35,
    water: 45,
    fire: 15,
    earth: 50,
    air: 35,
    crystal: 20,
    lightning: 10,
    creativity: 90,
    harmony: 100,
  },

  stats: {
    evolution: 0,
    activeMurals: 0,
    activeAvatars: 0,
    activeSpecies: 0,
    discoveries: 0,
    projects: 0,
  },
};

export default GenesisWorld;