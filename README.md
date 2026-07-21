# Speaking site

Personal site for Damian Sian, accessibility speaker and educator. Built with Next.js
(App Router) and deployed on Vercel. Accessibility is a hard requirement: the site targets
WCAG 2.2 AA, and that is verified by an automated Playwright + axe suite plus a live audit.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

## Test

```bash
npm run test:e2e     # Playwright + axe (builds and serves the prod bundle on :3100)
npm run test:e2e:ui  # interactive runner
```

The suite covers:

- Zero axe violations (WCAG 2.0/2.1/2.2 A + AA tags) in all four themes:
  light, dark, high-contrast light, high-contrast dark.
- Keyboard: skip link, landmarks, single `h1`, visible focus, mobile nav open/close/Escape.
- Theme controls: attribute + state updates and `localStorage` persistence across reload.
- Contact form: linked errors, focus-to-first-error, live-region success message.
- `prefers-reduced-motion` handling.

## Theming

Two axes on `<html>` drive four themes, set before paint by an inline script to avoid a flash:

- `data-theme`: `light` | `dark`
- `data-contrast`: `normal` | `high`

The header exposes three buttons: Light / Dark (a radio group) and a High Contrast toggle.

## Deploy

Import the repo in Vercel. Next.js is auto-detected; no build config is needed. Pushes deploy,
and pull requests get preview URLs used for the live accessibility audit.

## TODO: real content to replace placeholders

Search the code for `TODO: real content`. Items to supply:

- [x] Real headshot at `public/Damian-Headshot_Sized.jpg`.
- [ ] Exact job title / bio wording in the About section (`app/page.tsx`).
- [ ] Real speaking topics and abstracts (`TOPICS` in `app/page.tsx`).
- [x] Real speaking engagements (`ENGAGEMENTS` in `app/page.tsx`).
- [ ] Add a `url` per engagement (recording / slides / event page); titles link automatically when set.
- [x] Real LinkedIn profile URL (`app/page.tsx`).
- [ ] Production domain in `app/layout.tsx` (`metadataBase`).
- [ ] Contact form delivery: create a Formspree form pointing at your inbox, then set
      `NEXT_PUBLIC_FORMSPREE_ENDPOINT` (e.g. `https://formspree.io/f/xxxxxxxx`) in Vercel
      project env vars and in a local `.env.local`. The form posts there via
      `components/ContactForm.tsx`.
