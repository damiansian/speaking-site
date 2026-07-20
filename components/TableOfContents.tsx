"use client";

import { useEffect, useState } from "react";
import styles from "./TableOfContents.module.css";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "about", label: "About" },
  { id: "topics", label: "Speaking topics" },
  { id: "engagements", label: "Engagements" },
  { id: "contact", label: "Contact" },
];

export default function TableOfContents() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);
  const [open, setOpen] = useState(false);

  // Scrollspy: the active section is the last one whose top has scrolled past
  // a reading line ~35% down the viewport. Deterministic and cheap.
  useEffect(() => {
    let frame = 0;

    function computeActive() {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) current = s.id;
      }
      setActive(current);
    }

    function onScroll() {
      if (frame === 0) frame = window.requestAnimationFrame(computeActive);
    }

    computeActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav className={styles.root} aria-label="On this page">
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls="toc-list"
        onClick={() => setOpen((v) => !v)}
      >
        On this page
      </button>
      <div className={`${styles.panel} ${open ? styles.open : ""}`}>
        <p className={styles.heading} aria-hidden="true">
          On this page
        </p>
        <ul id="toc-list" className={styles.list}>
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={styles.link}
                aria-current={active === s.id ? "true" : undefined}
                onClick={() => setOpen(false)}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
