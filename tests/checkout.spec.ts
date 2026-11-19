import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage';
import { CartPage } from '../src/pages/CartPage';
import { CheckoutPage } from '../src/pages/CheckoutPage';
import { USERS, PRODUCTS, CHECKOUT_INFO, ERROR_MESSAGES } from '../src/data/testData';

test.describe('End-to-End Checkout Flow', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
  });

  test('should complete a full purchase end-to-end', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    await inventoryPage.addProductToCart(PRODUCTS.boltTshirt);
    await inventoryPage.openCart();

    const itemsInCart = await cartPage.getItemNames();
    expect(itemsInCart).toEqual([PRODUCTS.backpack, PRODUCTS.boltTshirt]);

    await cartPage.proceedToCheckout();
    await checkoutPage.fillCustomerInfo(
      CHECKOUT_INFO.firstName,
      CHECKOUT_INFO.lastName,
      CHECKOUT_INFO.postalCode
    );

    await expect(checkoutPage.totalLabel).toContainText('Total: $');
    await checkoutPage.finishOrder();

    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });

  test('should block checkout when required customer fields are missing', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    await inventoryPage.openCart();
    await cartPage.proceedToCheckout();

    await checkoutPage.continueButton.click();
    await expect(checkoutPage.errorMessage).toHaveText(ERROR_MESSAGES.firstNameRequired);

    await checkoutPage.fillCustomerInfo(CHECKOUT_INFO.firstName, CHECKOUT_INFO.lastName, '');
    await expect(checkoutPage.errorMessage).toHaveText(ERROR_MESSAGES.postalCodeRequired);
  });
});
