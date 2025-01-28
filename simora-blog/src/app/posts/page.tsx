import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import text from '@/content/en/features.json';

interface Post {
  slug: string;
  frontMatter: {
    title: string;
    date: string;
    home_preview: string;
  };
}

export default function PostsPage() {
  // Get all post files
  const postsDirectory = path.join(process.cwd(), 'content', 'posts');
  const fileNames = fs.readdirSync(postsDirectory);

  // Parse post metadata
  const posts: Post[] = fileNames.map((fileName) => {
    const filePath = path.join(postsDirectory, fileName);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontMatter } = matter(fileContent);

    return {
      slug: fileName.replace(/\.md$/, ''),
      frontMatter: {
        title: frontMatter.title,
        date: frontMatter.date,
        home_preview: frontMatter.home_preview,
      },
    };
  });

  // Sort posts by date
  posts.sort(
    (a, b) => new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime(),
  );

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">{text.posts.title}</h1>
      <p className="text-lg mb-8">{text.posts.description}</p>

      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="border-b pb-8">
            <Link href={`/posts/${post.slug}`}>
              <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600">
                {post.frontMatter.title}
              </h2>
            </Link>
            <time dateTime={post.frontMatter.date} className="text-gray-600 block mb-4">
              {new Date(post.frontMatter.date).toLocaleDateString()}
            </time>
            <p className="text-gray-700">{post.frontMatter.home_preview}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
