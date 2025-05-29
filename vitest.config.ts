import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom", 
    include: ["src/**/*.test.{ts,js}"],
    exclude: ['**/node_modules/**', '**/tests/e2e/**']
  },
});
