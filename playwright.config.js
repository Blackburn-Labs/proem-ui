import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for E2E tests
 * See https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
    testDir: './tests/e2e',

    // Maximum time one test can run
    timeout: 60 * 1000,

    // Run tests in files in parallel
    fullyParallel: true,

    // Fail the build on CI if you accidentally left test.only in the source code
    forbidOnly: !!process.env.CI,

    // Retry on CI only
    retries: process.env.CI ? 2 : 0,

    // Opt out of parallel tests on CI
    workers: process.env.CI ? 1 : undefined,

    // Reporter to use
    reporter: [
        ['html'],
        ['list'],
    ],

    // Shared settings for all projects
    use: {
        // Base URL to use in actions like `await page.goto('/')`
        baseURL: 'http://localhost:5173',

        // Collect trace when retrying the failed test
        trace: 'on-first-retry',

        // Screenshot on failure
        screenshot: 'only-on-failure',
    },

    // Configure projects for major browsers
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },

        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox'],
                // Firefox-specific settings
                launchOptions: {
                    firefoxUserPrefs: {
                        // Disable animations for faster tests
                        'ui.prefersReducedMotion': 1,
                        // Reduce content process timeout
                        'dom.ipc.processPrelaunch': false,
                        // Disable telemetry
                        'datareporting.policy.dataSubmissionEnabled': false,
                        'datareporting.healthreport.uploadEnabled': false,
                    },
                },
            },
        },

        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],

    // Run your local dev server before starting the tests
    webServer: {
        command: 'npm start',
        url: 'http://localhost:5173',
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
        stdout: 'pipe',
        stderr: 'pipe',
    },
});
