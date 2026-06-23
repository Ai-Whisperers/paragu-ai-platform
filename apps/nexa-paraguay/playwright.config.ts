import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3001);
const BASE_URL = process.env.BASE_URL ?? `http://localhost:${PORT}`;

/**
 * Playwright config for the Nexa Paraguay app.
 *
 * Two modes:
 *   - Local dev (default): spins up `pnpm dev` and runs against it.
 *   - CI: assumes the dev server is already running on BASE_URL
 *     (the GitHub Actions workflow handles that).
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "list",

  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "mobile-chrome", use: { ...devices["Pixel 5"] } },
  ],

  webServer: process.env.CI
    ? undefined
    : {
        command: "pnpm dev",
        url: BASE_URL,
        reuseExistingServer: !process.env.CI,
        timeout: 60_000,
      },
});
