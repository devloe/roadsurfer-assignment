import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

// https://vite.dev/config/
export default defineConfig({
  base: "/roadsurfer-assignment/",
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  test: {
    globals: true, // describe, it, expect sin imports
    environment: "jsdom", // simula navegador
    setupFiles: "./tests/setup.ts",
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
});
