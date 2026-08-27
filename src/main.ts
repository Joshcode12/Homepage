import { initProjects } from "./projects";

const toggleBtn = document.getElementById(
  "toggle-theme",
) as HTMLButtonElement | null;

const sunIcon = `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
const moonIcon = `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

const savedTheme = localStorage.getItem("theme");
const systemPrefersDark = window.matchMedia(
  "(prefers-color-scheme: dark)",
).matches;
let currentTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

function applyTheme(theme: string) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  if (toggleBtn) {
    toggleBtn.innerHTML = theme === "dark" ? sunIcon : moonIcon;
    toggleBtn.setAttribute(
      "aria-label",
      `Switch to ${theme === "dark" ? "light" : "dark"} mode`,
    );
  }
}

applyTheme(currentTheme);

toggleBtn?.addEventListener("click", () => {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme(currentTheme);
});

// Initialize dynamic project fetching
initProjects();