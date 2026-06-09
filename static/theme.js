(function () {
  const storageKey = "theme";
  const root = document.documentElement;

  function getStoredTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch {
      // Theme persistence is optional; the selected theme still applies for this page.
    }
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = getStoredTheme() || (prefersDark ? "dark" : "light");

  root.setAttribute("data-theme", initialTheme);

  window.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("theme-toggle");

    if (!button) {
      return;
    }

    button.addEventListener("click", () => {
      const current = root.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";

      root.setAttribute("data-theme", next);
      storeTheme(next);
    });
  });
})();
