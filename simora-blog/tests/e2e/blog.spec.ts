import { test, expect } from '@playwright/test';

test('blog page', async ({ page }) => {
  await page.goto('/blog');

  // Verify blog list
  await expect(page.getByTestId('blog-list')).toBeVisible();
  const posts = page.getByTestId('blog-post');
  await expect(posts.first()).toBeVisible();

  // Test post navigation
  const firstPost = posts.first();
  await firstPost.click();
  await expect(page).toHaveURL(/\/blog\/.+/);
  await expect(page.getByTestId('post-content')).toBeVisible();
});
