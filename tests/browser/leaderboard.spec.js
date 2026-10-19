import { test, expect } from "@playwright/test";

test("guest leaderboard explains scores and remains usable on mobile", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Leaderboard", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "A little practice adds up." }),
  ).toBeVisible();
  await expect(page.getByText("1 card = 1 point")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Join the practice community" }),
  ).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: "test-results/leaderboard-mobile.png",
    fullPage: true,
  });
});
