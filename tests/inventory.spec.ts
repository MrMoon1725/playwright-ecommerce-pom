import { test, expect } from '../src/fixtures/authFixture';
import { PRODUCTS } from '../src/data/testData';
import { isSortedAscending, isSortedDescending } from '../src/utils/priceUtils';

test.describe('Inventory & Cart Management', () => {
  test('should sort products by price low to high', async ({ authenticatedInventoryPage }) => {
    await authenticatedInventoryPage.sortBy('lohi');
    const prices = await authenticatedInventoryPage.getPricesAsNumbers();

    expect(isSortedAscending(prices)).toBe(true);
  });

  test('should sort products by price high to low', async ({ authenticatedInventoryPage }) => {
    await authenticatedInventoryPage.sortBy('hilo');
    const prices = await authenticatedInventoryPage.getPricesAsNumbers();

    expect(isSortedDescending(prices)).toBe(true);
  });

  test('should update shopping cart badge when adding and removing items', async ({ authenticatedInventoryPage }) => {
    await authenticatedInventoryPage.addProductToCart(PRODUCTS.backpack);
    await authenticatedInventoryPage.addProductToCart(PRODUCTS.bikeLight);
    await expect(authenticatedInventoryPage.cartBadge).toHaveText('2');

    await authenticatedInventoryPage.removeProductFromCart(PRODUCTS.bikeLight);
    await expect(authenticatedInventoryPage.cartBadge).toHaveText('1');
  });
});
