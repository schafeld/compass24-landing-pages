/**
 * Image Slider Web Component
 * 
 * A reusable, accessible image carousel component for Compass24.
 * Features:
 * - Touch/swipe support
 * - Keyboard navigation
 * - Auto-play with pause on hover
 * - Responsive design
 * - Reduced motion support
 * - Placeholder support for development
 * 
 * Usage:
 * <image-slider auto-play="5000">
 *   <img src="image1.jpg" alt="Description 1">
 *   <img src="image2.jpg" alt="Description 2">
 * </image-slider>
 * 
 * For placeholders (no images):
 * <image-slider placeholder="3">
 * </image-slider>
 */

class ImageSlider extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentIndex = 0;
    this.autoPlayInterval = null;
    this.touchStartX = 0;
    this.touchEndX = 0;
    this._slides = [];
  }

  connectedCallback() {
    this.collectSlides();
    this.render();
    this.setupEventListeners();
    this.startAutoPlay();
  }

  disconnectedCallback() {
    this.stopAutoPlay();
  }

  collectSlides() {
    // Check for placeholder attribute first
    const placeholderCount = parseInt(this.getAttribute('placeholder') || '0', 10);
    
    if (placeholderCount > 0) {
      // Generate placeholder slides
      this._slides = Array.from({ length: placeholderCount }, (_, i) => ({
        type: 'placeholder',
        index: i + 1,
        alt: `Placeholder ${i + 1}`
      }));
    } else {
      // Collect actual image elements
      this._slides = Array.from(this.querySelectorAll('img, picture')).map((el, i) => ({
        type: 'image',
        src: el.src || el.querySelector('img')?.src,
        alt: el.alt || el.querySelector('img')?.alt || `Bild ${i + 1}`,
        element: el
      }));
    }

    // Fallback: if no slides and no placeholder, create demo placeholders
    if (this._slides.length === 0) {
      this._slides = [
        { type: 'placeholder', index: 1, alt: 'Bild 1' },
        { type: 'placeholder', index: 2, alt: 'Bild 2' },
        { type: 'placeholder', index: 3, alt: 'Bild 3' }
      ];
    }
  }

  get slides() {
    return this._slides;
  }

  get autoPlayDelay() {
    return parseInt(this.getAttribute('auto-play') || '5000', 10);
  }

  get reducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  renderSlide(slide, index) {
    if (slide.type === 'placeholder') {
      const colors = ['#003366', '#0066b3', '#0099cc', '#004d99'];
      const bgColor = colors[index % colors.length];
      return `
        <div class="slide slide--placeholder" style="background: linear-gradient(135deg, ${bgColor} 0%, ${bgColor}dd 100%);">
          <div class="placeholder-content">
            <svg viewBox="0 0 24 24" class="placeholder-icon" aria-hidden="true">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
            <span class="placeholder-text">Bild ${slide.index}</span>
          </div>
        </div>
      `;
    }
    return `
      <div class="slide">
        <img src="${slide.src}" alt="${slide.alt}" loading="${index === 0 ? 'eager' : 'lazy'}">
      </div>
    `;
  }

  render() {
    const slideCount = this.slides.length;
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: relative;
          overflow: hidden;
          border-radius: var(--border-radius-lg, 12px);
          background: #f0f4f8;
          min-height: 200px;
        }

        .slider-track {
          display: flex;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
          height: 100%;
        }

        @media (prefers-reduced-motion: reduce) {
          .slider-track {
            transition: none;
          }
        }

        .slide {
          flex: 0 0 100%;
          width: 100%;
          min-height: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          aspect-ratio: 16 / 9;
        }

        .slide--placeholder {
          background: linear-gradient(135deg, #003366 0%, #0066b3 100%);
          color: white;
          aspect-ratio: 16 / 9;
        }

        .placeholder-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          padding: 2rem;
          text-align: center;
        }

        .placeholder-icon {
          width: 64px;
          height: 64px;
          fill: rgba(255, 255, 255, 0.6);
        }

        .placeholder-text {
          font-size: 1.25rem;
          font-weight: 500;
          opacity: 0.8;
        }

        .controls {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.5rem;
          z-index: 10;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          border: 2px solid white;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .dot:hover {
          background: rgba(255, 255, 255, 0.8);
        }

        .dot.active {
          background: white;
          transform: scale(1.2);
        }

        .dot:focus {
          outline: 2px solid var(--color-primary, #0066b3);
          outline-offset: 2px;
        }

        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 51, 102, 0.8);
          color: white;
          border: none;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .nav-btn:hover {
          background: rgba(0, 51, 102, 1);
          transform: translateY(-50%) scale(1.1);
        }

        .nav-btn:focus {
          outline: 2px solid white;
          outline-offset: 2px;
        }

        .nav-btn--prev {
          left: 1rem;
        }

        .nav-btn--next {
          right: 1rem;
        }

        .nav-btn svg {
          width: 24px;
          height: 24px;
          fill: currentColor;
        }

        @media (max-width: 767px) {
          .nav-btn {
            width: 40px;
            height: 40px;
          }

          .nav-btn--prev {
            left: 0.5rem;
          }

          .nav-btn--next {
            right: 0.5rem;
          }

          .controls {
            bottom: 0.5rem;
          }

          .dot {
            width: 10px;
            height: 10px;
          }

          .slide {
            min-height: 200px;
          }
        }

        /* Hide controls if only one slide */
        :host([single-slide]) .controls,
        :host([single-slide]) .nav-btn {
          display: none;
        }
      </style>

      <div class="slider-track" role="region" aria-label="Bildergalerie" aria-live="polite">
        ${this.slides.map((slide, i) => this.renderSlide(slide, i)).join('')}
      </div>

      ${slideCount > 1 ? `
        <button class="nav-btn nav-btn--prev" aria-label="Vorheriges Bild">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        <button class="nav-btn nav-btn--next" aria-label="Nächstes Bild">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
          </svg>
        </button>

        <div class="controls" role="tablist" aria-label="Bildauswahl">
          ${this.slides.map((_, i) => `
            <button 
              class="dot ${i === 0 ? 'active' : ''}" 
              role="tab"
              aria-selected="${i === 0}"
              aria-label="Bild ${i + 1} von ${slideCount}"
              data-index="${i}"
            ></button>
          `).join('')}
        </div>
      ` : ''}
    `;

    if (slideCount <= 1) {
      this.setAttribute('single-slide', '');
    }
  }

  setupEventListeners() {
    const prevBtn = this.shadowRoot.querySelector('.nav-btn--prev');
    const nextBtn = this.shadowRoot.querySelector('.nav-btn--next');
    const dots = this.shadowRoot.querySelectorAll('.dot');
    const slider = this.shadowRoot.querySelector('.slider-track');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.prev());
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.next());
    }

    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index, 10);
        this.goTo(index);
      });
    });

    // Touch support
    if (slider) {
      slider.addEventListener('touchstart', (e) => {
        this.touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      slider.addEventListener('touchend', (e) => {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
      }, { passive: true });
    }

    // Pause on hover
    this.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.addEventListener('mouseleave', () => this.startAutoPlay());

    // Keyboard navigation
    this.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.prev();
        e.preventDefault();
      } else if (e.key === 'ArrowRight') {
        this.next();
        e.preventDefault();
      }
    });

    // Focus management
    this.setAttribute('tabindex', '0');
  }

  handleSwipe() {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.next();
      } else {
        this.prev();
      }
    }
  }

  updateSlider() {
    const slider = this.shadowRoot.querySelector('.slider-track');
    const dots = this.shadowRoot.querySelectorAll('.dot');

    if (slider) {
      slider.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    }

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === this.currentIndex);
      dot.setAttribute('aria-selected', i === this.currentIndex);
    });

    // Dispatch custom event
    this.dispatchEvent(new CustomEvent('slide-change', {
      detail: { index: this.currentIndex },
      bubbles: true
    }));
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.updateSlider();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.updateSlider();
  }

  goTo(index) {
    if (index >= 0 && index < this.slides.length) {
      this.currentIndex = index;
      this.updateSlider();
    }
  }

  startAutoPlay() {
    if (this.autoPlayDelay > 0 && !this.reducedMotion && this.slides.length > 1) {
      this.autoPlayInterval = setInterval(() => this.next(), this.autoPlayDelay);
    }
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
}

customElements.define('image-slider', ImageSlider);
