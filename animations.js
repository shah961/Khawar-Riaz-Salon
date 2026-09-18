// animations.js
// Lightweight Scroll Reveal & Counter Micro-Interactions
document.addEventListener('DOMContentLoaded', () => {
  // Check reduced motion setting
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // IntersectionObserver for subtle scroll reveals
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Apply subtle inline transition setup to cards and section headers
  const animatableElements = document.querySelectorAll(
    '.category-card, .service-card, .step-card, .pillar-card, .testimonial-card, .contact-info-card'
  );

  animatableElements.forEach((el, idx) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${(idx % 4) * 0.1}s, transform 0.5s ease ${(idx % 4) * 0.1}s`;
    revealObserver.observe(el);
  });
});
