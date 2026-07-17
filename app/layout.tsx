import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import { themeScript } from "@/components/theme-script";
import "@/styles/global.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"), // TODO: real domain
  title: "Damian Sian | Accessibility Speaker & Educator",
  description:
    "Damian Sian speaks and teaches on digital accessibility: WCAG 2.2, ADA Title II readiness, and building accessibility programs that scale.",
  openGraph: {
    title: "Damian Sian | Accessibility Speaker & Educator",
    description:
      "Talks and workshops on digital accessibility, standards, and program building.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Set theme before paint to prevent a flash of the wrong theme. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <span id="top" />
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <footer className="container" role="contentinfo">
          <p style={{ paddingBlock: "var(--space-6)", color: "var(--text-muted)" }}>
            &copy; {new Date().getFullYear()} Damian Sian. Built to meet WCAG 2.2 AA.
          </p>
        </footer>
      </body>
    </html>
  );
}
