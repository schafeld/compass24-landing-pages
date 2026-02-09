# Values Section Component

Display panels with Compass company values

## Feature

A responsive values grid section displaying Compass24's core company values:

- Qualität & Expertise
- Kundenorientierung
- Innovation
- Familienunternehmen
- Leidenschaft
- Nachhaltigkeit

Each value is presented in a card with an icon, title, and description.

## Layout and Design

- **Responsive Grid Layout**: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
- **Square Masonry Style**: Maximum 3×2 grid layout (3 columns, 2 rows)
- **Visual Style**: 
  - Light shadow and border (following timeline component style)
  - Square corners (border-radius: 0)
  - Hover effects with subtle lift animation
  - Clean, compact spacing
- **Typography**: Uses Bootstrap/Shopware CSS variables from compass24.de with fallbacks
- **Accessibility**: 
  - Semantic HTML with proper ARIA labels
  - Role attributes for screen readers
  - Respects prefers-reduced-motion
- **Scoped Styles**: All CSS wrapped in `.compass24-key-values-component` to avoid conflicts when injected via CMS

## Source

Content extracted from `section.values-section` in [compass-about-mockup.html](../mockups/compass-about-mockup.html).
Layout inspired by [timeline-masonry-layout.html](../timeline/timeline-masonry-layout.html).
