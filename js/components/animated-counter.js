/**
 * Animated Counter Web Component
 * 
 * A reusable component that animates counting up to a target number.
 * Uses Intersection Observer to trigger animation when visible.
 * 
 * Features:
 * - Smooth easing animation
 * - Configurable duration and formatting
 * - Respects reduced motion preferences
 * - Locale-aware number formatting
 * 
 * Usage:
 * <animated-counter value="42000" suffix="+" duration="2000">0</animated-counter>
 */

class AnimatedCounter extends HTMLElement {
  constructor() {
    super();
    this.hasAnimated = false;
  }

  connectedCallback() {
    // Check if already visible (for injection scenarios)
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      this.checkVisibilityAndAnimate();
    });
  }

  checkVisibilityAndAnimate() {
    // First, check if element is already visible in viewport
    const rect = this.getBoundingClientRect();
    const isVisible = (
      rect.top < window.innerHeight &&
      rect.bottom > 0 &&
      rect.left < window.innerWidth &&
      rect.right > 0
    );

    if (isVisible && !this.hasAnimated) {
      // Already visible - animate immediately
      this.animate();
      this.hasAnimated = true;
    } else if (!this.hasAnimated) {
      // Not visible yet - set up observer
      this.setupObserver();
    }
  }

  setupObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.hasAnimated) {
            this.animate();
            this.hasAnimated = true;
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 } // Lower threshold for more reliable triggering
    );

    observer.observe(this);
  }

  get targetValue() {
    return parseInt(this.getAttribute('value') || '0', 10);
  }

  get duration() {
    return parseInt(this.getAttribute('duration') || '2000', 10);
  }

  get suffix() {
    return this.getAttribute('suffix') || '';
  }

  get prefix() {
    return this.getAttribute('prefix') || '';
  }

  get locale() {
    return this.getAttribute('locale') || 'de-DE';
  }

  get reducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  formatNumber(value) {
    return new Intl.NumberFormat(this.locale).format(Math.floor(value));
  }

  /**
   * Easing function for smooth animation
   * @param {number} t - Progress (0 to 1)
   * @returns {number} - Eased value
   */
  easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  animate() {
    if (this.reducedMotion) {
      this.textContent = `${this.prefix}${this.formatNumber(this.targetValue)}${this.suffix}`;
      return;
    }

    const startTime = performance.now();
    const startValue = 0;
    const endValue = this.targetValue;

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.duration, 1);
      const easedProgress = this.easeOutQuart(progress);
      const currentValue = startValue + (endValue - startValue) * easedProgress;

      this.textContent = `${this.prefix}${this.formatNumber(currentValue)}${this.suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  /**
   * Reset and re-animate (useful for re-triggering)
   */
  reset() {
    this.hasAnimated = false;
    this.textContent = '0';
  }
}

// Only define if not already defined (for injection compatibility)
if (!customElements.get('animated-counter')) {
  customElements.define('animated-counter', AnimatedCounter);
}

export default AnimatedCounter;
