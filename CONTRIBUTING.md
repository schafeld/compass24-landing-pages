# Contributing to Compass24 Landing Pages

Thank you for your interest in contributing to the Compass24 Landing Pages project! This document provides guidelines and best practices for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Design System](#design-system)
- [Component Development](#component-development)
- [Testing](#testing)
- [Accessibility](#accessibility)
- [Performance](#performance)
- [Commit Guidelines](#commit-guidelines)

## Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please be respectful and professional in all interactions.

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A text editor or IDE (VS Code recommended for GitHub Copilot integration)
- Basic knowledge of HTML, CSS, and JavaScript
- Git for version control

### Project Structure

```
compass24-landing-pages/
├── .github/
│   └── copilot-instructions.md    # GitHub Copilot guidelines
├── css/
│   ├── design-tokens.css          # Design system variables
│   ├── styles.css                 # Main stylesheet
│   └── components/
│       └── timeline.css           # Component-specific styles
├── js/
│   └── main.js                    # Main JavaScript (future)
├── components/                    # Reusable HTML components
├── images/                        # Image assets
├── ueber-uns.html                 # About Us page
├── jobs.html                      # Jobs page
└── README.md
```

## Development Workflow

1. **Fork and Clone**: Fork the repository and clone it locally
2. **Create a Branch**: Create a feature branch for your changes
3. **Make Changes**: Implement your changes following our coding standards
4. **Test**: Test your changes across different browsers and devices
5. **Commit**: Use clear, descriptive commit messages
6. **Push**: Push your changes to your fork
7. **Pull Request**: Submit a pull request with a clear description

## Coding Standards

### HTML

- **Semantic HTML**: Use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`)
- **Accessibility**: Include ARIA labels and roles where appropriate
- **Document Structure**: Use proper heading hierarchy (h1 → h2 → h3)
- **Indentation**: Use 2 spaces for indentation
- **Attributes**: Use double quotes for attribute values
- **Alt Text**: Always include descriptive alt text for images

#### Example:

```html
<article class="card">
  <h2 class="card__title">Card Title</h2>
  <p class="card__content">Card description goes here.</p>
</article>
```

### CSS

- **Naming Convention**: Use BEM (Block Element Modifier) methodology
  - Block: `.card`
  - Element: `.card__title`
  - Modifier: `.card--featured`
- **Design Tokens**: Always use CSS custom properties from `design-tokens.css`
- **Mobile-First**: Write mobile styles first, then add media queries for larger screens
- **Organization**: Group related properties together
- **Units**: Use `rem` for font sizes, `px` for borders
- **Comments**: Add comments for complex styles or sections

#### Example:

```css
/* Card Component */
.card {
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-base);
}

.card__title {
  font-size: var(--font-size-xl);
  color: var(--color-primary);
  margin-bottom: var(--space-3);
}

.card--featured {
  border: 2px solid var(--color-primary);
}
```

### JavaScript

- **ES6+**: Use modern JavaScript syntax
- **const/let**: Use `const` by default, `let` when reassignment is needed, never `var`
- **Template Literals**: Use template literals for string interpolation
- **Arrow Functions**: Use arrow functions for callbacks
- **JSDoc**: Add JSDoc comments for functions

#### Example:

```javascript
/**
 * Toggles the mobile navigation menu
 * @param {Event} event - The click event
 */
const toggleMobileNav = (event) => {
  event.preventDefault();
  const nav = document.querySelector('.header__nav');
  nav.classList.toggle('header__nav--mobile-open');
};
```

## Design System

### Using Design Tokens

Always use design tokens (CSS custom properties) instead of hard-coded values:

**❌ Don't:**
```css
.button {
  background-color: #0066b3;
  padding: 12px 24px;
  border-radius: 8px;
}
```

**✅ Do:**
```css
.button {
  background-color: var(--color-primary);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--border-radius-lg);
}
```

### Brand Colors

The following colors are part of the Compass24 brand and should **NOT** be modified:

- Primary: `var(--color-primary)` - Compass24 Blue
- Logo: Keep existing logo intact
- Typography: Use existing font families

### Responsive Breakpoints

```css
/* Mobile: default styles (0-767px) */
/* Tablet: 768px and up */
@media (min-width: 768px) { }

/* Desktop: 1024px and up */
@media (min-width: 1024px) { }

/* Large Desktop: 1440px and up */
@media (min-width: 1440px) { }
```

## Component Development

### Creating a New Component

1. **CSS File**: Create a new CSS file in `css/components/`
2. **BEM Naming**: Use BEM naming convention
3. **Responsive**: Ensure the component works on all screen sizes
4. **Documentation**: Add comments explaining the component's purpose

### Component Checklist

- [ ] Uses design tokens
- [ ] Follows BEM naming convention
- [ ] Responsive (mobile, tablet, desktop)
- [ ] Accessible (keyboard navigation, screen readers)
- [ ] Cross-browser compatible
- [ ] Performs well (no layout shifts, smooth animations)

## Testing

### Manual Testing Checklist

- [ ] **Visual**: Does it look correct on all screen sizes?
- [ ] **Functional**: Do all interactive elements work?
- [ ] **Keyboard**: Can you navigate using only the keyboard?
- [ ] **Screen Reader**: Test with a screen reader (NVDA, JAWS, VoiceOver)
- [ ] **Performance**: Does the page load quickly?
- [ ] **Cross-Browser**: Test in Chrome, Firefox, Safari, and Edge

### Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers: iOS Safari, Chrome Android

## Accessibility

We strive for WCAG 2.1 AA compliance. Follow these guidelines:

### Color Contrast

- Text must have a contrast ratio of at least 4.5:1
- Large text (18pt+) must have a contrast ratio of at least 3:1
- Use online tools to check contrast ratios

### Keyboard Navigation

- All interactive elements must be keyboard accessible
- Ensure logical tab order
- Provide visible focus states

### Screen Readers

- Use semantic HTML
- Add appropriate ARIA labels and roles
- Include alt text for images
- Test with actual screen readers

### Example:

```html
<button class="btn btn--primary" aria-label="Submit application form">
  Submit
</button>

<img src="logo.png" alt="Compass24 company logo">

<nav role="navigation" aria-label="Main navigation">
  <!-- Navigation links -->
</nav>
```

## Performance

### Optimization Guidelines

- **Images**: Optimize images (compress, use appropriate formats)
- **CSS**: Minimize CSS, avoid unnecessary specificity
- **JavaScript**: Minimize and defer non-critical JavaScript
- **Fonts**: Use system fonts or load fonts efficiently
- **Caching**: Leverage browser caching for static assets

### Performance Targets

- First Contentful Paint: < 1.8s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Lighthouse Score: > 90 (Performance, Accessibility, Best Practices, SEO)

## Commit Guidelines

We follow the Conventional Commits specification:

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, no code change)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Build process or auxiliary tool changes

### Examples

```
feat(timeline): add company history timeline component

Added a responsive timeline component to display company milestones
from 1995 to present on the About Us page.

Closes #123
```

```
fix(header): improve mobile navigation accessibility

- Added ARIA labels to navigation elements
- Fixed keyboard navigation focus order
- Improved touch target sizes

Fixes #456
```

```
docs: update contributing guidelines

Added detailed coding standards and accessibility guidelines.
```

## Questions?

If you have any questions or need help, please:

1. Check the [GitHub Copilot Instructions](.github/copilot-instructions.md)
2. Review existing code for examples
3. Open an issue for discussion

Thank you for contributing to Compass24 Landing Pages! 🚀
