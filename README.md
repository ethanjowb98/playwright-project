# Playwright Project

## System Requirements
- Node.js: latest 20.x, 22.x or 24.x.
- Windows 11+, Windows Server 2019+ or Windows Subsystem for Linux (WSL).
- macOS 14 (Ventura) or later.
- Debian 12 / 13, Ubuntu 22.04 / 24.04 (x86-64 or arm64).

## Installation

```bash
npm install -D @playwright/test
```

## Project Setup

Initialize Playwright configuration:

```bash
npx playwright install
```

## Writing Tests

Create test files in the `tests/` directory with `.spec.ts` or `.spec.js` extension:

```typescript
import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page).toHaveTitle('Example');
});
```

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run tests in a specific file:

```bash
npx playwright test tests/example.spec.ts
```

Run tests in headed mode (see browser):

```bash
npx playwright test --headed
```

Run tests in debug mode:

```bash
npx playwright test --debug
```

Run tests in UI mode:

```bash
npx playwright test --ui
```

## View Test Report

After running tests:

```bash
npx playwright show-report
```

## Configuration

Create a `playwright.config.ts` file in the project root:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        baseURL: 'http://localhost:3000',
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],
    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
    },
});
```

Customize options like `retries`, `workers`, `baseURL`, and `projects` based on your testing needs.