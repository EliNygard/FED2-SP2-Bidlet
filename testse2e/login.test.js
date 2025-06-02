import { test, expect } from "@playwright/test";
import { EMAIL_IN, LOGIN_BTN, LOGOUT_BTN, MSG_CONT, PASS_IN, SUBMIT_BTN } from "./consts";

test.describe("login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("user can login", async ({ page }) => {
    await expect(page.locator(LOGIN_BTN)).toBeVisible();
    await page.click(LOGIN_BTN);
    await page.fill(EMAIL_IN, process.env.TEST_USER_EMAIL);
    await page.fill(PASS_IN, process.env.TEST_USER_PASSWORD);
    await page.click(SUBMIT_BTN);
    await expect(page.locator(LOGOUT_BTN)).toBeVisible();
  });

  test("wrong email shows error", async ({ page }) => {
    await page.click(LOGIN_BTN);
    await page.fill(EMAIL_IN, "wrong-email@stud.noroff.no");
    await page.fill(PASS_IN, process.env.TEST_USER_PASSWORD);
    await page.click(SUBMIT_BTN);
    await expect(page.locator(MSG_CONT)).toBeVisible();
    await expect(page.locator(MSG_CONT)).toContainText("Invalid email or password. Please try again.");
  });

  test("wrong password shows error", async ({ page }) => {
    await page.click(LOGIN_BTN);
    await page.fill(EMAIL_IN, process.env.TEST_USER_EMAIL);
    await page.fill(PASS_IN, "wrong-password");
    await page.click(SUBMIT_BTN);
    await expect(page.locator(MSG_CONT)).toBeVisible();
    await expect(page.locator(MSG_CONT)).toContainText("Invalid email or password. Please try again.");
  });
});
