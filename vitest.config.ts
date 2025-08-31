import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    css: true,
    globals: true,
    restoreMocks: true,
    clearMocks: true,
    mockReset: true,
  },
});
