# Playwright E2E Automation — SauceDemo (Page Object Model)

[![Playwright E2E Tests](https://github.com/MrMoon1725/playwright-ecommerce-pom/actions/workflows/playwright.yml/badge.svg)](https://github.com/MrMoon1725/playwright-ecommerce-pom/actions/workflows/playwright.yml)

End-to-End (E2E) test automation framework built with **Playwright** and **TypeScript**, implementing the **Page Object Model (POM)** design pattern, custom Playwright **Fixtures**, reusable **Utils**, externalized test data, and automated CI/CD reporting published to **GitHub Pages**.

- **Live HTML Test Report (GitHub Pages):** [https://mrmoon1725.github.io/playwright-ecommerce-pom/](https://mrmoon1725.github.io/playwright-ecommerce-pom/)

---

## Architecture & Project Structure

```text
playwright-ecommerce-pom/
├── .github/workflows/
│   └── playwright.yml          # CI pipeline running headless tests & deploying HTML report to GitHub Pages
├── src/
│   ├── data/
│   │   └── testData.ts         # Externalized credentials, products, & expected messages
│   ├── fixtures/
│   │   └── authFixture.ts      # Custom Playwright fixtures (POM injection + authenticated session)
│   ├── pages/
│   │   ├── LoginPage.ts        # Authentication page object
│   │   ├── InventoryPage.ts    # Product catalog, sorting & cart actions
│   │   ├── CartPage.ts         # Shopping cart verification & checkout trigger
│   │   └── CheckoutPage.ts     # Multi-step checkout & order confirmation
│   └── utils/
│       └── priceUtils.ts       # Reusable sorting & assertion helpers
├── tests/
│   ├── auth.spec.ts            # Positive & negative login scenarios (4 tests)
│   ├── inventory.spec.ts       # Sorting & cart badge validation (3 tests)
│   └── checkout.spec.ts        # Full E2E purchase & form validation (2 tests)
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

---

## Test Coverage Summary (9 Automated Tests)

- **Authentication (`auth.spec.ts`):** Valid standard login, locked-out user validation, invalid credentials error handling, empty form validation.
- **Inventory & Cart (`inventory.spec.ts`):** Price sorting (low-to-high & high-to-low), dynamic cart badge counter on add/remove.
- **Checkout (`checkout.spec.ts`):** Full end-to-end purchase flow from catalog to order confirmation, required field validation in checkout form.

---

## Quickstart (3 Commands)

```bash
git clone https://github.com/MrMoon1725/playwright-ecommerce-pom.git && cd playwright-ecommerce-pom
npm install && npx playwright install chromium
npm test
```

### Additional Commands
- **Headed mode (watch browser):** `npm run test:headed`
- **Interactive UI mode:** `npm run test:ui`
- **Open local HTML report:** `npm run report`
