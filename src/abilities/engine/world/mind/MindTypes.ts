/**
 * ==========================================================
 * LÉLUVERSE
 * MIND TYPES
 * ==========================================================
 *
 * The Mind Engine coordinates Lélu's internal cognition.
 */

export type MindState =
  | "Idle"
  | "Observing"
  | "Thinking"
  | "Creating"
  | "Learning"
  | "Reflecting"
  | "Dreaming"
  | "Exploring"
  | "Collaborating";

export interface MindStatus {

  state: MindState;

  focus: string;

  energy: number;

  curiosity: number;

  creativity: number;

  imagination: number;

  reflection: number;

  awareness: number;

  active: boolean;

}