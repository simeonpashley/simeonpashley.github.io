# Content Migration

## Markdown Processing

- Posts stored in `content/posts/`
- Front matter preserved
- Markdown processed using react-markdown

## JSON Content Management

- Store text files in `content/en/`
- Organize JSON files into logical modules:
  - `common.json` - Shared text
  - `features.json` - Feature-specific text
  - `navigation.json` - Navigation text
- Import and use content:

```typescript
import text from '../content/en/common.json';

function Component() {
  return <button>{text.cta.primary}</button>;
}
```

## File Naming

- Maintain Jekyll format: `YYYY-MM-DD-slug.md`
- Example: `2025-01-04-uk-business-ai.md`

## Front Matter

Supported fields:

- `title`: Post title
- `date`: Publication date (YYYY-MM-DD)
- `tags`: Array of tags
- `categories`: Array of categories
- `thumbnail`: Path to thumbnail image
- `home_preview`: Short description for listings

## Content Structure

1. Use standard Markdown syntax
2. Images stored in `public/images/`
3. Code blocks with syntax highlighting
4. External links with proper attributes

## Migration Steps

1. Copy existing posts to `content/posts/`
2. Verify front matter compatibility
3. Test rendering of each post
4. Update internal links if needed
