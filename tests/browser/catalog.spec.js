import { test, expect } from "@playwright/test";
test("catalog filters, study guide, enrollment and budget persist", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Explore 250", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "250 problems. Learn the patterns." }),
  ).toBeVisible();
  await expect(page.locator(".catalog-summary")).toContainText("250 questions");
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await expect(page.locator(".catalog-summary")).toContainText("Page 2");
  await page.getByLabel("Search collection").fill("Binary Search");
  const row = page
    .locator(".question-row")
    .filter({
      has: page.locator(".question-title", { hasText: /704\. Binary Search/ }),
    });
  await row.getByRole("button", { name: "Study guide" }).click();
  await page.getByText("Reveal full Java solution", { exact: true }).click();
  await expect(page.getByRole("dialog").locator("pre")).toContainText(
    "class Solution",
  );
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Add to practice", exact: true })
    .click();
  await expect(
    row.getByRole("button", { name: "In my practice" }),
  ).toBeVisible();
  await page.reload();
  await page.getByRole("button", { name: "Explore 250", exact: true }).click();
  await page.getByLabel("Search collection").fill("Binary Search");
  await expect(
    row.getByRole("button", { name: "In my practice" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Data & backup" }).click();
  await page.getByLabel("New cards per day").fill("0");
  await page.getByLabel("New cards per day").blur();
  await page.reload();
  await page.getByRole("button", { name: "Data & backup" }).click();
  await expect(page.getByLabel("New cards per day")).toHaveValue("0");
  await page.getByRole("button", { name: "Explore 250", exact: true }).click();
  await page.setViewportSize({ width: 375, height: 812 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: "test-results/catalog-mobile.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({
    path: "test-results/catalog-desktop.png",
    fullPage: true,
  });
});
