# Playwright E2E Automation — SauceDemo (Page Object Model)

[![Playwright E2E Tests](https://github.com/MrMoon1725/playwright-ecommerce-pom/actions/workflows/playwright.yml/badge.svg)](https://github.com/MrMoon1725/playwright-ecommerce-pom/actions/workflows/playwright.yml)

End-to-End (E2E) test automation framework built with **Playwright** and **TypeScript**, implementing the **Page Object Model (POM)** design pattern, externalized test data, and automated CI execution via **GitHub Actions**.

---

## Architecture & Project Structure

```text
playwright-ecommerce-pom/
├── .github/workflows/
│   └── playwright.yml          # CI pipeline running headless tests & uploading HTML report
├── src/
│   ├── data/
│   │   └── testData.ts         # Externalized credentials, products, & expected messages
│   └── pages/
│       ├── LoginPage.ts        # Authentication page object
│       ├── InventoryPage.ts    # Product catalog, sorting & cart actions
│       ├── CartPage.ts         # Shopping cart verification & checkout trigger
│       └── CheckoutPage.ts     # Multi-step checkout & order confirmation
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

## Running Tests Locally in a Controlled Environment

### Prerequisites
- **Node.js** `>= 18`
- **npm**

### Step-by-Step Setup & Execution

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MrMoon1725/playwright-ecommerce-pom.git
   cd playwright-ecommerce-pom
   ```

2. **Install dependencies and Playwright Chromium browser:**
   ```bash
   npm install
   npx playwright install chromium
   ```

3. **Run all tests (headless mode — ideal for CI/CD):**
   ```bash
   npm test
   ```

4. **Run tests in headed mode (watch the browser execute):**
   ```bash
   npm run test:headed
   ```

5. **Run with Playwright Interactive UI Mode (step-by-step debugging & time-travel):**
   ```bash
   npm run test:ui
   ```

6. **View the HTML Test Report:**
   ```bash
   npm run report
   ```
