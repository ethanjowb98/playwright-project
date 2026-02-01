import { test, expect } from '@playwright/test';
import { USERS } from '../test-data/users';
import { GLOBAL } from '../test-data/global';

test.describe('login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(GLOBAL.stagingURL);
  });
  
  test('admin login', async ({ page }) => {
    await page.waitForTimeout(1000); // 1 second delay
    await page.getByRole('link', { name: 'Sign in' }).click();
    await page.getByRole('textbox', { name: 'Enter email or username' }).fill(USERS.admin.email);
    await page.getByRole('textbox', { name: 'Enter password' }).click();
    await page.getByRole('textbox', { name: 'Enter password' }).fill(USERS.admin.password);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByRole('main')).toContainText(`Welcome, ${USERS.admin.firstName}!`);
  });
});
// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
