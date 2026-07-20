import ThemeControls from "./ThemeControls";
import styles from "./SiteHeader.module.css";

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <a href="#top" className={styles.brand}>
          Damian Sian
        </a>
        <ThemeControls />
      </div>
    </header>
  );
}
