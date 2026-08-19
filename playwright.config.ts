import { defineConfig, devices } from '@playwright/test'

const PORT = 4173
const CI = Boolean(process.env.CI)

/**
 * The suite runs against the production build, not the dev server: these checks
 * are about what ships — bundled CSS ordering, real image variants, the actual
 * scrim over the actual photograph. A dev-server run would not have caught the
 * utility-class ordering bug that painted two logos in the header.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: CI,
  // Interaction specs drive real pointer gestures with real timing. One retry
  // absorbs a slow CI runner without hiding a genuine break, which would fail
  // both times.
  retries: CI ? 1 : 0,
  workers: CI ? 2 : undefined,
  reporter: CI ? [['github'], ['list']] : [['list']],
  timeout: 45_000,
  expect: { timeout: 10_000 },

  use: {
    baseURL: `http://localhost:${PORT}`,
    // Escape hatch for sandboxes that already carry a browser at a fixed path
    // and cannot run `playwright install`. Unset in CI, where the workflow
    // installs the matching build itself.
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH }
      : {},
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],

  webServer: {
    command: 'npm run build && npm run preview -- --port ' + PORT + ' --strictPort',
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !CI,
    timeout: 120_000,
  },
})
