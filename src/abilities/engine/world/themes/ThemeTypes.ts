/**
 * ==========================================================
 * LÉLUVERSE
 * THEME TYPES
 * ==========================================================
 *
 * Themes are living influences.
 * They blend together to form the active Léluverse.
 */

export interface Theme {

  id: string;

  name: string;

  description: string;

  weight: number;

  enabled: boolean;

}

export interface ThemeDNA {

  nature: number;

  motherboard: number;

  galaxy: number;

  crystal: number;

  ocean: number;

  fire: number;

  storm: number;

  sacredGeometry: number;

  history: number;

  relics: number;

  murals: number;

  creativity: number;

  dreams: number;

}