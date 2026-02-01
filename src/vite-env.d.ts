/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_STRIPE_PUBLISHABLE_KEY: string;
  readonly VITE_STRIPE_PLUS_PRICE_ID: string;
  readonly VITE_STRIPE_ELITE_PRICE_ID: string;
  readonly VITE_PUBLIC_ANALYTICS_ID: string;
  readonly VITE_ANALYTICS_PROVIDER: string;
  readonly VITE_PUBLIC_APP_VERSION: string;
  readonly VITE_PUBLIC_GIT_COMMIT: string;
  readonly MODE: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
