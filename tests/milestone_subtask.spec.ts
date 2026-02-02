import { test, expect } from '@playwright/test';
import { USERS } from '../test-data/users';
import { GLOBAL } from '../test-data/global';
import { subtask } from '../test-data/milestone_card_subtask';

test.describe('milestone subtask', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(GLOBAL.prodURL);
    await page.getByRole('link', { name: 'Sign in' }).click();
    await page.getByRole('textbox', { name: 'Enter email or username' }).fill(USERS.personal.email);
    await page.getByRole('textbox', { name: 'Enter password' }).fill(USERS.personal.password);
    await page.getByRole('textbox', { name: 'Enter password' }).press('Enter');
    await page.getByText('BPOSeats').click();
    await page.getByRole('link', { name: 'Milestones' }).click();
    await page.getByRole('textbox', { name: 'Search' }).click();
    await page.getByRole('textbox', { name: 'Search' }).fill(`${USERS.personal.firstName} ${USERS.personal.lastName}`);
    await page.getByText(`${USERS.personal.firstName} ${USERS.personal.lastName}`).click();
    await page.getByText('Cards').click();
  });
  test('create milestone card subtask', async ({ page }) => {
    for (const [cardName, subtaskDetails] of subtask) {
      await page.getByRole('textbox', { name: 'Search card' }).fill(cardName);
      await page.waitForTimeout(1000); // 1 second delay
      await expect(page.locator('.milestone-card')).toBeVisible();
      await page.getByRole('button', { name: 'View' }).first().click();
      for (let i = subtaskDetails[0]; i <= subtaskDetails[1]; i+=subtaskDetails[2]) {
        await page.getByRole('textbox', { name: 'Search subtask' }).fill(`Week ${i}: ${cardName}`);
        try {
          await expect(page.getByText(`Week ${i}: ${cardName}`)).toBeVisible( { timeout: 3000 } );
          await page.locator('.add').click();
          await page.getByText(`[Week ${i}]`).fill(`Week ${i}: ${cardName}`);
          await page.getByRole('button', { name: 'Add', exact: true }).click();
        } catch (error) {
          console.log(`Subtask "Week ${i}: ${cardName}" already exists. Skipping creation.`);
          continue;
        }
      }
      await page.locator('#close-button').click();
    }
  });
});