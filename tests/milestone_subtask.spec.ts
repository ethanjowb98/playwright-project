import { test, expect } from '@playwright/test';
import { USERS } from '../test-data/users';
import { GLOBAL } from '../test-data/global';


test.describe('milestone subtask', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(GLOBAL.prodURL);
    await page.getByRole('link', { name: 'Sign in' }).click();
    await page.getByRole('textbox', { name: 'Enter email or username' }).click();
    await page.getByRole('textbox', { name: 'Enter email or username' }).fill(USERS.personal.email);
    await page.getByRole('textbox', { name: 'Enter email or username' }).press('Tab');
    await page.getByRole('textbox', { name: 'Enter password' }).fill(USERS.personal.password);
    await page.getByRole('textbox', { name: 'Enter password' }).press('Enter');
    await page.getByRole('listitem').filter({ hasText: 'BPOSeatsChannel Info Tech' }).click();
    await page.getByRole('link', { name: '󰈽 Milestones' }).click();
    await page.getByRole('textbox', { name: 'Search' }).click();
    await page.getByRole('textbox', { name: 'Search' }).fill(`${USERS.personal.firstName} ${USERS.personal.lastName}`);
    await page.getByText(`${USERS.personal.firstName} ${USERS.personal.lastName}`).click();
    await page.getByText('Cards').click();
  });
  test('', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Search card' }).fill('[Create Document] QA Automation Dashboard');
    await page.waitForTimeout(1000); // 1 second delay
    await page.getByRole('button', { name: 'View' }).first().click();
    await page.locator('.add').click();
    await page.locator('.textarea').click();
    await page.getByText('[Week 1]').fill('Week 1: [Create Document] QA Automation Dashboard');
    await page.getByRole('button', { name: 'Add', exact: true }).click();
  });
});