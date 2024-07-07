/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_HOSTNAME: string;
  readonly VITE_APP_ENVIRONMENT: string;
  readonly VITE_API_HOSTNAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

type ValidationResult<T> = [boolean, T];

interface ChildfullComponent {
  children?: React.ReactNode;
}
