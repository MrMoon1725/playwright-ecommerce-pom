import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage';
import { USERS, ERROR_MESSAGES } from '../src/data/testData';

test.describe('Authentication Flows', () => {
  test('should log in successfully with valid standard user credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);

    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(inventoryPage.title).toHaveText('Products');
  });

  test('should display error message for locked out user', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(USERS.lockedOut.username, USERS.lockedOut.password);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(ERROR_MESSAGES.lockedOut);
  });

  test('should display error message for invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(USERS.invalid.username, USERS.invalid.password);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(ERROR_MESSAGES.invalidCredentials);
  });

  test('should require username when submitting empty login form', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.loginButton.click();

    await expect(loginPage.errorMessage).toHaveText(ERROR_MESSAGES.usernameRequired);
  });
});
