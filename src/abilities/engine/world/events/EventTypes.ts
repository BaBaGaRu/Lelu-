/**
 * ==========================================================
 * LÉLUVERSE
 * NATURAL EVENT TYPES
 * ==========================================================
 */

export type EventCategory =
  | "Weather"
  | "Geological"
  | "Celestial"
  | "Ecological"
  | "Seasonal"
  | "Ocean"
  | "Atmospheric"
  | "Astronomical"
  | "Fantasy";

export interface NaturalEvent {

  id: string;

  name: string;

  description: string;

  category: EventCategory;

  intensity: number;

  duration: number;

  probability: number;

  worldId: string;

  biomeId?: string;

  active: boolean;

}