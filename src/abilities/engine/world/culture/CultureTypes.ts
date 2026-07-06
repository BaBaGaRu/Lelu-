/**
 * ==========================================================
 * LÉLUVERSE
 * CULTURE TYPES
 * ==========================================================
 *
 * Cultures define the identity and expression of
 * civilizations throughout the Léluverse.
 */

export type CultureCategory =
  | "Art"
  | "Music"
  | "Architecture"
  | "Language"
  | "Engineering"
  | "Science"
  | "Nature"
  | "Spiritual"
  | "Historical"
  | "Festival"
  | "Cuisine"
  | "Fashion"
  | "Philosophy"
  | "Education";

export interface Culture {

  id: string;

  name: string;

  description: string;

  category: CultureCategory;

  civilization: string;

  influence: number;

  creativity: number;

  harmony: number;

  discovered: boolean;

  active: boolean;

  created: Date;

  related: string[];

}