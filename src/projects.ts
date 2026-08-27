interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  topics: string[];
}

const REPOS: string[] = [
  "JoshuaSLE/vulkan-engine",
  "JoshuaSLE/chat-app",
  "JoshuaSLE/esp32c6-zb-env-node",
  "JoshuaSLE/stm32g-music-player",
];

export async function initProjects(): Promise<void> {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  // Show a loading state immediately while page renders
  grid.innerHTML = `<p class="loading">Loading projects from GitHub...</p>`;

  try {
    const fetchPromises = REPOS.map(async (repo) => {
      const res = await fetch(`https://api.github.com/repos/${repo}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json()) as GitHubRepo;
    });

    const projects = await Promise.all(fetchPromises);
    renderProjects(grid, projects);
  } catch (err) {
    console.error(err);
    grid.innerHTML = `<p class="error">Failed to load projects.</p>`;
  }
}

function renderProjects(container: HTMLElement, projects: GitHubRepo[]): void {
  container.innerHTML = projects
    .map((repo) => {
      const tech = [repo.language, ...(repo.topics || [])]
        .filter(Boolean)
        .join(" • ");
      return `
        <article class="project-card">
          <h3>${repo.name}</h3>
          <p class="project-tech">${tech || "GitHub"}</p>
          <p class="project-description">${repo.description || ""}</p>
          <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="project-link">
            View on GitHub →
          </a>
        </article>
      `;
    })
    .join("");
}
