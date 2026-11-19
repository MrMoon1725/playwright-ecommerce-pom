import { Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly itemPrices: Locator;
  readonly itemNames: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
  }

  private toSlug(productName: string): string {
    return productName.toLowerCase().replace(/\s+/g, '-');
  }

  async addProductToCart(productName: string): Promise<void> {
    await this.page.locator(`[data-test="add-to-cart-${this.toSlug(productName)}"]`).click();
  }

  async removeProductFromCart(productName: string): Promise<void> {
    await this.page.locator(`[data-test="remove-${this.toSlug(productName)}"]`).click();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async getPricesAsNumbers(): Promise<number[]> {
    const texts = await this.itemPrices.allInnerTexts();
    return texts.map((price) => parseFloat(price.replace('$', '')));
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
