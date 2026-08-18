const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
const header = document.getElementById('header');
const progress = document.getElementById('topProgress');

function closeMenu() {
  nav.classList.remove('open');
  navToggle.classList.remove('active');
  navToggle.setAttribute('aria-expanded', 'false');
}

navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.classList.toggle('active', open);
  navToggle.setAttribute('aria-expanded', String(open));
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

function onScroll() {
  const scrollY = window.scrollY;
  header.classList.toggle('scrolled', scrollY > 40);

  const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${pageHeight > 0 ? (scrollY / pageHeight) * 100 : 0}%`;
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el, index) => {
  el.style.transitionDelay = `${(index % 3) * 70}ms`;
  revealObserver.observe(el);
});

// Очень лёгкий параллакс только для hero-фото: движение минимальное,
// чтобы изображение ощущалось живым, но не выглядело как эффект ради эффекта.
const hero = document.querySelector('.hero');
const heroBg = document.querySelector('.hero-bg');

if (hero && heroBg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('scroll', () => {
    const rect = hero.getBoundingClientRect();
    const progressInHero = Math.min(Math.max(-rect.top / hero.offsetHeight, 0), 1);
    heroBg.style.transform = `scale(1.035) translate3d(0, ${progressInHero * 18}px, 0)`;
  }, { passive: true });
}

// Если ширина стала desktop после открытия мобильного меню — закрываем его.
window.addEventListener('resize', () => {
  if (window.innerWidth > 780) closeMenu();
});
