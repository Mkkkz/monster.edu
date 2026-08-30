/* =========================================================
   MONSTER ENERGY — script.js
   Tilt com o mouse, scroll reveal, menu mobile
   ========================================================= */

// ---------- 1. Tilt 3D com o mouse ----------
// Aplica a inclinação 3D aos cards e às latas (imagem).
function enableTilt() {
  const tiltTargets = document.querySelectorAll('.product-card, .hero-can, .about-can');
  tiltTargets.forEach((container) => {
    const inner = container.querySelector('.can-img');
    if (!inner) return;

    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5 .. 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 .. 0.5
      const rotateY = x * 40;   // -20 .. 20 graus
      const rotateX = -y * 16;  // -8 .. 8 graus
      inner.style.transform = `perspective(800px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.04)`;
    });

    container.addEventListener('mouseleave', () => {
      inner.style.transform = '';
    });
  });
}

// ---------- 2. Menu mobile (hambúrguer) ----------
function mobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (!toggle || !menu) return;

  const close = () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
  };

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });

  // Fecha ao clicar em um link
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', close);
  });
}

// ---------- 3. Barra de navegação ao rolar ----------
function navOnScroll() {
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll);
}

// ---------- 4. Revelar seções ao rolar ----------
function revealOnScroll() {
  const revealEls = document.querySelectorAll(
    '.section-title, .section-sub, .product-card, .feature, .about-inner'
  );
  revealEls.forEach((el) => el.classList.add('reveal'));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => io.observe(el));
}

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', () => {
  enableTilt();
  mobileMenu();
  navOnScroll();
  revealOnScroll();
});
