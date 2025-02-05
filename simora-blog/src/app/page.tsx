import fs from 'fs';
import path from 'path';
import Link from 'next/link';

interface Post {
  slug: string;
  title: string;
  date: string;
  fileName: string;
  built_excerpt?: string;
  // ...other fields
}

interface PostsData {
  posts: Post[];
  categories: string[];
  tags: string[];
}

interface HomePageProps {
  searchParams: { page?: string };
}

const POSTS_PER_PAGE = 5;

export default async function HomePage({ searchParams }: HomePageProps) {
  // Load posts data from JSON
  const postsDataPath = path.join(process.cwd(), 'public', 'data', 'posts-data.json');
  const postsData: PostsData = JSON.parse(fs.readFileSync(postsDataPath, 'utf8'));

  // Sort posts descending by date (newest first)
  const sortedPosts = postsData.posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  // Determine current page from query parameter (defaults to 1)
  const currentPage = searchParams.page ? parseInt(searchParams.page, 10) || 1 : 1;
  const totalPosts = sortedPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  // Get the slice of posts for the current page
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = sortedPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {paginatedPosts.map((post) => (
          <li key={post.slug} style={{ marginBottom: '2rem' }}>
            <h2>
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </h2>
            <p>{post.built_excerpt ? post.built_excerpt : ''}</p>
          </li>
        ))}
      </ul>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

function Pagination({ currentPage, totalPages }: PaginationProps) {
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <nav>
      <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none' }}>
        {prevPage && (
          <li>
            <Link href={`/?page=${prevPage}`}>Previous</Link>
          </li>
        )}
        <li>
          Page {currentPage} of {totalPages}
        </li>
        {nextPage && (
          <li>
            <Link href={`/?page=${nextPage}`}>Next</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
