# Project Setup

## Requirements

- Node.js 18+
- pnpm
- Git

## Installation

```bash
npx create-next-app@latest simora-blog --typescript --tailwind --eslint
cd simora-blog
pnpm install
```

## Git Workflow

1. Create and switch to feature branch:

```bash
git checkout -b next-blog
```

2. Make changes and commit with PR-like messages:

```bash
git add .
git commit -m "feat: add base components
- Implement Button component
- Add Card component
- Set up testing infrastructure"
```

3. Push changes:

```bash
git push origin next-blog
```

4. Ensure tests and linting pass before committing

## Configuration

1. Copy `.env.example` to `.env`
2. Configure environment variables:
   - `NEXT_PUBLIC_SITE_URL` - Base URL of the site
   - `NEXT_PUBLIC_GA_ID` - Google Analytics ID (optional)

## Tailwind CSS Setup

1. Extend theme in `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        simoraBlue: 'var(--simora-blue)',
        simoraGreen: 'var(--simora-green)',
        simoraOrange: 'var(--simora-orange)',
        simoraGrey: 'var(--simora-grey)',
      },
    },
  },
  plugins: [],
} satisfies Config;
```

2. Add CSS variables in `globals.css`:

```css
:root {
  --simora-blue: #1E3A8A;
  --simora-green: #28A745;
  --simora-orange: #FF8C00;
  --simora-grey: #6C757D;
}
```

## Testing

- Follow Test-Driven Development (TDD) principles
- Write tests before implementation
- Use test pyramid strategy:
  - Unit tests: 70%
  - Integration tests: 20%
  - End-to-end tests: 10%
- Tests must be adjacent to code:
  - `component.tsx` → `component.test.tsx`
  - `lib/utils.js` → `lib/utils.test.js`
- Bug fixes require failing test first

```bash
pnpm test
```

## Linting

- Strictest possible configuration
- Zero tolerance for warnings or errors
- ESLint with:
  - TypeScript support
  - React best practices
  - Accessibility rules
  - Security rules

```bash
pnpm lint
```

## Pre-commit Hooks

- Run tests and linting before commit
- Configured via Husky:

```bash
npx husky add .husky/pre-commit "pnpm test && pnpm lint"
```

## CI/CD

- GitHub Actions pipeline:
  - Run tests on push/pull request
  - Enforce linting rules
  - Block merge if tests fail
