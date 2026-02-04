# Compass24 Landing Pages

Modern, responsive landing pages for www.compass24.de featuring a beautiful design with a company history timeline.

## 📋 Overview

This repository contains two main landing pages:

- **Über uns (About Us)**: Company information with an interactive timeline showcasing Compass24's history since 1995
- **Jobs (Careers)**: Career opportunities and open positions at Compass24

## ✨ Features

- 🎨 **Modern Design**: Clean, professional design with modern CSS and HTML
- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- ♿ **Accessible**: WCAG 2.1 AA compliant with semantic HTML and ARIA labels
- 🎯 **Design System**: Comprehensive design tokens for consistent styling
- 📈 **Interactive Timeline**: Visual company history on the About Us page
- 🚀 **Performance Optimized**: Fast loading and smooth animations
- 🤖 **AI-Ready**: GitHub Copilot instructions included for development

## 🚀 Quick Start

1. Clone the repository:
```bash
git clone https://github.com/schafeld/compass24-landing-pages.git
cd compass24-landing-pages
```

2. Open the pages in your browser:
- Open `ueber-uns.html` for the About Us page
- Open `jobs.html` for the Jobs page

No build process required! These are static HTML pages with vanilla CSS.

## 📁 Project Structure

```
compass24-landing-pages/
├── .github/
│   └── copilot-instructions.md    # GitHub Copilot guidelines
├── css/
│   ├── design-tokens.css          # Design system variables
│   ├── styles.css                 # Main stylesheet
│   └── components/
│       └── timeline.css           # Timeline component styles
├── js/
│   └── main.js                    # JavaScript (future)
├── components/                    # Reusable components (future)
├── images/                        # Image assets
├── ueber-uns.html                 # About Us page
├── jobs.html                      # Jobs page
├── CONTRIBUTING.md                # Contribution guidelines
└── README.md                      # This file
```

## 🎨 Design System

The project uses a comprehensive design token system defined in `css/design-tokens.css`:

- **Colors**: Primary brand colors, semantic colors, and neutral palette
- **Typography**: Font families, sizes, weights, and line heights
- **Spacing**: Consistent spacing scale (4px base)
- **Shadows**: Elevation system for depth
- **Borders**: Radius values and border styles
- **Transitions**: Timing functions and durations

### Brand Colors (Do Not Modify)

- Primary: `#0066b3` (Compass24 Blue)
- Secondary: `#00a3e0` (Light Blue)
- Accent: `#ff6b35` (Orange)

## 🧩 Components

### Timeline Component

The timeline component displays company history in an engaging, visual format:

- **Alternating Layout**: Items alternate between left and right on desktop
- **Responsive**: Stacks vertically on mobile devices
- **Interactive**: Hover effects and smooth animations
- **Milestone Markers**: Special styling for important years

## 🤖 GitHub Copilot Integration

This project includes comprehensive GitHub Copilot instructions in `.github/copilot-instructions.md`. When working with VS Code and GitHub Copilot, the AI will automatically follow the project's:

- Coding standards and conventions
- Design system usage guidelines
- Accessibility requirements
- Performance best practices
- Brand guidelines (logo, colors, fonts)

## 🛠️ Development

### Prerequisites

- A modern web browser
- A text editor (VS Code recommended)
- Git for version control

### Making Changes

1. Create a new branch for your feature
2. Make your changes following the [Contributing Guidelines](CONTRIBUTING.md)
3. Test across different browsers and devices
4. Submit a pull request

### Coding Standards

- **HTML**: Semantic HTML5, BEM naming convention
- **CSS**: Use design tokens, mobile-first approach
- **JavaScript**: ES6+, const/let, JSDoc comments
- **Accessibility**: WCAG 2.1 AA compliance

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📱 Responsive Breakpoints

- **Mobile**: 0-767px (default styles)
- **Tablet**: 768px and up
- **Desktop**: 1024px and up
- **Large Desktop**: 1440px and up

## ♿ Accessibility

This project prioritizes accessibility:

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast (4.5:1 minimum)
- Focus indicators on interactive elements

## 🌐 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile: iOS Safari, Chrome Android

## 📄 Pages

### Über uns (About Us)

Features:
- Company introduction and mission
- Interactive timeline from 1995 to present
- Company values section
- Call-to-action to jobs page

### Jobs (Careers)

Features:
- Why work at Compass24
- Current job openings
- Application process overview
- Contact information

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting a pull request.

## 📝 License

This project is proprietary and confidential. All rights reserved by Compass24.

## 📧 Contact

- **Email**: info@compass24.de
- **Website**: www.compass24.de

---

Made with ❤️ by the Compass24 team
