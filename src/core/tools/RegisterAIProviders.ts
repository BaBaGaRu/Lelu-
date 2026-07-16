/**
 * ==========================================================
 * LÉLU
 * REGISTER AI PROVIDERS
 * ==========================================================
 */

import AIProviderRegistry from "./AIProviderRegistry";

// AI Providers
// import OpenAIProvider from "../providers/OpenAIProvider";
// import OllamaProvider from "../providers/OllamaProvider";

export default function registerAIProviders(): AIProviderRegistry {
  const registry = new AIProviderRegistry();

  // Register AI providers here
  // registry.register(new OpenAIProvider());
  // registry.register(new OllamaProvider());

  return registry;
}