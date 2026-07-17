import { test, expect } from "@playwright/test";

test("theme controls update attributes, state, and persist", async ({
  page,
}) => {
  await page.goto("/");

  const light = page.getByRole("radio", { name: "Light" });
  const dark = page.getByRole("radio", { name: "Dark" });
  const hc = page.getByRole("button", { name: "High contrast" });
  const html = page.locator("html");

  // Switch to Dark.
  await dark.click();
  await expect(dark).toHaveAttribute("aria-checked", "true");
  await expect(light).toHaveAttribute("aria-checked", "false");
  await expect(html).toHaveAttribute("data-theme", "dark");

  // Turn High Contrast on -> hc-dark.
  await hc.click();
  await expect(hc).toHaveAttribute("aria-pressed", "true");
  await expect(html).toHaveAttribute("data-contrast", "high");

  // localStorage reflects the choices.
  expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");
  expect(await page.evaluate(() => localStorage.getItem("contrast"))).toBe(
    "high"
  );

  // Reload preserves the selection (no flash to default).
  await page.reload();
  await expect(html).toHaveAttribute("data-theme", "dark");
  await expect(html).toHaveAttribute("data-contrast", "high");
  await expect(
    page.getByRole("button", { name: "High contrast" })
  ).toHaveAttribute("aria-pressed", "true");
});
