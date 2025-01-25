export default function BlogPostPage() {
  return (
    <article data-testid="post-content">
      <h1 className="text-3xl font-bold mb-4">Blog Post Title</h1>
      <div className="prose">
        <p>Blog post content...</p>
      </div>
    </article>
  );
}
