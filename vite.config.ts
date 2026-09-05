import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // `@/` apunta a src/ — es el alias que asumen los componentes de
    // 21st.dev y shadcn/ui al importar `@/components/ui/...`.
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.message?.includes("externalized for browser compatibility")) return;
        warn(warning);
      },
    },
  },
});
