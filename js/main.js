// ===== BibTeX copy =====
const bibtexBtn = document.getElementById("bibtex-copy");
const bibtexSource = document.getElementById("bibtex-source");

if (bibtexBtn && bibtexSource) {
  bibtexBtn.addEventListener("click", async () => {
    const label = bibtexBtn.querySelector("span");
    const original = label.textContent;
    try {
      await navigator.clipboard.writeText(bibtexSource.textContent.trim());
      label.textContent = "Copied!";
    } catch (e) {
      label.textContent = "Copy failed";
    }
    bibtexBtn.classList.add("is-copied");
    setTimeout(() => {
      label.textContent = original;
      bibtexBtn.classList.remove("is-copied");
    }, 1800);
  });
}

// ===== Theme toggle =====
const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    if (isLight) {
      document.documentElement.removeAttribute("data-theme");
      try { localStorage.setItem("theme", "dark"); } catch (e) {}
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      try { localStorage.setItem("theme", "light"); } catch (e) {}
    }
  });
}

// ===== Mobile nav toggle =====
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll(".reveal");
const skillItems = document.querySelectorAll(".skill-item");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => revealObserver.observe(el));
skillItems.forEach((el) => revealObserver.observe(el));

// ===== Hero typewriter =====
const roles = [
  "AI Researcher",
  "NLP & Explainable AI",
  "AI Safety",
  "Cognitive Science MSc (Incoming)",
  "Trustworthy Machine Learning",
];

const typewriterEl = document.getElementById("typewriter");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  if (!typewriterEl) return;
  const current = roles[roleIndex];

  if (!deleting) {
    charIndex++;
    typewriterEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    charIndex--;
    typewriterEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeLoop, deleting ? 35 : 65);
}

typeLoop();

// ===== Expandable project cards =====
document.querySelectorAll(".project-toggle").forEach((btn) => {
  const details = btn.nextElementSibling;
  if (!details) return;

  btn.addEventListener("click", () => {
    const isOpen = btn.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(isOpen));
    btn.querySelector(".toggle-label").textContent = isOpen ? "Hide" : "Details";
    details.style.maxHeight = isOpen ? details.scrollHeight + "px" : "0px";
  });
});
