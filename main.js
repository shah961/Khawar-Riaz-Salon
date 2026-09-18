// main.js
document.addEventListener('DOMContentLoaded', () => {
  // Update Footer Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile Navigation Menu Logic (EXPLICIT CLICK ONLY - NO SWIPE)
  const menuToggle = document.getElementById('menu-toggle');
  const primaryNav = document.getElementById('primary-navigation');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && primaryNav) {
    const toggleMenu = (open) => {
      const isExpanded = open !== undefined ? open : menuToggle.getAttribute('aria-expanded') !== 'true';
      menuToggle.setAttribute('aria-expanded', isExpanded);
      
      if (isExpanded) {
        primaryNav.classList.add('is-active');
        document.body.classList.add('nav-open');
      } else {
        primaryNav.classList.remove('is-active');
        document.body.classList.remove('nav-open');
      }
    };

    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close menu when clicking navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && primaryNav.classList.contains('is-active')) {
        toggleMenu(false);
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (primaryNav.classList.contains('is-active') && !primaryNav.contains(e.target) && !menuToggle.contains(e.target)) {
        toggleMenu(false);
      }
    });
  }

  // Services Filter Tabs Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceBlocks = document.querySelectorAll('.service-category-block');

  if (filterBtns.length > 0 && serviceBlocks.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });

        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const filterValue = btn.getAttribute('data-filter');

        serviceBlocks.forEach(block => {
          if (filterValue === 'all' || block.getAttribute('data-category') === filterValue) {
            block.style.display = 'block';
          } else {
            block.style.display = 'none';
          }
        });
      });
    });

    // Check URL Parameters for initial category filter (e.g., services.html?cat=men)
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat');
    if (catParam) {
      let targetFilter = 'all';
      if (catParam === 'men') targetFilter = 'men-hair';
      if (catParam === 'women') targetFilter = 'women-hair';
      if (catParam === 'facial') targetFilter = 'facials';
      if (catParam === 'grooming') targetFilter = 'men-hair';
      if (catParam === 'massage') targetFilter = 'massage';
      if (catParam === 'mani-pedi') targetFilter = 'mani-pedi';

      const targetBtn = document.querySelector(`.filter-btn[data-filter="${targetFilter}"]`);
      if (targetBtn) targetBtn.click();
    }
  }

  // Appointment Form Feedback Handler
  const appointmentForm = document.getElementById('appointment-form');
  const formFeedback = document.getElementById('form-feedback');

  if (appointmentForm && formFeedback) {
    appointmentForm.addEventListener('submit', (e) => {
      // Allow mailto action or standard handling while giving feedback
      formFeedback.style.color = 'var(--accent-gold)';
      formFeedback.textContent = 'Preparing your appointment request details... Please confirm via WhatsApp or phone call if urgent.';
    });
  }
});
