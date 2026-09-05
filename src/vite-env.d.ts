/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Endpoint de Formspree para el formulario de contacto. */
  readonly VITE_FORMSPREE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
