"use client";

import { useEffect, useState } from "react";
import styles from "./ThemeControls.module.css";

type Mode = "light" | "dark";
type Contrast = "normal" | "high";

function readAttr<T extends string>(name: string, fallback: T): T {
  if (typeof document === "undefined") return fallback;
  const value = document.documentElement.getAttribute(name);
  return (value as T) || fallback;
}

export default function ThemeControls() {
  const [mode, setMode] = useState<Mode>("light");
  const [contrast, setContrast] = useState<Contrast>("normal");

  // Sync React state with what the no-FOUC script already applied to <html>.
  useEffect(() => {
    setMode(readAttr<Mode>("data-theme", "light"));
    setContrast(readAttr<Contrast>("data-contrast", "normal"));
  }, []);

  function applyMode(next: Mode) {
    setMode(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage may be unavailable; UI still updates for the session */
    }
  }

  function toggleContrast() {
    const next: Contrast = contrast === "high" ? "normal" : "high";
    setContrast(next);
    document.documentElement.setAttribute("data-contrast", next);
    try {
      localStorage.setItem("contrast", next);
    } catch {
      /* no-op */
    }
  }

  return (
    <div className={styles.wrap}>
      <div
        className={styles.group}
        role="radiogroup"
        aria-label="Color theme"
      >
        <button
          type="button"
          role="radio"
          aria-checked={mode === "light"}
          className={styles.button}
          onClick={() => applyMode("light")}
        >
          Light
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={mode === "dark"}
          className={styles.button}
          onClick={() => applyMode("dark")}
        >
          Dark
        </button>
      </div>
      <button
        type="button"
        className={styles.button}
        aria-pressed={contrast === "high"}
        onClick={toggleContrast}
      >
        High contrast
      </button>
    </div>
  );
}
