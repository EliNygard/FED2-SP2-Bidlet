import { test, expect } from "@playwright/test";
import { EMAIL_IN, LOGIN_BTN, LOGOUT_BTN, MSG_CONT, PASS_IN, SUBMIT_BTN } from "./consts";

test.describe("login", () => {
  //   const LOGIN_BTN = '[aria-label="Link to log in or register page"]';
  //   const DROPDOWN = "#login-dropdown";
  //   const EMAIL_IN = `${DROPDOWN} input[name="email"]`;
  //   const PASS_IN = `${DROPDOWN} input[name="password"]`;
  //   const SUBMIT_BTN = `${DROPDOWN} button:has-text("Log in")`;
  //   const LOGOUT_BTN = 'button:has-text("Log out")';
  //   const MSG_CONT = `${DROPDOWN} [role="alert"]`;

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
