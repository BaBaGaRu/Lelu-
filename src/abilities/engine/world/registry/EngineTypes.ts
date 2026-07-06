/**
 * ==========================================================
 * LÉLUVERSE
 * ENGINE REGISTRY TYPES
 * ==========================================================
 */

export type EngineDomain =
  | "Core"
  | "Universal"
  | "World"
  | "Life"
  | "Mind"
  | "Knowledge"
  | "Interaction"
  | "Expression";

export interface EngineDefinition {

  id: string;

  name: string;

  version: string;

  domain: EngineDomain;

  initialized: boolean;

  enabled: boolean;

}