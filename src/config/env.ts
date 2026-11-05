export interface AppEnv {
  readonly APP_NAME: string;
  readonly API_BASE_URL: string;
  readonly USE_MOCK_API: boolean;
}

export const ENV: AppEnv = {
  APP_NAME: import.meta.env.VITE_APP_NAME ?? 'Vinoli',
  // Always default to a relative path so Vite/reverse-proxy handles origin routing cleanly
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  USE_MOCK_API: (import.meta.env.VITE_USE_MOCK_API ?? 'true') !== 'false',
};
