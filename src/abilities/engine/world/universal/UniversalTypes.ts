/**
 * ==========================================================
 * LÉLUVERSE
 * UNIVERSAL TYPES
 * ==========================================================
 *
 * The Universal Engine maintains the balance and harmony
 * of the Léluverse.
 */

export interface UniversalLaw {

  id: string;

  name: string;

  description: string;

  immutable: boolean;

  enabled: boolean;

}

export interface UniversalState {

  age: number;

  universes: number;

  worlds: number;

  civilizations: number;

  creations: number;

  avatars: number;

  species: number;

  activeLaws: number;

  harmony: number;

  evolution: number;

}