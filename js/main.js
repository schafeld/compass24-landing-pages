/**
 * Main JavaScript for Compass24 Landing Pages
 * 
 * Handles:
 * - Component imports
 * - Intersection Observer animations
 * - Accessibility enhancements
 * - Mobile navigation
 */

// Import Web Components
import './components/image-slider.js';
import './components/animated-counter.js';

/**
 * Initialize scroll-triggered animations
 * Elements with [data-animate] will animate when visible
 */
function initScrollAnimations() {
  // Respect reduced motion preferences
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('[data-animate]').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Optionally unobserve after animation
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });
}

/**
 * Initialize mobile navigation toggle
 */
function initMobileNav() {
  const navToggle = document.querySelector('.header__nav-toggle');
  const nav = document.querySelector('.header__nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('header__nav--mobile-open');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.textContent = isOpen ? '✕' : '☰';
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('header__nav--mobile-open')) {
        nav.classList.remove('header__nav--mobile-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.textContent = '☰';
      }
    });
  }
}

/**
 * Enhance details/summary accordions with animations
 */
function initAccordions() {
  document.querySelectorAll('details.accordion').forEach(details => {
    const summary = details.querySelector('summary');
    const content = details.querySelector('.accordion__content');

    if (!summary || !content) return;

    summary.addEventListener('click', (e) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      e.preventDefault();

      if (details.open) {
        // Closing
        content.style.maxHeight = content.scrollHeight + 'px';
        requestAnimationFrame(() => {
          content.style.maxHeight = '0';
          content.addEventListener('transitionend', () => {
            details.open = false;
            content.style.maxHeight = '';
          }, { once: true });
        });
      } else {
        // Opening
        details.open = true;
        const height = content.scrollHeight;
        content.style.maxHeight = '0';
        requestAnimationFrame(() => {
          content.style.maxHeight = height + 'px';
          content.addEventListener('transitionend', () => {
            content.style.maxHeight = '';
          }, { once: true });
        });
      }
    });
  });
}

/**
 * Add smooth anchor scrolling
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
          block: 'start'
        });

        // Update focus for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus();
      }
    });
  });
}

/**
 * Initialize parallax effects for hero sections
 */
function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const heroElements = document.querySelectorAll('.hero--parallax');
  
  if (heroElements.length === 0) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        heroElements.forEach(hero => {
          const rate = scrolled * 0.3;
          hero.style.backgroundPositionY = `calc(50% + ${rate}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/**
 * Initialize page
 */
function init() {
  initScrollAnimations();
  initMobileNav();
  initAccordions();
  initSmoothScroll();
  initParallax();
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

export { init };
