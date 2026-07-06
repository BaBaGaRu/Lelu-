/**
 * ==========================================================
 * LÉLUVERSE
 * ECOLOGY TYPES
 * ==========================================================
 *
 * Every living ecosystem belongs here.
 */

export type EcologyCategory =
  | "Tree"
  | "Plant"
  | "Flower"
  | "Fungus"
  | "Grass"
  | "Vine"
  | "Animal"
  | "Bird"
  | "Fish"
  | "Insect"
  | "Pollinator"
  | "Pest"
  | "Microbe"
  | "Spirit"
  | "Fantasy";

export interface EcologyLife {

  id: string;

  name: string;

  category: EcologyCategory;

  biome: string;

  population: number;

  health: number;

  growth: number;

  active: boolean;

  related: string[];

}