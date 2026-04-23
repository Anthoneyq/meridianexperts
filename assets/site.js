// Shared site behaviour: nav state, reveal-on-scroll, year, mobile menu
(function () {
  const nav = document.querySelector('.nav');
  const page = nav && nav.dataset.page;
  const isHome = page === 'home';

  // Interior pages get a solid nav; home stays transparent until scroll
  if (nav && !isHome) nav.classList.add('nav--solid');

  // Highlight active link
  if (page) {
    document.querySelectorAll('.nav__links a[data-nav]').forEach(a => {
      if (a.dataset.nav === page) a.classList.add('is-active');
    });
  }

  // Scroll state for home
  if (nav && isHome) {
    const onScroll = () => {
      if (window.scrollY > 40) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => obs.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // Mobile menu (simple toggle)
  const burger = document.querySelector('.nav__burger');
  const links = document.querySelector('.nav__links');
  if (burger && links) {
    burger.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      if (open) {
        links.style.cssText = 'display:flex;flex-direction:column;position:absolute;top:100%;left:0;right:0;background:rgba(17,24,33,0.98);padding:1.5rem var(--gutter);gap:1.25rem;border-bottom:1px solid rgba(176,211,223,0.08);';
      } else {
        links.style.cssText = '';
      }
    });
  }

  // Year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
