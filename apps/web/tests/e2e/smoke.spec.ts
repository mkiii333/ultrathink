import { test, expect } from "@playwright/test";

test.describe("homepage", () => {
  test("loads hero content", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Stop guessing channels"
    );
  });
});
