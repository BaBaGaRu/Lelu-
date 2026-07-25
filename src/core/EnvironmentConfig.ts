/**
 * ==========================================================
 * LÉLU
 * ENVIRONMENT CONFIG
 * ==========================================================
 */

export interface EnvironmentConfig {
  appName: string;
  environment: string;
  version: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
  groqApiKey: string;
  geminiApiKey: string;
  cerebrasApiKey: string;
  mistralApiKey: string;
  openRouterApiKey: string;
  fireworksApiKey: string;
  memoryProvider: string;
  enableVoice: boolean;
  enableKnowledge: boolean;
  logLevel: string;
}

export default function getEnvironmentConfig(): EnvironmentConfig {
  return {
    appName: import.meta.env.VITE_APP_NAME ?? "Lelu",
    environment: import.meta.env.VITE_APP_ENV ?? "development",
    version: import.meta.env.VITE_APP_VERSION ?? "1.0.0",
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL?.trim() ?? "",
    supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ?? "",
    groqApiKey: import.meta.env.VITE_GROQ_API_KEY?.trim() ?? "",
    geminiApiKey: import.meta.env.VITE_GEMINI_API_KEY?.trim() ?? "",
    cerebrasApiKey: import.meta.env.VITE_CEREBRAS_API_KEY?.trim() ?? "",
    mistralApiKey: import.meta.env.VITE_MISTRAL_API_KEY?.trim() ?? "",
    openRouterApiKey: import.meta.env.VITE_OPENROUTER_API_KEY?.trim() ?? "",
    fireworksApiKey: import.meta.env.VITE_FIREWORKS_API_KEY?.trim() ?? "",
    memoryProvider: import.meta.env.VITE_MEMORY_PROVIDER ?? "supabase",
    enableVoice: true,
    enableKnowledge: true,
    logLevel: import.meta.env.VITE_LOG_LEVEL ?? "info",
  };
}
