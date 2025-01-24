# Component Development

## Branded Components

- Located in `app/components/branded/`
- Follow atomic design principles
- Use TypeScript
- Include Storybook stories
- Add tests

## Component Structure

```typescript
interface ComponentProps {
  variant?: 'primary' | 'secondary' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Component({ variant = 'primary', size = 'md', children }: ComponentProps) {
  return (
    <div className={cn(
      'base-styles',
      variant === 'primary' && 'bg-simora-blue',
      variant === 'secondary' && 'bg-white border-simora-blue',
      variant === 'gradient' && 'bg-gradient-to-r from-simora-blue to-simora-green',
      size === 'lg' && 'text-lg'
    )}>
      {children}
    </div>
  );
}
```

## Component Guidelines

1. Use `class-variance-authority` for variants
2. Include proper TypeScript types
3. Add JSDoc comments
4. Implement accessibility features
5. Include Storybook stories
6. Write comprehensive tests

## Example Components

- Button
- Card
- Input
- Modal
- Navigation
- Footer

## Accessibility Features

- Focus states with visible outlines
- ARIA attributes
- Keyboard navigation
- Screen reader support
- Reduced motion options

## Testing Requirements

- Unit tests for all components
- Integration tests for component interactions
- Accessibility tests
- Visual regression tests

## Global Styles

- Include InterVariable font face
- Define CSS variables for colors and gradients
- Implement base styles for typography and spacing
- Add support for reduced motion
