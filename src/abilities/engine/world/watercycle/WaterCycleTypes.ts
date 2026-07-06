/**
 * ==========================================================
 * LÉLUVERSE
 * WATER CYCLE TYPES
 * ==========================================================
 */

export type WaterState =
  | "Solid"
  | "Liquid"
  | "Vapor"
  | "Crystal"
  | "Energy"
  | "Dream";

export interface WaterCycle {

  id: string;

  evaporation: number;

  condensation: number;

  precipitation: number;

  runoff: number;

  infiltration: number;

  groundwater: number;

  riverFlow: number;

  oceanLevel: number;

  humidity: number;

  state: WaterState;

  active: boolean;

}