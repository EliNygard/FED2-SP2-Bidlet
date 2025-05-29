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
    const createLink = page.getByRole("link", { name: "Create a new Bidlet" });
    await expect(createLink).toBeVisible();
    await expect(createLink).toHaveAttribute("href", "./create");

    await Promise.all([page.waitForURL("/create"), createLink.click()]);
    await expect(page).toHaveURL(/\/create$/);
  });
});
