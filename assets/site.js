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

  // ============================================================
  // Calendly popup — global handler for all [data-calendly] triggers
  // ============================================================
  const CALENDLY_URL = 'https://calendly.com/dkessinger-meridianexperts/expert-case-evaluation';

  const ensureCalendlyLoaded = () => new Promise((resolve) => {
    if (window.Calendly) return resolve();
    // Stylesheet
    if (!document.querySelector('link[href*="calendly.com/assets/external/widget.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      document.head.appendChild(link);
    }
    // Script
    let s = document.querySelector('script[src*="calendly.com/assets/external/widget.js"]');
    if (!s) {
      s = document.createElement('script');
      s.src = 'https://assets.calendly.com/assets/external/widget.js';
      s.async = true;
      document.body.appendChild(s);
    }
    const poll = setInterval(() => {
      if (window.Calendly) { clearInterval(poll); resolve(); }
    }, 50);
  });

  const openCalendly = (url) => {
    ensureCalendlyLoaded().then(() => {
      if (window.Calendly && window.Calendly.initPopupWidget) {
        window.Calendly.initPopupWidget({ url: url || CALENDLY_URL });
      }
    });
  };

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-calendly]');
    if (!trigger) return;
    e.preventDefault();
    openCalendly(trigger.getAttribute('data-calendly') || CALENDLY_URL);
  });

  // Inline widget auto-init
  document.querySelectorAll('.calendly-inline-widget[data-url]').forEach(() => {
    ensureCalendlyLoaded();
  });

  // Expose for inline code if ever needed
  window.openCalendly = openCalendly;

  // Video blob-load helper (works around dev servers without byte-range support)
  // Also acts as a belt-and-suspenders loop guard.
  const loadVideo = async (v) => {
    if (!v || !v.dataset.src) return;
    const src = v.dataset.src;
    try {
      const r = await fetch(src);
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const blob = await r.blob();
      v.src = URL.createObjectURL(blob);
      await v.play().catch(() => {});
    } catch (e) {
      v.src = src; // fallback to native streaming
      v.play().catch(() => {});
    }
    v.addEventListener('ended', () => { v.currentTime = 0; v.play().catch(() => {}); });
  };
  document.querySelectorAll('video[data-src]').forEach(loadVideo);

  // ============================================================
  // Gold glow — cursor-following accent on dark surfaces site-wide
  // ============================================================
  // Auto-tag dark surfaces so the glow applies without per-page markup
  const DARK_SURFACE_SELECTORS = [
    '.trust',
    '.pagehead',
    '.authority',
    '.jurisdictions-map',
    '.diff__col--us',
    '.contact-sidebar',
    '.logo-reveal',
    'footer'
  ];
  document.querySelectorAll(DARK_SURFACE_SELECTORS.join(',')).forEach((el) => {
    el.classList.add('glow-surface');
  });

  document.querySelectorAll('.glow-surface').forEach((surface) => {
    let raf = 0;
    surface.addEventListener('pointermove', (e) => {
      const rect = surface.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        surface.style.setProperty('--glow-x', x + 'px');
        surface.style.setProperty('--glow-y', y + 'px');
        surface.style.setProperty('--glow-opacity', '1');
      });
    });
    surface.addEventListener('pointerleave', () => {
      surface.style.setProperty('--glow-opacity', '0');
    });
  });
})();
