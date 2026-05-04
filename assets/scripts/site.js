function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((item) => observer.observe(item));
}

function setupActiveNav() {
  const links = document.querySelectorAll(".site-nav a[href^='#']");
  const byId = new Map(Array.from(links).map((link) => [link.hash.slice(1), link]));
  const sections = Array.from(document.querySelectorAll("main [id]")).filter((section) =>
    byId.has(section.id)
  );
  if (!sections.length || !links.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => link.removeAttribute("aria-current"));
        const active = byId.get(entry.target.id);
        if (active) active.setAttribute("aria-current", "page");
      });
    },
    { rootMargin: "-38% 0px -54% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

document.addEventListener("DOMContentLoaded", () => {
  setupReveal();
  setupActiveNav();
});
