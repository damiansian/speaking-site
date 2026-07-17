import { test, expect } from "@playwright/test";

test("empty submit surfaces linked errors and moves focus", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Send message" }).click();

  const name = page.getByLabel("Name");
  await expect(name).toHaveAttribute("aria-invalid", "true");
  await expect(name).toBeFocused(); // focus jumps to first error
  await expect(page.locator("#name-error")).toBeVisible();
  await expect(page.locator("#email-error")).toBeVisible();
  await expect(page.locator("#message-error")).toBeVisible();
});

test("invalid email is rejected", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Name").fill("Test Organizer");
  await page.getByLabel("Email").fill("not-an-email");
  await page.getByLabel("About your event").fill("We would love to book you.");
  await page.getByRole("button", { name: "Send message" }).click();

  await expect(page.locator("#email-error")).toBeVisible();
  await expect(page.getByLabel("Email")).toBeFocused();
});

test("valid submit announces success in the live region", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Name").fill("Test Organizer");
  await page.getByLabel("Email").fill("organizer@example.com");
  await page.getByLabel("About your event").fill("We would love to book you.");
  await page.getByRole("button", { name: "Send message" }).click();

  const status = page.getByRole("status");
  await expect(status).toContainText(/sent/i);
});
