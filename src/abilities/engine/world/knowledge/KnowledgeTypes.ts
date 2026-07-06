/**
 * ==========================================================
 * LÉLUVERSE
 * KNOWLEDGE TYPES
 * ==========================================================
 *
 * Everything Lélu understands becomes part of the
 * Knowledge Graph.
 */

export type KnowledgeCategory =
  | "Conversation"
  | "Memory"
  | "Idea"
  | "Project"
  | "Research"
  | "Blueprint"
  | "Photo"
  | "Video"
  | "Audio"
  | "Person"
  | "Place"
  | "Relic"
  | "Theme"
  | "Species"
  | "Avatar"
  | "Skill"
  | "Goal"
  | "Book"
  | "Website"
  | "Creation";

export interface KnowledgeNode {

  id: string;

  title: string;

  category: KnowledgeCategory;

  description: string;

  created: Date;

  updated: Date;

  importance: number;

  confidence: number;

  tags: string[];

  links: string[];

}