/**
 * ==========================================================
 * LÉLUVERSE
 * MULTIVERSE TYPES
 * ==========================================================
 *
 * The Multiverse contains every universe.
 */

export interface Universe {

  id: string;

  name: string;

  description: string;

  active: boolean;

  discovered: boolean;

  created: Date;

  evolution: number;

  harmony: number;

  worlds: string[];

}

export interface MultiverseState {

  universes: number;

  activeUniverse: string;

  discoveredUniverses: number;

}