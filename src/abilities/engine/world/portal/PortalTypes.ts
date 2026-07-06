/**
 * ==========================================================
 * LÉLUVERSE
 * PORTAL TYPES
 * ==========================================================
 *
 * Portals connect every part of the Léluverse.
 */

export type PortalType =
  | "World"
  | "Time"
  | "Memory"
  | "Dream"
  | "Knowledge"
  | "Creation"
  | "Project"
  | "Research"
  | "Relic"
  | "Civilization"
  | "Theme"
  | "Gallery"
  | "Companion"
  | "Universe";

export interface Portal {

  id: string;

  name: string;

  type: PortalType;

  destination: string;

  unlocked: boolean;

  active: boolean;

  stability: number;

  created: Date;

  related: string[];

}