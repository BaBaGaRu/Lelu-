/**
 * ==========================================================
 * LÉLU
 * RESPONSE PATTERN
 * ==========================================================
 */

export default interface ResponsePattern {

  /**
   * Unique identifier.
   */
  id: string;

  /**
   * Original user message.
   */
  prompt: string;

  /**
   * LÉLU's response.
   */
  response: string;

  /**
   * High-level intent.
   */
  intent: string;

  /**
   * Important words extracted
   * from the prompt.
   */
  keywords: string[];

  /**
   * Additional information.
   */
  context: Record<
    string,
    unknown
  >;

  /**
   * Confidence score.
   * Range:
   * 0.0 - 1.0
   */
  confidence: number;

  /**
   * Number of successful uses.
   */
  successfulUses: number;

  /**
   * Number of failed uses.
   */
  failedUses: number;

  /**
   * Creation timestamp.
   */
  createdAt: number;

  /**
   * Last update timestamp.
   */
  updatedAt: number;

}