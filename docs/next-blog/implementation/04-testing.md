# Testing Strategy

## Test Pyramid

- Unit tests: 70%
- Integration tests: 20%
- End-to-end tests: 10%

## Component Testing

- Use React Testing Library
- Test all component states
- Verify accessibility
- Test edge cases

```typescript
import { render, screen } from '@testing-library/react';
import Component from './Component';

test('renders correctly', () => {
  render(<Component />);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});
```

## Accessibility Testing

- Use `@testing-library/jest-dom` matchers
- Verify ARIA attributes
- Test keyboard navigation
- Check color contrast

## State Management Testing

- Test all state transitions
- Verify side effects
- Mock API calls

## Animation Testing

- Mock Framer Motion components
- Test final rendered state
- Verify class name application

## Coverage Requirements

- 100% test coverage for new code
- Maintain 80% coverage overall
- Block merge if coverage drops

## CI/CD Integration

- Run tests on push/pull request
- Generate coverage reports
- Block merge if tests fail
