import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.route("https://fonts.googleapis.com/**", (route) => route.abort());
});

test("solution demo switches examples, steps both directions and leaves practice unchanged", async ({
  page,
}) => {
  await page.goto("/");
  const before = await page.evaluate(() =>
    localStorage.getItem("recallcode.v1"),
  );
  await page.getByRole("button", { name: "Solution", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Concrete example" }),
  ).toBeVisible();
  await page.locator("[data-lab-case]").selectOption("1");
  for (let i = 0; i < 4; i++)
    await page.getByRole("button", { name: "Next step", exact: true }).click();
  await expect(page.getByText("return [0, 1]", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Next step", exact: true }),
  ).toBeDisabled();
  await page
    .getByRole("button", { name: "Previous step", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Next step", exact: true }),
  ).toBeEnabled();
  await page.getByRole("button", { name: "Restart", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Previous step", exact: true }),
  ).toBeDisabled();
  expect(await page.evaluate(() => localStorage.getItem("recallcode.v1"))).toBe(
    before,
  );
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: "test-results/visual-solution-mobile.png",
    fullPage: true,
  });
});

test("catalog lesson demos operate inside preview without submitting enrollment", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Explore 250", exact: true }).click();
  await page
    .getByPlaceholder("Title, pattern, or problem number")
    .fill("Trapping Rain Water");
  await page.locator('[data-action="preview-catalog"]').click();
  await page.getByText("Reveal approach & reasoning", { exact: true }).click();
  await page.getByRole("button", { name: "Next step", exact: true }).click();
  await page.getByRole("button", { name: "Next step", exact: true }).click();
  await expect(page.locator(".water-block")).toHaveCount(5);
  await expect(page.getByText("+3 water", { exact: true })).toBeVisible();
  await expect(page.locator("dialog")).toBeVisible();
  await expect(
    page
      .locator("dialog")
      .getByRole("button", { name: "Add to practice", exact: true }),
  ).toBeVisible();
  await page.screenshot({
    path: "test-results/rain-water-lesson.png",
    fullPage: true,
  });
});
