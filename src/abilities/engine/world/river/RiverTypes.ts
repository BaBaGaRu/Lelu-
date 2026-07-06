/**
 * ==========================================================
 * LÉLUVERSE
 * RIVER TYPES
 * ==========================================================
 *
 * Rivers transport life, knowledge, memories,
 * energy and resources throughout the Léluverse.
 */

export type RiverType =
  | "Freshwater"
  | "Underground"
  | "Crystal"
  | "Memory"
  | "Dream"
  | "Energy"
  | "Lava"
  | "Sky";

export interface River {

  id: string;

  name: string;

  description: string;

  type: RiverType;

  source: string;

  destination: string;

  length: number;

  depth: number;

  flowRate: number;

  purity: number;

  active: boolean;

}