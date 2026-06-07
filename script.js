/* ===========================
   HEADER SCROLL
   =========================== */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ===========================
   BURGER MENU
   =========================== */
const burger = document.getElementById('burger');
const nav    = document.getElementById('nav');

burger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';

  // Animate burger → X
  const spans = burger.querySelectorAll('span');
  if (open) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close menu on link click
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    document.body.style.overflow = '';
    burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/* ===========================
   SMOOTH ACTIVE NAV
   =========================== */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('nav a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`nav a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* ===========================
   SCROLL REVEAL
   =========================== */
document.querySelectorAll(
  '.service-card, .review-card, .contact-item, .feature, .about-card-main, .hero-stats'
).forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ===========================
   ANNO CORRENTE NEL FOOTER
   =========================== */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
