/**
 * ==========================================================
 * LÉLUVERSE
 * ENVIRONMENT TYPES
 * ==========================================================
 */

export interface EnvironmentState {

  worldId: string;

  biomeId: string;

  terrainId: string;

  atmosphereId: string;

  weatherId: string;

  seasonId: string;

  chronologyId: string;

  lightingId: string;

  oceanIds: string[];

  riverIds: string[];

  ecologyIds: string[];

  active: boolean;

}