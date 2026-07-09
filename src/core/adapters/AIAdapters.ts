/**
 * ==========================================================
 * LÉLU
 * AI ADAPTER
 *
 * Base contract for every AI provider.
 * ==========================================================
 */

export default interface AIAdapter {

  chat(
    prompt: string,
  ): Promise<string>;

}