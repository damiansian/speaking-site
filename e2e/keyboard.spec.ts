import { test, expect } from "@playwright/test";

test("skip link is the first focusable element and targets main", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.locator("a.skip-link");
  await expect(skip).toBeFocused();
  await expect(skip).toHaveAttribute("href", "#main");
});

test("landmarks and a single h1 are present", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("header")).toHaveCount(1);
  await expect(page.locator("main#main")).toHaveCount(1);
  await expect(page.locator("footer")).toHaveCount(1);
  await expect(page.locator("h1")).toHaveCount(1);
});

test("focused elements show a visible focus outline", async ({ page }) => {
  await page.goto("/");
  const cta = page.getByRole("link", { name: "Book me for your event" });
  await cta.focus();
  const outlineWidth = await cta.evaluate(
    (el) => getComputedStyle(el).outlineWidth
  );
  expect(parseFloat(outlineWidth)).toBeGreaterThan(0);
});

test.describe("mobile navigation", () => {
  test.use({ viewport: { width: 390, height: 780 } });

  test("opens, closes with Escape, and restores focus", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Menu" });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    await toggle.click();
    const openToggle = page.getByRole("button", { name: "Close menu" });
    await expect(openToggle).toHaveAttribute("aria-expanded", "true");

    // Focus should move into the panel (first nav link).
    await expect(
      page.getByRole("link", { name: "About" })
    ).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("button", { name: "Menu" })
    ).toHaveAttribute("aria-expanded", "false");
    // Focus returns to the toggle.
    await expect(page.getByRole("button", { name: "Menu" })).toBeFocused();
  });
});
