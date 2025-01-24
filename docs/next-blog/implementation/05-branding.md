# Branding Implementation

## Color Scheme

- Primary: #1E3A8A (Simora Blue)
- Secondary: #28A745 (Evolve Green)
- Accent: #FF8C00 (Build Orange)
- Neutral: #6C757D (Ops Grey)
- Background: #FFFFFF (White)

## Typography

- Primary font: InterVariable
- Secondary font: Helvetica Neue, Arial, sans-serif
- Base font size: 16px
- Line height: 1.6
- Heading hierarchy:
  - H1: 48px
  - H2: 36px
  - H3: 24px
  - Body: 16px
  - Small: 14px

## Logo Usage

- Use SVG format for logos
- Apply .logo-svg-color class for consistent coloring
- Maintain clear spacing around logos
- Minimum size: 32px
- Include alt text

## UI Components

- Buttons:
  - Primary: Simora Blue gradient
  - Secondary: White with blue border
  - Gradient: Blue to Green
  - Hover effects: subtle lift and shadow
- Cards:
  - Rounded corners
  - Subtle shadows
  - Neutral gradient background
- Navigation:
  - Sticky header
  - Mobile-friendly menu
  - Clear focus states

## Accessibility

- Minimum contrast ratio: 4.5:1
- Keyboard navigation support
- Screen reader compatibility
- Reduced motion preferences
- Alt text for all images

## Implementation

1. Create CSS variables in `globals.css`
2. Extend Tailwind theme with brand colors
3. Create branded components
4. Implement dark mode support
5. Add accessibility features
6. Include InterVariable font face
