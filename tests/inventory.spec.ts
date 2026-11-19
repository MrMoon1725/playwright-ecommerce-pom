import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage';
import { USERS, PRODUCTS } from '../src/data/testData';

test.describe('Inventory & Cart Management', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
  });

  test('should sort products by price low to high', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getPricesAsNumbers();
    const sorted = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sorted);
  });

  test('should sort products by price high to low', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortBy('hilo');
    const prices = await inventoryPage.getPricesAsNumbers();
    const sorted = [...prices].sort((a, b) => b - a);

    expect(prices).toEqual(sorted);
  });

  test('should update shopping cart badge when adding and removing items', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    await inventoryPage.addProductToCart(PRODUCTS.bikeLight);
    await expect(inventoryPage.cartBadge).toHaveText('2');

    await inventoryPage.removeProductFromCart(PRODUCTS.bikeLight);
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });
});
