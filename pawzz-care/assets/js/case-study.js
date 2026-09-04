// Case study page — plain IntersectionObserver scroll reveals (no library
// needed for this page: fades/slides via .cs-reveal/.cs-reveal-stagger, and
// SVG path draw-ins / the timeline fill via toggling .is-visible).
document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll('.cs-reveal, .cs-reveal-stagger, .cs-diagram, .cs-timeline');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' });

  targets.forEach((el) => observer.observe(el));
});
