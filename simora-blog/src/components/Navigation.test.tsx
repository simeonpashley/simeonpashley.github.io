import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navigation from './Navigation';

describe('Navigation', () => {
  it('renders all navigation links', () => {
    render(<Navigation />);

    const homeLink = screen.getByTestId('nav-home');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');

    const blogLink = screen.getByTestId('nav-blog');
    expect(blogLink).toBeInTheDocument();
    expect(blogLink).toHaveAttribute('href', '/blog');

    const aboutLink = screen.getByTestId('nav-about');
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '/about');
  });

  it('renders the navigation bar with correct structure', () => {
    render(<Navigation />);

    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeInTheDocument();
    expect(navElement).toHaveClass('bg-white', 'shadow-sm');
  });
});
