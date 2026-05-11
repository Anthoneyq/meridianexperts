// Meridian v2 — shared interactions
(function () {
  // Fade-in on scroll
  const els = document.querySelectorAll('.fade');
  if ('IntersectionObserver' in window && els.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    els.forEach((el) => io.observe(el));
  } else {
    els.forEach((el) => el.classList.add('is-visible'));
  }

  // Year auto-fill
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
