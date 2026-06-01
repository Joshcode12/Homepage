const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.style.colorScheme = savedTheme;
}

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-theme");

  toggleBtn?.addEventListener("click", () => {
    const currentMode = getComputedStyle(document.documentElement).colorScheme;
    const newMode = currentMode.includes("dark") ? "light" : "dark";

    document.documentElement.style.colorScheme = newMode;

    localStorage.setItem("theme", newMode);
  });
});
