/**
 * ==========================================================
 * LÉLU
 * SETTINGS
 * ==========================================================
 */

export interface AppSettings {
  appName: string;
  environment: string;
  logLevel: string;
  enableSupabase: boolean;
  enableVoice: boolean;
  enableKnowledge: boolean;
}

export default function getSettings(): AppSettings {
  return {
    appName: import.meta.env.VITE_APP_NAME ?? "Lelu",
    environment: import.meta.env.VITE_APP_ENV ?? "development",
    logLevel: import.meta.env.VITE_LOG_LEVEL ?? "info",
    enableSupabase: Boolean(import.meta.env.VITE_SUPABASE_URL),
    enableVoice: true,
    enableKnowledge: true,
  };
}
