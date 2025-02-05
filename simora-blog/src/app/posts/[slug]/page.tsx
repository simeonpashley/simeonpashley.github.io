// app/posts/[slug]/page.tsx

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { notFound } from 'next/navigation';

interface PostFrontMatter {
  title?: string;
  tags?: string[];
  categories?: string[];
  // Other optional fields
  [key: string]: unknown;
}

export interface PostMetadata extends PostFrontMatter {
  slug: string;
  fileName: string;
}

interface PostsData {
  posts: PostMetadata[];
  categories: string[];
  tags: string[];
}

interface PageProps {
  params: { slug: string };
}

// generateStaticParams returns the list of slugs for static generation
export async function generateStaticParams() {
  const postsDataPath = path.join(process.cwd(), 'public', 'data', 'posts-data.json');
  const postsData: PostsData = JSON.parse(fs.readFileSync(postsDataPath, 'utf8'));

  return postsData.posts.map((post) => ({
    slug: post.slug,
  }));
}

// Helper function to get a single post's data
async function getPostData(
  slug: string,
): Promise<{ postData: PostMetadata; contentHtml: string } | null> {
  const postsDataPath = path.join(process.cwd(), 'public', 'data', 'posts-data.json');
  const postsData: PostsData = JSON.parse(fs.readFileSync(postsDataPath, 'utf8'));

  const postMeta = postsData.posts.find((post) => post.slug === slug);
  if (!postMeta) {
    return null;
  }

  const markdownPath = path.join(process.cwd(), 'public', 'data', '_posts', postMeta.fileName);
  const markdownContent = fs.readFileSync(markdownPath, 'utf8');

  // Remove front matter and get content
  const { content } = matter(markdownContent);

  // Convert markdown content to HTML
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return { postData: postMeta, contentHtml };
}

// The default export is an async server component for the post page
export default async function PostPage({ params }: PageProps) {
  const slug = params.slug;
  const data = await getPostData(slug);

  if (!data) {
    notFound();
  }

  const { postData, contentHtml } = data;

  return (
    <article>
      <h1>{postData.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  );
}
