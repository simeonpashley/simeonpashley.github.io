import { test, expect } from '@playwright/test';

test('navigation between pages', async ({ page }) => {
  await page.goto('/');

  // Test home page link
  const homeLink = page.getByTestId('nav-home');
  await expect(homeLink).toBeVisible();
  await homeLink.click();
  await expect(page).toHaveURL('/');

  // Test blog link
  const blogLink = page.getByTestId('nav-blog');
  await expect(blogLink).toBeVisible();
  await blogLink.click();
  await expect(page).toHaveURL('/blog');

  // Test about link
  const aboutLink = page.getByTestId('nav-about');
  await expect(aboutLink).toBeVisible();
  await aboutLink.click();
  await expect(page).toHaveURL('/about');
});
