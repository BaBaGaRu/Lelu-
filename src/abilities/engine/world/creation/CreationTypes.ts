/**
 * ==========================================================
 * LÉLUVERSE
 * CREATION TYPES
 * ==========================================================
 *
 * Every meaningful thing inside the Léluverse is a Creation.
 */

export type CreationCategory =
  | "Idea"
  | "Conversation"
  | "Memory"
  | "Project"
  | "Blueprint"
  | "Research"
  | "Skill"
  | "Mural"
  | "Avatar"
  | "Species"
  | "District"
  | "Relic"
  | "Theme"
  | "World"
  | "Artifact"
  | "Goal";

export type CreationStatus =
  | "Seed"
  | "Growing"
  | "Active"
  | "Masterpiece"
  | "Archived";

export interface Creation {

  id: string;

  title: string;

  description: string;

  category: CreationCategory;

  status: CreationStatus;

  created: Date;

  updated: Date;

  importance: number;

  energy: number;

  evolution: number;

  tags: string[];

  related: string[];

}