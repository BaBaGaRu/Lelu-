/**
 * ==========================================================
 * LÉLUVERSE
 * CHRONOLOGY TYPES
 * ==========================================================
 *
 * Governs the passage of time throughout the Léluverse.
 */

export type TimeOfDay =
  | "Dawn"
  | "Morning"
  | "Noon"
  | "Afternoon"
  | "Sunset"
  | "Dusk"
  | "Night"
  | "Midnight";

export type LunarPhase =
  | "New"
  | "WaxingCrescent"
  | "FirstQuarter"
  | "WaxingGibbous"
  | "Full"
  | "WaningGibbous"
  | "LastQuarter"
  | "WaningCrescent";

export interface ChronologyState {

  year: number;

  month: number;

  day: number;

  hour: number;

  minute: number;

  second: number;

  timeOfDay: TimeOfDay;

  lunarPhase: LunarPhase;

  daylight: number;

  active: boolean;

}