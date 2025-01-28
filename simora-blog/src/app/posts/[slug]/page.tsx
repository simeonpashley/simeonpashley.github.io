import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';

interface PostProps {
  params: {
    slug: string;
  };
}

export default function PostPage({ params }: PostProps) {
  // Construct the file path
  const filePath = path.join(process.cwd(), 'content', 'posts', `${params.slug}.md`);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return notFound();
  }

  // Read and parse markdown file
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data: frontMatter, content } = matter(fileContent);

  return (
    <article className="prose mx-auto py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{frontMatter.title}</h1>
        <div className="text-gray-600">
          <time dateTime={frontMatter.date}>{new Date(frontMatter.date).toLocaleDateString()}</time>
        </div>
      </header>

      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
}
