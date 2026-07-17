import { test, expect } from "@playwright/test";

test("honors prefers-reduced-motion: reduce", async ({ page }) => {
  // Emulate a user who prefers reduced motion (applied via CDP).
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const reduced = await page.evaluate(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  expect(reduced).toBe(true);

  // Smooth scrolling is disabled under the reduced-motion media query.
  const scrollBehavior = await page.evaluate(
    () => getComputedStyle(document.documentElement).scrollBehavior
  );
  expect(scrollBehavior).toBe("auto");
});
