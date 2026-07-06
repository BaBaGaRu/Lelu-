/**
 * ==========================================================
 * LÉLU
 * AI RUNTIME
 * ==========================================================
 */

import AICore from "./AICore";
import AIRouter from "./AIRouter";

export default class AIRuntime {

  readonly core =
    new AICore();

  readonly router =
    new AIRouter();

}