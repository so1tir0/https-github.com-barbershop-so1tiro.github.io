// Мобильное меню
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Шапка становится тёмной при скролле
const header = document.getElementById('header');
function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', updateHeader);
updateHeader();

// Появление блоков при прокрутке
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.master-card, .review-card, .location-card, .gallery-item').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 3) * 0.08}s`;
  observer.observe(el);
});
