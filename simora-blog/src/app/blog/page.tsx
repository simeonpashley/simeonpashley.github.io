import Link from 'next/link';

export default function BlogPage() {
  return (
    <div data-testid="blog-list">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>

      <Link href="/blog/sample-post" data-testid="blog-post" className="mb-8 block">
        <h2 className="text-2xl font-semibold">Post Title</h2>
        <p className="text-gray-600">Post excerpt...</p>
      </Link>
    </div>
  );
}
