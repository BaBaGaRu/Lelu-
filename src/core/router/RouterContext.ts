/**
 * ==========================================================
 * LÉLU
 * ROUTER CONTEXT
 * ==========================================================
 */

import type Brain
  from "../../brain/Brain";

import type ProviderRegistry
  from "../ProviderRegistry";

import type AIProviderRegistry
  from "../AIProviderRegistry";

import type ExecutionLogger
  from "../ExecutionLogger";

import type {
  AIRequest,
} from "../../providers/AIProvider";

export default interface RouterContext {

  /**
   * Incoming request.
   */
  request:
    AIRequest;

  /**
   * Processing start time.
   */
  started:
    number;

  /**
   * Memory brain.
   */
  brain:
    Brain;

  /**
   * Knowledge providers.
   */
  knowledgeProviders:
    ProviderRegistry;

  /**
   * AI providers.
   */
  aiProviders:
    AIProviderRegistry;

  /**
   * Runtime logger.
   */
  logger:
    ExecutionLogger;

}