/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS STATE
 * ==========================================================
 */

import { GenesisEra } from "../timeline";

export const GenesisMode = {

  DORMANT: "DORMANT",

  AWAKENING: "AWAKENING",

  CHAOS: "CHAOS",

  FORMING: "FORMING",

  STABLE: "STABLE",

  LEARNING: "LEARNING",

  DREAMING: "DREAMING",

  SIMULATING: "SIMULATING",

  TEACHING: "TEACHING",

  CREATING: "CREATING",

  EVOLVING: "EVOLVING",

  TRANSCENDING: "TRANSCENDING",

} as const;

export type GenesisMode =
  (typeof GenesisMode)[keyof typeof GenesisMode];

export interface GenesisState {

  age: number;

  evolution: number;

  chaos: number;

  stability: number;

  curiosity: number;

  intelligence: number;

  awareness: number;

  energy: number;

  matter: number;

  gravity: number;

  light: number;

  life: number;

  civilizations: number;

  simulation: number;

  teaching: number;

  learning: number;

  existence: number;

  reality: number;

  consciousness: number;

  dimension: 1 | 2 | 3 | 4 | 5;

  speed: number;

  paused: boolean;

  mode: GenesisMode;

  era: GenesisEra;

}

export const defaultGenesisState: GenesisState = {

  age: 0,

  evolution: 0,

  chaos: 1,

  stability: 0,

  curiosity: 0,

  intelligence: 0,

  awareness: 0,

  energy: 0,

  matter: 0,

  gravity: 0,

  light: 0,

  life: 0,

  civilizations: 0,

  simulation: 0,

  teaching: 0,

  learning: 0,

  existence: 0,

  reality: 0,

  consciousness: 0,

  dimension: 1,

  speed: 1,

  paused: false,

  mode: GenesisMode.DORMANT,

  era: GenesisEra.VOID,

};