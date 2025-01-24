# File Structure Reference

## Key Directories

- `app/`
  - `components/` - Reusable components
  - `content/` - Content management
  - `layouts/` - Page layouts
  - `pages/` - Route pages

- `content/`
  - `en/` - English text content
  - `text/` - JSON text files
  - `posts/` - Markdown blog posts

- `lib/`
  - `markdown.js` - Markdown processing
  - `api.js` - Content fetching
  - `utils.js` - Utility functions

- `public/`
  - `images/` - Static images
  - `fonts/` - Custom fonts

- `styles/`
  - `globals.css` - Global styles
  - `variables.css` - CSS variables

## Component Organization

- One component per file
- Test files adjacent to components:
  - `Component.tsx`
  - `Component.test.tsx`
- Use `@/app/components/branded/` for shared components

## Content Structure

- JSON files in `content/en/`
- Markdown posts in `content/posts/`
- Images in `public/images/`
