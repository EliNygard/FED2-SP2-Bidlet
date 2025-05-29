import { test, expect } from "@playwright/test";

test("homepage should show the search link", async ({ page }) => {
  await page.goto("https://bidlet.netlify.app/");
  await expect(page.getByRole("link", { name: "Search" })).toBeVisible();
});
