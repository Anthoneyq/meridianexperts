/* ============================================================
   MERIDIAN EXPERTS — shared behaviour + motion
   Visibility-critical reveals run on CSS transitions +
   IntersectionObserver (never dependent on rAF/GSAP ticker).
   GSAP layers on enhancements only: parallax, scrub, counters.
============================================================ */
(function () {
  'use strict';

  /* Mark JS availability — reveal styles are gated on html.js */
  document.documentElement.classList.add('js');

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Masked word-reveal helper (GSAP-driven) ----------
     Splits a heading into per-word masks. The hidden state is set
     ONLY when GSAP is present and motion is allowed — otherwise the
     heading is left as plain, fully-visible text. Exposed on window
     so the home hero can re-trigger it after a tweak swaps the H1. */
  function splitHeading(el) {
    if (!el || el.__split) return [];
    el.__split = true;
    var inners = [];
    function makeWord(text, dest) {
      var outer = document.createElement('span'); outer.className = 'rw';
      var inner = document.createElement('span'); inner.className = 'rw-i';
      inner.textContent = text; outer.appendChild(inner);
      dest.appendChild(outer); inners.push(inner);
    }
    function walk(src, dest) {
      Array.prototype.forEach.call(src.childNodes, function (n) {
        if (n.nodeType === 3) {
          n.textContent.split(/(\s+)/).forEach(function (p) {
            if (p === '') return;
            if (/^\s+$/.test(p)) dest.appendChild(document.createTextNode(' '));
            else makeWord(p, dest);
          });
        } else if (n.nodeType === 1) {
          var clone = document.createElement(n.tagName);
          walk(n, clone);
          dest.appendChild(clone);
        }
      });
    }
    var holder = document.createElement('span');
    walk(el, holder);
    el.innerHTML = '';
    while (holder.firstChild) el.appendChild(holder.firstChild);
    return inners;
  }
  window.__meridianRevealHeading = function (el, opts) {
    opts = opts || {};
    if (!window.gsap || REDUCED) return;     // leave plain text in place
    var inners = splitHeading(el);
    if (!inners.length) return;
    gsap.set(inners, { yPercent: 118 });
    var st = opts.scroll === false ? null : {
      trigger: opts.trigger || el, start: 'top 84%', once: true
    };
    gsap.to(inners, {
      yPercent: 0, duration: 1.15, ease: 'expo.out',
      stagger: 0.055, delay: opts.delay || 0,
      scrollTrigger: st
    });
  };

  /* ---------- Nav: active link, scroll shadow, mobile menu ---------- */
  var nav = document.querySelector('.site-nav');
  var page = nav && nav.getAttribute('data-page');
  if (page) {
    document.querySelectorAll('.site-nav__links a[data-nav]').forEach(function (a) {
      if (a.getAttribute('data-nav') === page) a.classList.add('is-active');
    });
  }
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
  var burger = document.querySelector('.site-nav__burger');
  var links = document.querySelector('.site-nav__links');
  if (burger && links) {
    burger.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---------- Reveals: IO adds .is-in, CSS transitions do the motion ---------- */
  var revealEls = document.querySelectorAll('[data-reveal], .sec-rule, .exhibit');
  if ('IntersectionObserver' in window && revealEls.length) {
    var pending = 0;
    var io = new IntersectionObserver(function (entries) {
      var batchDelay = 0;
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        /* gentle stagger within a simultaneous batch */
        if (!el.hasAttribute('data-delay')) {
          el.style.transitionDelay = el.style.transitionDelay || (batchDelay + 'ms');
          batchDelay = Math.min(batchDelay + 90, 450);
        }
        el.classList.add('is-in');
        if (el.classList.contains('exhibit')) el.classList.add('is-live');
        io.unobserve(el);
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in', 'is-live'); });
  }

  /* Fallback sweep — IO/rAF callbacks can be throttled or suspended in
     embedded/background contexts. A setTimeout-throttled scroll listener
     guarantees reveals regardless. IO above stays the primary trigger. */
  var sweepQueue = Array.prototype.slice.call(revealEls);
  var sweepScheduled = false;
  var sweep = function () {
    sweepScheduled = false;
    if (!sweepQueue.length) return;
    var vh = window.innerHeight || document.documentElement.clientHeight;
    sweepQueue = sweepQueue.filter(function (el) {
      if (el.classList.contains('is-in')) return false;
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) {
        el.classList.add('is-in');
        if (el.classList.contains('exhibit')) el.classList.add('is-live');
        return false;
      }
      return true;
    });
  };
  var scheduleSweep = function () {
    if (sweepScheduled) return;
    sweepScheduled = true;
    setTimeout(sweep, 120);
  };
  window.addEventListener('scroll', scheduleSweep, { passive: true });
  window.addEventListener('resize', scheduleSweep, { passive: true });
  setTimeout(sweep, 250);
  setTimeout(sweep, 1400);

  /* ---------- Hero / pagehead intro (CSS-delayed children) ---------- */
  ['.hero', '.pagehead'].forEach(function (sel) {
    var el = document.querySelector(sel);
    if (el) setTimeout(function () { el.classList.add('is-in'); }, 80);
  });

  /* ---------- Blueprint plot tracing — CSS stroke transitions ---------- */
  document.querySelectorAll('svg.plot-draw').forEach(function (svg) {
    var strokes = svg.querySelectorAll('line, rect');
    var labels = svg.querySelectorAll('text');
    if (!REDUCED) {
      strokes.forEach(function (s, i) {
        var len;
        try { len = s.getTotalLength(); } catch (e) { len = 1400; }
        s.style.strokeDasharray = len;
        s.style.strokeDashoffset = len;
        s.style.transition = 'stroke-dashoffset 2.4s cubic-bezier(.4,0,.2,1) ' + (0.4 + i * 0.22) + 's';
      });
      labels.forEach(function (t, i) {
        t.style.opacity = '0';
        t.style.transition = 'opacity 1.2s ease ' + (1.6 + i * 0.25) + 's';
      });
    }
    var fire = function () {
      strokes.forEach(function (s) { s.style.strokeDashoffset = '0'; });
      labels.forEach(function (t) { t.style.opacity = '1'; });
    };
    if ('IntersectionObserver' in window && !REDUCED) {
      var pio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { requestAnimationFrame(fire); setTimeout(fire, 120); pio.unobserve(svg); }
        });
      }, { threshold: 0.2 });
      pio.observe(svg);
    } else { fire(); }
  });

  /* ---------- Gold glow — faint, small, lazily trailing the cursor ---------- */
  var DARK_SURFACES = ['.section--fade', '.section--tint', '.section--rise', '.section--pit', '.cta-final', '.pagehead', '.path--dark', '.sidebar-card', '.site-footer', '.hero'];
  document.querySelectorAll(DARK_SURFACES.join(',')).forEach(function (el) {
    el.classList.add('glow-surface');
  });
  var glowSurfaces = [];
  document.querySelectorAll('.glow-surface').forEach(function (surface) {
    var state = { el: surface, x: 0, y: 0, tx: 0, ty: 0, active: false, seeded: false };
    glowSurfaces.push(state);
    surface.addEventListener('pointermove', function (e) {
      var rect = surface.getBoundingClientRect();
      state.tx = e.clientX - rect.left;
      state.ty = e.clientY - rect.top;
      if (!state.seeded) { state.x = state.tx; state.y = state.ty; state.seeded = true; }
      if (!state.active) {
        state.active = true;
        surface.style.setProperty('--glow-opacity', '1');
      }
    });
    surface.addEventListener('pointerleave', function () {
      state.active = false;
      surface.style.setProperty('--glow-opacity', '0');
    });
  });
  if (glowSurfaces.length && !REDUCED) {
    var glowTick = function () {
      glowSurfaces.forEach(function (s) {
        if (!s.seeded) return;
        s.x += (s.tx - s.x) * 0.075;
        s.y += (s.ty - s.y) * 0.075;
        s.el.style.setProperty('--glow-x', s.x.toFixed(1) + 'px');
        s.el.style.setProperty('--glow-y', s.y.toFixed(1) + 'px');
      });
      requestAnimationFrame(glowTick);
    };
    requestAnimationFrame(glowTick);
  }

  /* ---------- Exhibits: pointer drift (enhancement only) ---------- */
  if (!REDUCED) {
    var driftStates = [];
    document.querySelectorAll('.exhibit').forEach(function (ex) {
      var img = ex.querySelector('.exhibit__frame img');
      if (!img) return;
      var st = { img: img, x: 0, y: 0, tx: 0, ty: 0, s: 1.05, ts: 1.05 };
      driftStates.push(st);
      ex.addEventListener('pointermove', function (e) {
        var r = ex.getBoundingClientRect();
        st.tx = ((e.clientX - r.left) / r.width - 0.5) * 10;
        st.ty = ((e.clientY - r.top) / r.height - 0.5) * 8;
      });
      ex.addEventListener('pointerenter', function () { st.ts = 1.09; });
      ex.addEventListener('pointerleave', function () { st.ts = 1.05; st.tx = 0; st.ty = 0; });
    });
    if (driftStates.length) {
      var driftTick = function () {
        driftStates.forEach(function (s) {
          s.x += (s.tx - s.x) * 0.05;
          s.y += (s.ty - s.y) * 0.05;
          s.s += (s.ts - s.s) * 0.05;
          s.img.style.transform = 'translate3d(' + s.x.toFixed(2) + 'px,' + s.y.toFixed(2) + 'px,0) scale(' + s.s.toFixed(4) + ')';
        });
        requestAnimationFrame(driftTick);
      };
      requestAnimationFrame(driftTick);
    }
  }

  /* ---------- Year ---------- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- Video loader (fetch → blob, with direct-src fallback) ---------- */
  document.querySelectorAll('video[data-src]').forEach(function (v) {
    var src = v.getAttribute('data-src');
    fetch(src)
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.blob(); })
      .then(function (b) { v.src = URL.createObjectURL(b); return v.play(); })
      .catch(function () { v.src = src; v.play().catch(function () {}); });
  });

  /* ---------- Calendly popup ---------- */
  var CALENDLY_URL = 'https://calendly.com/dkessinger-meridianexperts/expert-case-evaluation';
  var ensureCalendly = function () {
    return new Promise(function (resolve) {
      if (window.Calendly) return resolve();
      if (!document.querySelector('link[href*="calendly.com/assets/external/widget.css"]')) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://assets.calendly.com/assets/external/widget.css';
        document.head.appendChild(link);
      }
      if (!document.querySelector('script[src*="calendly.com/assets/external/widget.js"]')) {
        var s = document.createElement('script');
        s.src = 'https://assets.calendly.com/assets/external/widget.js';
        s.async = true;
        document.body.appendChild(s);
      }
      var poll = setInterval(function () {
        if (window.Calendly) { clearInterval(poll); resolve(); }
      }, 50);
    });
  };
  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-calendly]');
    if (!trigger) return;
    e.preventDefault();
    ensureCalendly().then(function () {
      if (window.Calendly && window.Calendly.initPopupWidget) {
        window.Calendly.initPopupWidget({ url: trigger.getAttribute('data-calendly') || CALENDLY_URL });
      }
    });
  });

  /* ============================================================
     GSAP — enhancements only. If GSAP/ticker is unavailable,
     everything above still renders and reveals correctly.
  ============================================================ */
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  /* ---------- Hairline scroll-progress meter ---------- */
  var progress = document.createElement('div');
  progress.className = 'scroll-progress';
  document.body.appendChild(progress);
  gsap.to(progress, {
    scaleX: 1, ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.3 }
  });

  /* ---------- Auto-hiding nav (shows on scroll up, hides on down) ---------- */
  if (nav) {
    var navShown = true;
    ScrollTrigger.create({
      start: 'top top', end: 'max',
      onUpdate: function (self) {
        if (links && links.classList.contains('is-open')) return;
        var y = self.scroll();
        if (y < 220) { if (!navShown) { nav.classList.remove('is-hidden'); navShown = true; } return; }
        if (self.direction === 1 && navShown) { nav.classList.add('is-hidden'); navShown = false; }
        else if (self.direction === -1 && !navShown) { nav.classList.remove('is-hidden'); navShown = true; }
      }
    });
  }

  var mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', function () {

    /* Masked word reveals on every major heading */
    gsap.utils.toArray('.sec-head h2, .cta-final h2, .pagehead h1').forEach(function (h) {
      window.__meridianRevealHeading(h);
    });

    /* Hero corner ticks draw in after the headline cascade */
    gsap.from('.hero__tick', {
      scale: 0, opacity: 0, transformOrigin: 'center',
      duration: 1.1, stagger: 0.12, ease: 'power3.out', delay: 0.5
    });

    /* Hero depth — content drifts up & fades, media parallaxes slower */
    if (document.querySelector('.hero')) {
      gsap.to('.hero__inner', {
        yPercent: 22, opacity: 0.15, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      });
      gsap.to('.hero__media', {
        yPercent: 16, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      });
      gsap.to('.hero__cue', {
        opacity: 0, y: 30, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: '30% top', scrub: true }
      });
    }

    /* Section index numerals drift gently against the scroll */
    gsap.utils.toArray('.sec-rule__num').forEach(function (n) {
      gsap.fromTo(n, { yPercent: 60 }, {
        yPercent: -60, ease: 'none',
        scrollTrigger: { trigger: n.closest('.sec-rule'), start: 'top bottom', end: 'bottom top', scrub: 1 }
      });
    });

    /* Trust strip + footer columns — quiet staggered entrances */
    if (document.querySelector('.trust-strip__items')) {
      gsap.from('.trust-strip__items li', {
        opacity: 0, y: 16, duration: 0.7, stagger: 0.07, ease: 'power2.out',
        scrollTrigger: { trigger: '.trust-strip', start: 'top 88%' }
      });
    }
    if (document.querySelector('.site-footer__top')) {
      gsap.from('.site-footer__top > div', {
        opacity: 0, y: 22, duration: 0.8, stagger: 0.09, ease: 'power2.out',
        scrollTrigger: { trigger: '.site-footer', start: 'top 92%' }
      });
    }

    /* Magnetic buttons — pointer-fine devices only */
    var magnetic = [];
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      gsap.utils.toArray('.btn').forEach(function (btn) {
        var xTo = gsap.quickTo(btn, 'x', { duration: 1.1, ease: 'power3' });
        var yTo = gsap.quickTo(btn, 'y', { duration: 1.1, ease: 'power3' });
        var move = function (e) {
          var r = btn.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.28);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.45);
        };
        var reset = function () { xTo(0); yTo(0); };
        btn.addEventListener('pointermove', move);
        btn.addEventListener('pointerleave', reset);
        magnetic.push(function () {
          btn.removeEventListener('pointermove', move);
          btn.removeEventListener('pointerleave', reset);
          gsap.set(btn, { x: 0, y: 0 });
        });
      });
    }

    /* Settle layout once split/parallax DOM mutations are in */
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
    }
    ScrollTrigger.refresh();

    return function () { magnetic.forEach(function (fn) { fn(); }); };
  });

  var mmLegacy = gsap.matchMedia();
  mmLegacy.add('(prefers-reduced-motion: no-preference)', function () {

    /* Subtle parallax on tagged media */
    gsap.utils.toArray('[data-parallax]').forEach(function (wrap) {
      var inner = wrap.firstElementChild;
      if (!inner) return;
      gsap.fromTo(inner, { yPercent: -4 }, {
        yPercent: 4,
        ease: 'none',
        scrollTrigger: { trigger: wrap, start: 'top bottom', end: 'bottom top', scrub: 0.8 }
      });
    });

    /* Process rail progress line */
    var railProgress = document.querySelector('.rail__progress');
    if (railProgress) {
      gsap.to(railProgress, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.rail',
          start: 'top 70%',
          end: 'bottom 60%',
          scrub: 0.6
        }
      });
    }

    /* Counters — markup already contains the final number, so a
       frozen ticker degrades gracefully to the static value */
    gsap.utils.toArray('[data-count]').forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var obj = { v: 0 };
      gsap.to(obj, {
        v: target,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        onUpdate: function () { el.textContent = Math.round(obj.v); }
      });
    });

    return function () {};
  });

})();
