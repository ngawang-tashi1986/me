// ---------------------------
// Mobile nav toggle
// ---------------------------
const header = document.querySelector('.nav');
const hamburger = document.getElementById('hamburger');
const mobilePanel = document.getElementById('mobilePanel');

function setMobile(open){
  header.classList.toggle('nav-open', open);
  hamburger.setAttribute('aria-expanded', String(open));
  mobilePanel.hidden = !open;
}

hamburger?.addEventListener('click', () => {
  const open = !header.classList.contains('nav-open');
  setMobile(open);
});

// Close mobile nav after tapping a link
document.querySelectorAll('a[data-link]').forEach(a => {
  a.addEventListener('click', () => {
    if (window.matchMedia('(max-width: 720px)').matches) setMobile(false);
  });
});

// ---------------------------
// Scroll reveal animations
// ---------------------------
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

revealEls.forEach(el => {
  // Hero starts visible; the rest will reveal on scroll
  if (!el.closest('.hero')) revealObserver.observe(el);
});

// ---------------------------
// Skill bar animation on scroll
// ---------------------------
const skillBlocks = document.querySelectorAll('[data-skill]');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const block = entry.target;
    const fill = block.querySelector('.fill');
    const bar = block.querySelector('.bar');

    if (fill && bar) {
      const level = fill.getAttribute('data-level') || '0';
      fill.style.width = `${level}%`;
      bar.setAttribute('aria-valuenow', level);
    }

    skillObserver.unobserve(block);
  });
}, { threshold: 0.25 });

skillBlocks.forEach(b => skillObserver.observe(b));

// ---------------------------
// Active nav link highlighting
// ---------------------------
const navLinks = document.querySelectorAll('a[data-link]');
const sections = Array.from(navLinks)
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const id = `#${entry.target.id}`;
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
  });
}, { rootMargin: '-45% 0px -45% 0px', threshold: 0.01 });

sections.forEach(s => sectionObserver.observe(s));

// ---------------------------
// Subtle hero parallax effect
// ---------------------------
const hero = document.querySelector('.hero');
let ticking = false;

function onScroll(){
  if (!hero) return;
  if (ticking) return;
  ticking = true;

  window.requestAnimationFrame(() => {
    const y = window.scrollY || 0;
    // Keep it subtle
    const parallax = Math.min(20, y * 0.04);
    hero.style.setProperty('--parallax', `${parallax}px`);
    ticking = false;
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---------------------------
// Contact form (front-end only)
// ---------------------------
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  const name = (fd.get('name') || '').toString().trim();

  statusEl.textContent = `Thanks${name ? `, ${name}` : ''}! Your message is ready to send. (This form is demo-only.)`;
  form.reset();
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
