import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setupTests.ts"],
    css: true,
    coverage: {
      reporter: ["text", "lcov"],
      reportsDirectory: "./coverage"
    }
  }
});
