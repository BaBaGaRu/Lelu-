/**
 * ==========================================================
 * LÉLU
 * REGISTER AI PROVIDERS
 * ==========================================================
 */

import AIProviderRegistry
  from "./tools/AIProviderRegistry";

import GroqProvider
  from "../providers/GroqProvider";

export default function registerAIProviders():
  AIProviderRegistry {

  const registry =
    new AIProviderRegistry();

  registry.register(

    new GroqProvider(),

  );

  return registry;

}