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

test.describe("table of contents (mobile disclosure)", () => {
  test.use({ viewport: { width: 390, height: 780 } });

  test("toggle reveals section links and closes on selection", async ({
    page,
  }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "On this page" });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    const aboutLink = page.getByRole("link", { name: "About" });
    await expect(aboutLink).toBeHidden();

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(aboutLink).toBeVisible();

    // Selecting a section collapses the panel and lands on the target.
    await aboutLink.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(page).toHaveURL(/#about$/);
  });
});

test("table of contents marks the current section", async ({ page }) => {
  await page.goto("/");
  const tocNav = page.getByRole("navigation", { name: "On this page" });
  // On load (top of page) the Overview entry is current.
  await expect(
    tocNav.getByRole("link", { name: "Overview" })
  ).toHaveAttribute("aria-current", "true");

  // Scroll to the contact section; scrollspy updates aria-current.
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect(
    tocNav.getByRole("link", { name: "Contact" })
  ).toHaveAttribute("aria-current", "true");
});
