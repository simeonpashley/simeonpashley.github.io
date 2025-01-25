import { test, expect } from '@playwright/test';

test('404 page', async ({ page }) => {
  await page.goto('/non-existent-page');
  await expect(page.getByTestId('404-page')).toBeVisible();
  await expect(page.getByTestId('404-title')).toContainText('Page Not Found');
});

test('500 page', async ({ page }) => {
  // Simulate server error by visiting error page directly
  await page.goto('/500');
  await expect(page.getByTestId('500-page')).toBeVisible();
  await expect(page.getByTestId('500-title')).toContainText('Server Error');
});
