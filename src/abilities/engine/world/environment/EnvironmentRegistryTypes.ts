/**
 * ==========================================================
 * LÉLUVERSE
 * ENVIRONMENT REGISTRY TYPES
 * ==========================================================
 */

export interface WorldEnvironment {

  worldId: string;

  geographyId: string;

  climateId: string;

  atmosphereId: string;

  skyId: string;

  weatherId: string;

  terrainId: string;

  biomeId: string;

  oceanIds: string[];

  riverIds: string[];

  ecologyIds: string[];

  resourceIds: string[];

  eventIds: string[];

  hazardIds: string[];

  seasonId: string;

  chronologyId: string;

  lightingId: string;

  active: boolean;

}