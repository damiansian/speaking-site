/*
 * Runs before paint (injected in <head>) to set data-theme / data-contrast on
 * <html> from localStorage, falling back to OS preferences. Prevents a flash of
 * the wrong theme and keeps the server-rendered markup in sync on hydration.
 * Kept as a plain string with no external references so it can be inlined.
 */
export const themeScript = `
(function () {
  try {
    var d = document.documentElement;
    var storedTheme = localStorage.getItem('theme');
    var storedContrast = localStorage.getItem('contrast');
    var theme = storedTheme === 'light' || storedTheme === 'dark'
      ? storedTheme
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var contrast = storedContrast === 'high' || storedContrast === 'normal'
      ? storedContrast
      : (window.matchMedia('(prefers-contrast: more)').matches ? 'high' : 'normal');
    d.setAttribute('data-theme', theme);
    d.setAttribute('data-contrast', contrast);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.setAttribute('data-contrast', 'normal');
  }
})();
`;
