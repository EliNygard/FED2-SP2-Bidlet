import { test, expect } from "@playwright/test";
import { EMAIL_IN, LOGIN_BTN, LOGOUT_BTN, PASS_IN, SUBMIT_BTN } from "./consts";

test.describe("when logged in, the user can create a new listing", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.click(LOGIN_BTN);
    await page.fill(EMAIL_IN, process.env.TEST_USER_EMAIL);
    await page.fill(PASS_IN, process.env.TEST_USER_PASSWORD);
    await page.click(SUBMIT_BTN);
    await expect(page.locator(LOGOUT_BTN)).toBeVisible();
  });

  test("clicking create-link navigates to /create", async ({ page }) => {
    const createLink = page.getByRole("link", { name: "Link to Create new Bidlet" });

    await expect(createLink).toBeVisible();
    await expect(createLink).toHaveAttribute("href", "./create");

    await Promise.all([page.waitForURL("/create"), createLink.click()]);
    await expect(page).toHaveURL(/\/create$/);
  });

  test("filling out the form and clicking Publish creates a new listing", async ({ page }) => {
    await page.route(`${process.env.API_BASE}/auction/listings`, async (route) => {
      const fakeResponse = { data: { id: "fakeuuid1234" } };
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify(fakeResponse),
      });
    });

    await page.goto("/create");
    const TITLE_IN = 'input[id="title"]';
    const DESC_IN = 'input[id="description"]';
    const DATE_IN = 'input[id="endsAt"]';
    const PUBLISH_BTN = 'button:has-text("Publish")';

    await expect(page.locator(PUBLISH_BTN)).toBeVisible();

    await page.fill(TITLE_IN, "A test Bidlet");
    await page.fill(DESC_IN, "Selling this test Bidlet.");
    await page.fill(DATE_IN, "2027-06-02T14:27");

    await Promise.all([page.waitForURL("/item?id=fakeuuid1234"), page.click(PUBLISH_BTN)]);

    await expect(page).toHaveURL("/item?id=fakeuuid1234");
  });
});
