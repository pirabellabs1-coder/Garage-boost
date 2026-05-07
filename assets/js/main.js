/* Garage Boost — main interactions */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Header scroll state ---------- */
  const header = document.querySelector('.header');
  const onScroll = () => {
    if (window.scrollY > 30) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu (auto-injection sur toutes les pages) ---------- */
  // 1. Inject le bouton menu-toggle dans .nav-cta s'il manque
  const navCta = document.querySelector('.nav-cta');
  if (navCta && !navCta.querySelector('.menu-toggle')) {
    const btn = document.createElement('button');
    btn.className = 'menu-toggle';
    btn.setAttribute('aria-label', 'Menu');
    btn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    navCta.appendChild(btn);
  }

  // 2. Inject le .mobile-menu dans le body s'il manque (paths absolus)
  if (!document.querySelector('.mobile-menu')) {
    const mm = document.createElement('div');
    mm.className = 'mobile-menu';
    mm.innerHTML = `
      <button class="mobile-menu-close" aria-label="Fermer"><i class="fa-solid fa-xmark"></i></button>
      <ul class="mobile-menu-list">
        <li><a href="/tarifs.html">Tarifs</a></li>
        <li><a href="/rendez-vous.html">Prise de rendez-vous</a></li>
        <li><a href="/entretien-assistance.html">Entretien & assistance</a></li>
        <li><a href="/maintenance-moteur.html">Maintenance moteur & anti-pollution</a></li>
        <li><a href="/carrosserie.html">Carrosserie</a></li>
        <li><a href="/location.html">Location de véhicules</a></li>
        <li><a href="/villes.html">Villes desservies</a></li>
        <li><a href="/faq.html">FAQ</a></li>
        <li><a href="/blog.html">Blog</a></li>
        <li><a href="/contact.html">Contact</a></li>
      </ul>
    `;
    document.body.appendChild(mm);
  }

  // 3. Brancher les events
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-menu-close');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => mobileMenu.classList.add('open'));
  }
  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
  }
  document.querySelectorAll('.mobile-menu a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ---------- Scroll reveal ---------- */
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* ---------- Stat counter ---------- */
  const counters = document.querySelectorAll('[data-counter]');
  const counterObs = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.counter, 10);
        const duration = 1600;
        const start = performance.now();
        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(target * eased).toLocaleString('fr-FR');
          if (progress < 1) requestAnimationFrame(animate);
          else el.textContent = target.toLocaleString('fr-FR') + (el.dataset.suffix || '');
        };
        requestAnimationFrame(animate);
        counterObs.unobserve(el);
      });
    },
    { threshold: 0.4 }
  );
  counters.forEach(c => counterObs.observe(c));

  /* ---------- Marquee duplicate (seamless loop) ---------- */
  document.querySelectorAll('.marquee-track').forEach(track => {
    track.innerHTML = track.innerHTML + track.innerHTML;
  });

});
