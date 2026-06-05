const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  document.documentElement.style.colorScheme = savedTheme;
}

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-theme");
  const navToggle = document.getElementById("nav-toggle") as HTMLInputElement;
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.checked = false;
    });
  });

  const sunIconHtml = `
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
    </svg>
  `;

  const moonIconHtml = `
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
    </svg>
  `;

  function updateButtonIcon(mode: any) {
    if (!toggleBtn) return;
    toggleBtn.innerHTML = mode.includes("dark") ? sunIconHtml : moonIconHtml;
  }

  const initialMode = getComputedStyle(document.documentElement).colorScheme;
  updateButtonIcon(initialMode);

  toggleBtn?.addEventListener("click", () => {
    const currentMode = getComputedStyle(document.documentElement).colorScheme;
    const newMode = currentMode.includes("dark") ? "light" : "dark";

    document.documentElement.style.colorScheme = newMode;
    localStorage.setItem("theme", newMode);

    updateButtonIcon(newMode);
  });
});
