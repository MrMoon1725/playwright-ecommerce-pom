import { test, expect } from '../src/fixtures/authFixture';
import { PRODUCTS, CHECKOUT_INFO, ERROR_MESSAGES } from '../src/data/testData';

test.describe('End-to-End Checkout Flow', () => {
  test('should complete a full purchase end-to-end', async ({
    authenticatedInventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    await authenticatedInventoryPage.addProductToCart(PRODUCTS.backpack);
    await authenticatedInventoryPage.addProductToCart(PRODUCTS.boltTshirt);
    await authenticatedInventoryPage.openCart();

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

  test('should block checkout when required customer fields are missing', async ({
    authenticatedInventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    await authenticatedInventoryPage.addProductToCart(PRODUCTS.backpack);
    await authenticatedInventoryPage.openCart();
    await cartPage.proceedToCheckout();

    await checkoutPage.continueButton.click();
    await expect(checkoutPage.errorMessage).toHaveText(ERROR_MESSAGES.firstNameRequired);

    await checkoutPage.fillCustomerInfo(CHECKOUT_INFO.firstName, CHECKOUT_INFO.lastName, '');
    await expect(checkoutPage.errorMessage).toHaveText(ERROR_MESSAGES.postalCodeRequired);
  });
});
