/**
 * ==========================================================
 * LÉLUVERSE
 * RESOURCE TYPES
 * ==========================================================
 */

export type ResourceCategory =
  | "Mineral"
  | "Metal"
  | "Crystal"
  | "Wood"
  | "Plant"
  | "Water"
  | "Energy"
  | "Food"
  | "Knowledge"
  | "Artifact"
  | "Technology"
  | "Fabric"
  | "Construction"
  | "Currency";

export interface Resource {

  id: string;

  name: string;

  description: string;

  category: ResourceCategory;

  quantity: number;

  quality: number;

  renewable: boolean;

  rarity: number;

  value: number;

  active: boolean;

}