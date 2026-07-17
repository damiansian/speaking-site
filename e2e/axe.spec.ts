import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const WCAG_TAGS = [
  "wcag2a",
  "wcag2aa",
  "wcag21a",
  "wcag21aa",
  "wcag22aa",
];

const THEMES = [
  { theme: "light", contrast: "normal" },
  { theme: "dark", contrast: "normal" },
  { theme: "light", contrast: "high" }, // hc-light
  { theme: "dark", contrast: "high" }, // hc-dark
] as const;

for (const { theme, contrast } of THEMES) {
  test(`no axe violations: ${theme} / ${contrast} contrast`, async ({ page }) => {
    await page.goto("/");
    // Apply the theme the same way the app does (attributes on <html>).
    await page.evaluate(
      ({ theme, contrast }) => {
        document.documentElement.setAttribute("data-theme", theme);
        document.documentElement.setAttribute("data-contrast", contrast);
      },
      { theme, contrast }
    );

    const results = await new AxeBuilder({ page })
      .withTags(WCAG_TAGS)
      .analyze();

    expect(results.violations).toEqual([]);
  });
}
