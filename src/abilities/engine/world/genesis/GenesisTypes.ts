/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS TYPES
 * ==========================================================
 *
 * Every living thing, structure, mural, and idea in the
 * Léluverse begins as a Genesis Creation.
 */

export type GenesisCategory =
  | "Avatar"
  | "Species"
  | "Biome"
  | "District"
  | "Mural"
  | "Structure"
  | "Artifact"
  | "Weather"
  | "Companion"
  | "Idea";

export type Creator =
  | "User"
  | "Lélu"
  | "Shared";

export interface GenesisDNA {

  nature: number;

  technology: number;

  cosmos: number;

  creativity: number;

  harmony: number;

}

export interface GenesisCreation {

  id: string;

  name: string;

  category: GenesisCategory;

  creator: Creator;

  description: string;

  createdAt: Date;

  evolution: number;

  active: boolean;

  dna: GenesisDNA;

  tags: string[];

}