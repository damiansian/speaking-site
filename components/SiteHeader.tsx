"use client";

import { useEffect, useRef, useState } from "react";
import ThemeControls from "./ThemeControls";
import styles from "./SiteHeader.module.css";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#topics", label: "Speaking topics" },
  { href: "#engagements", label: "Engagements" },
  { href: "#contact", label: "Contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close on Escape and restore focus to the toggle.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Move focus to the first link when the panel opens.
  useEffect(() => {
    if (open) {
      const first = navRef.current?.querySelector<HTMLAnchorElement>("a");
      first?.focus();
    }
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <a href="#top" className={styles.brand}>
          Damian Sian
        </a>

        <button
          ref={toggleRef}
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true" className={styles.menuIcon} />
          {open ? "Close menu" : "Menu"}
        </button>

        <div
          ref={navRef}
          id="primary-nav"
          className={`${styles.navArea} ${open ? styles.navOpen : ""}`}
        >
          <nav aria-label="Primary">
            <ul className={styles.navList}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={styles.navLink}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeControls />
        </div>
      </div>
    </header>
  );
}
