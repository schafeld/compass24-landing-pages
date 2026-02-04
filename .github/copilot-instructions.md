# GitHub Copilot Instructions for Compass24 Landing Pages

## Project Overview
This project contains modern, responsive landing pages for www.compass24.de. The pages should maintain brand consistency while using modern web development practices.

## Brand Guidelines

### Colors (DO NOT CHANGE)
- Primary Brand Color: Keep existing Compass24 blue
- Secondary Colors: Keep existing color palette
- Use colors defined in `css/design-tokens.css`

### Typography (DO NOT CHANGE)
- Logo: Keep existing logo design and placement
- Fonts: Use existing brand fonts
- Refer to `css/design-tokens.css` for font families and sizes

### Logo
- Always maintain logo integrity
- Do not modify, stretch, or alter colors
- Use vector format when available

## Code Style and Best Practices

### HTML
- Use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`)
- Include proper ARIA labels for accessibility
- Use BEM (Block Element Modifier) naming convention for classes
- Ensure all images have descriptive alt text
- Use responsive images with `srcset` when appropriate

### CSS
- Use CSS custom properties (variables) from design tokens
- Mobile-first responsive design approach
- Use CSS Grid and Flexbox for layouts
- Avoid `!important` unless absolutely necessary
- Follow BEM naming: `.block__element--modifier`
- Group related properties together
- Use rem units for font sizes, px for borders
- Maintain consistent spacing using design tokens

### JavaScript
- Use modern ES6+ syntax
- Prefer const/let over var
- Use template literals for string concatenation
- Add JSDoc comments for functions
- Minimize DOM manipulation
- Use event delegation where appropriate

### File Organization
```
/
├── .github/
│   └── copilot-instructions.md
├── css/
│   ├── design-tokens.css       # Design system variables
│   ├── styles.css              # Main styles
│   └── components/             # Component-specific styles
├── js/
│   └── main.js                 # Main JavaScript
├── components/                 # Reusable HTML components
├── images/                     # Image assets
├── ueber-uns.html             # About Us page
└── jobs.html                  # Jobs page
```

## Component Development

### Reusable Components
- Create modular, reusable components in `/components` directory
- Each component should be self-contained
- Use web standards (consider Web Components for complex widgets)
- Document component props and usage

### Timeline Component
- The timeline should be visually engaging
- Show company milestones from 1995 to present
- Should be responsive and work on all screen sizes
- Use CSS animations for visual interest

## Responsive Design

### Breakpoints
```css
/* Mobile: default styles */
/* Tablet: 768px and up */
/* Desktop: 1024px and up */
/* Large Desktop: 1440px and up */
```

### Testing
- Test on mobile, tablet, and desktop sizes
- Ensure touch-friendly hit areas (min 44x44px)
- Test with keyboard navigation
- Verify in Chrome, Firefox, Safari, and Edge

## Accessibility (WCAG 2.1 AA)

- Maintain color contrast ratio of at least 4.5:1 for text
- All interactive elements must be keyboard accessible
- Use semantic HTML for screen readers
- Include skip navigation links
- Ensure focus states are visible
- Test with screen readers

## Performance

- Optimize images (use WebP with fallbacks)
- Minimize CSS and JavaScript
- Lazy load images below the fold
- Use preload for critical assets
- Aim for Lighthouse score > 90

## Browser Support

- Modern browsers (last 2 versions)
- Chrome, Firefox, Safari, Edge
- Mobile browsers: iOS Safari, Chrome Android
- Graceful degradation for older browsers

## Version Control

- Write clear, descriptive commit messages
- Keep commits focused and atomic
- Use conventional commits format:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `style:` for formatting changes
  - `docs:` for documentation
  - `refactor:` for code refactoring

## Documentation

- Comment complex logic
- Update README.md with setup instructions
- Document any non-obvious design decisions
- Keep CONTRIBUTING.md up to date

## Security

- Never commit sensitive data (API keys, passwords)
- Sanitize user input if forms are added
- Use HTTPS for all external resources
- Implement Content Security Policy headers

## When Suggesting Code

1. Always check design tokens first for colors, fonts, spacing
2. Maintain brand consistency
3. Prefer vanilla JavaScript over libraries when possible
4. Ensure responsive design
5. Consider accessibility in all suggestions
6. Follow existing code patterns
7. Suggest performance optimizations
8. Include helpful comments for complex code
