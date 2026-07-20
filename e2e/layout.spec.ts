import { test, expect } from "@playwright/test";

test.describe("header and TOC layout", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("TOC is sticky and never overlaps the header across scroll positions", async ({
    page,
  }) => {
    await page.goto("/");

    // The rail must be sticky (same scroll compositing as the sticky header)
    // so the two cannot desync and flash over each other during a fast scroll.
    const position = await page.evaluate(
      () =>
        getComputedStyle(
          document.querySelector('nav[aria-label="On this page"]')!
        ).position
    );
    expect(position).toBe("sticky");

    for (const y of [0, 400, 1200, 2400, 4000]) {
      const overlap = await page.evaluate((scrollY) => {
        window.scrollTo(0, scrollY);
        const h = document.querySelector("header")!.getBoundingClientRect();
        const n = document
          .querySelector('nav[aria-label="On this page"]')!
          .getBoundingClientRect();
        return h.bottom - n.top;
      }, y);
      // A negative value means the TOC top sits below the header bottom (a gap).
      expect(overlap, `header/TOC overlap at scrollY=${y}`).toBeLessThan(0);
    }
  });
});
