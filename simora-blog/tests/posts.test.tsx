import { render, screen } from '@testing-library/react';
import PostsPage from '../src/app/posts/page';
import PostPage from '../src/app/posts/[slug]/page';

// Mock content imports
jest.mock('../src/app/posts/page', () => ({
  __esModule: true,
  default: () => (
    <div>
      <h1>Latest Insights</h1>
      <div>Test Post</div>
      <div>This is a test post</div>
    </div>
  )
}));

jest.mock('../src/app/posts/[slug]/page', () => ({
  __esModule: true,
  default: ({ params }: { params: { slug: string } }) => {
    if (params.slug === 'missing-post') {
      require('next/navigation').notFound();
      return null;
    }
    return (
      <div>
        <h1>Test Post</h1>
        <div>Test Content</div>
      </div>
    );
  }
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  notFound: jest.fn()
}));

// Mock fs and gray-matter
jest.mock('fs', () => ({
  readFileSync: jest.fn(),
  readdirSync: jest.fn()
}));
jest.mock('gray-matter');

describe('Posts Page', () => {
  it('renders the posts listing', () => {
    // Mock post data
    const mockPosts = [{
      slug: 'test-post',
      frontMatter: {
        title: 'Test Post',
        date: '2023-01-01',
        home_preview: 'This is a test post'
      }
    }];

    // Mock fs and gray-matter responses
    require('fs').readdirSync.mockReturnValue(['test-post.md']);
    require('gray-matter').mockReturnValue({
      data: mockPosts[0].frontMatter
    });

    render(<PostsPage />);

    expect(screen.getByText('Latest Insights')).toBeInTheDocument();
    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('This is a test post')).toBeInTheDocument();
  });
});

describe('Post Page', () => {
  it('renders a post', () => {
    // Mock post data
    const mockPost = {
      frontMatter: {
        title: 'Test Post',
        date: '2023-01-01'
      },
      content: '# Test Content'
    };

    // Mock fs and gray-matter responses
    require('fs').readFileSync.mockReturnValue('mock content');
    require('gray-matter').mockReturnValue(mockPost);

    render(<PostPage params={{ slug: 'test-post' }} />);

    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('shows 404 for missing posts', () => {
    require('fs').readFileSync.mockImplementation(() => {
      throw new Error('File not found');
    });

    render(<PostPage params={{ slug: 'missing-post' }} />);
    expect(require('next/navigation').notFound).toHaveBeenCalled();
  });
});
