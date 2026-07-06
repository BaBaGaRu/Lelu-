/**
 * ==========================================================
 * LÉLUVERSE
 * LANGUAGE TYPES
 * ==========================================================
 *
 * Languages define communication throughout the Léluverse.
 */

export type LanguageCategory =
  | "Spoken"
  | "Written"
  | "Symbolic"
  | "Glyph"
  | "Mathematical"
  | "Musical"
  | "Visual"
  | "Digital"
  | "Ancient"
  | "Constructed";

export interface Language {

  id: string;

  name: string;

  description: string;

  category: LanguageCategory;

  civilization: string;

  alphabet: string[];

  symbols: string[];

  fluency: number;

  active: boolean;

  created: Date;

  related: string[];

}