/**
 * ==========================================================
 * LÉLU
 * AI PROVIDERS
 * ==========================================================
 */

export const AIProvider = {

  GROQ: "groq",

  GOOGLE: "google",

  OPENROUTER: "openrouter",

  CEREBRAS: "cerebras",

  MISTRAL: "mistral",

  FIREWORKS: "fireworks",

} as const;

export type AIProvider =
  (typeof AIProvider)[keyof typeof AIProvider];