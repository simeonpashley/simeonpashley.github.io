import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/app/layout';
import PostsPage from '../src/app/posts/page';
import PostPage from '../src/app/posts/[slug]/page';
import { ReactNode } from 'react';

// Mock layout component with children
const MockApp = ({ children }: { children: ReactNode }) => (
  <App>
    {children}
  </App>
);

describe('Posts Integration', () => {
  it('should display posts list and navigate to post', async () => {
    render(
      <MemoryRouter>
        <MockApp>
          <PostsPage />
        </MockApp>
      </MemoryRouter>
    );

    // Verify posts list is displayed
    await waitFor(() => {
      expect(screen.getByText('Latest Insights')).toBeInTheDocument();
    });

    // Click on first post
    const firstPost = screen.getAllByRole('link', { name: /read more/i })[0];
    await userEvent.click(firstPost);

    // Verify post content is displayed
    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByText(/published on/i)).toBeInTheDocument();
    });
  });

  it('should show 404 for invalid post', async () => {
    render(
      <MemoryRouter initialEntries={['/posts/invalid-post']}>
        <MockApp>
          <PostPage params={{ slug: 'invalid-post' }} />
        </MockApp>
      </MemoryRouter>
    );

    // Verify 404 page is displayed
    await waitFor(() => {
      expect(screen.getByText(/not found/i)).toBeInTheDocument();
    });
  });
});
