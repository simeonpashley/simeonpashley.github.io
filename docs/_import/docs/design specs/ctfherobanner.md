# CtfHeroBanner Component Design Specification

## Overview
The Hero Banner component serves as a primary visual element for landing pages and key sections. It combines impactful visuals with clear messaging to create strong first impressions aligned with Simora's brand identity.

### Component Identifier
- Debug attribute: `data-ctf="hero"`
- Used for runtime component identification and debugging
- Added to the root element of the component

## Visual Design

### Layout
- Full-width design with responsive height (50vh default, 80vh for large heroes)
- Centered content with container constraints
- Flexible background options (image or solid color)
- Content stack: Headline → Body Text → CTA

### Typography
- **Headline**:
  - Font: Inter (Bold)
  - Size: H1 variant from Text component
  - Max width: 48rem (max-w-3xl)
  - Margin bottom: 1.5rem (mb-6)

- **Body Text**:
  - Font: Inter (Regular)
  - Size: Large prose variant
  - Max width: 42rem (max-w-2xl)
  - Margin bottom: 2rem (mb-8)

### Colors
- **Background Options**:
  1. White (#FFFFFF)
  2. White Smoke (#FCFCFC)
  3. Light Gray (#F4F4F4)
  4. Gray (#EAEAEA)
  5. Steel Gray (#BBBBBB)
  6. Dark Gray (#797979)
  7. Black (#000000)
  8. **Sub-brand Gradients**:
     - Simora Blue (#1F4B99) to Evolve Green (#28A745)
     - Build Orange (#FF8C42) variations
     - Ops Grey (#6C757D) combinations

- **Text Colors**:
  - Default: Inherits from color palette
  - On dark backgrounds/images: White (#FFFFFF)
  - On gradients: Always white for maximum contrast
  - Automatic contrast adjustment based on background

### Imagery
- Full-width background images with object-cover fit
- Optional rounded corners (controlled by imageStyle prop)
- Semi-transparent black overlay (30% opacity) for better text readability
- Images loaded with priority for optimal performance

### Interactive Elements
- **CTA Button**:
  - Size: Large
  - Variants:
    - On image: Ghost variant (white)
    - Without image: Primary variant (brand colors)
  - Uses NextJS Link for optimal navigation
  - Hover effects inherited from Button component

## Component Props

### Required Props
- `data`: TypeComponentHeroBanner type from Contentful
  - headline: Main title text
  - bodyText: Rich text content
  - image: Background image details
  - colorPalette: Background color selection

### Optional Props
- `className`: Additional CSS classes
- `heroSize`: Controls banner height (default/large)
- `imageStyle`: Controls image styling (rounded/default)
- `ctaText`: Call-to-action button text
- `targetPage`: Link destination for CTA

## Accessibility
- Images include descriptive alt text
- Semantic HTML structure
- Color contrast meets WCAG guidelines
- Interactive elements are keyboard accessible

## Responsive Behavior
- Maintains readability across device sizes
- Flexible height adaptation
- Content remains centered and properly spaced
- Image scaling preserves quality and focal points

## Best Practices
1. Use high-quality, optimized images
2. Keep headline concise and impactful
3. Ensure body text is scannable
4. Maintain clear visual hierarchy
5. Test contrast with all background options

## Examples

### Standard Hero
```tsx
<CtfHeroBanner
  data={{
    fields: {
      headline: "Transform Your Business",
      bodyText: "Rich text content here",
      colorPalette: "1. White (#FFFFFF)",
      ctaText: "Get Started",
      targetPage: { fields: { slug: "contact" } }
    }
  }}
  // The div will render with: data-ctf="hero"
/>
```

### Full-height Hero with Image
```tsx
<CtfHeroBanner
  data={{
    fields: {
      headline: "Innovation at Scale",
      bodyText: "Rich text content here",
      image: {
        fields: {
          file: { url: "/hero-image.jpg" },
          title: "Hero Image"
        }
      },
      heroSize: true,
      ctaText: "Learn More"
    }
  }}
  className="my-custom-class"
  // The div will render with: data-ctf="hero"
/>
```

### Sub-brand Variations
- **Simora Evolve**: Green gradient background with strategic transformation messaging
- **Simora Build**: Orange-toned gradient emphasizing development and innovation
- **Simora Ops**: Grey gradient focusing on operational excellence
