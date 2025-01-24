# Routing Implementation

## App Router Structure

- Use Next.js App Router
- Pages use `{{ROUTE_PATH}}page.tsx` files
- Layouts use `layout.tsx` files

## Dynamic Routes

- Posts accessible at `/posts/[slug]`
- Implemented in `app/posts/[slug]/page.tsx`
- Generates static pages at build time

```typescript
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({
    slug: post.slug
  }));
}

export default function PostPage({ params }) {
  const post = getPost(params.slug);

  return (
    <article>
      <h1>{post.title}</h1>
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </article>
  );
}
```

## Post Listing

- Main page shows all posts
- Implemented in `app/page.tsx`
- Pagination support

## Category/Tag Routes

- `/categories/[category]`
- `/tags/[tag]`
- Filter posts by category or tag

## Contentful Integration

- Fetch content from Contentful CMS
- Use `@contentful/rich-text-react-renderer`
- Implement content preview mode
