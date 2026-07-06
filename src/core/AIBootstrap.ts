/**
 * ==========================================================
 * LÉLU
 * AI BOOTSTRAP
 * ==========================================================
 */

import AIManager from "./AIManager";

export default class AIBootstrap {

  static boot(): AIManager {

    return new AIManager();

  }

}