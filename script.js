// ---------- Mobile navigation ----------
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---------- Header + scroll progress ----------
const header = document.getElementById('header');
const scrollProgress = document.getElementById('scrollProgress');

function updateScrollUI() {
  const y = window.scrollY;
  header?.classList.toggle('scrolled', y > 35);

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? y / maxScroll : 0;

  if (scrollProgress) {
    scrollProgress.style.transform = `scaleX(${Math.min(progress, 1)})`;
  }
}

window.addEventListener('scroll', updateScrollUI, { passive: true });
window.addEventListener('resize', updateScrollUI);
updateScrollUI();

// ---------- Reveal on scroll ----------
const revealSelector = '.master-card, .review-card, .location-card, .gallery-item, .service-list li';

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.classList.add('reveal');
    requestAnimationFrame(() => entry.target.classList.add('in-view'));
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });

document.querySelectorAll(revealSelector).forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 0.07}s`;
  observer.observe(el);
});

// ---------- Slight hero parallax ----------
const hero = document.querySelector('.hero');
const heroImage = document.querySelector('.hero-bg');

if (hero && heroImage && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('scroll', () => {
    const rect = hero.getBoundingClientRect();

    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      const offset = Math.max(-20, Math.min(20, -rect.top * 0.045));
      heroImage.style.transform = `scale(1.035) translateY(${offset}px)`;
    }
  }, { passive: true });
}
