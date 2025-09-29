import { test, expect } from '@playwright/test';

test.describe('Movie App Keyboard Navigation', () => {

  test('should navigate movies using arrow keys', async ({ page }) => {
    // Navigate to the app
    await page.goto('/');

    // Wait for movies to load
    await page.waitForSelector('[data-testid="movie-card"]', { timeout: 10000 });

    // Get the total number of movies
    const movieCards = page.locator('[data-testid="movie-card"]');
    const movieCount = await movieCards.count();
    expect(movieCount).toBeGreaterThan(1);

    // Verify first movie is selected initially
    await expect(page.locator('[data-testid="movie-card"][data-selected="true"]')).toHaveCount(1);
    await expect(page.locator('[data-testid="movie-card"][data-index="0"]')).toHaveAttribute('data-selected', 'true');

    // Navigate right using arrow key
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(100); // Small delay for state update

    // Verify selection moved to second movie
    await expect(page.locator('[data-testid="movie-card"][data-index="1"]')).toHaveAttribute('data-selected', 'true');
    await expect(page.locator('[data-testid="movie-card"][data-index="0"]')).toHaveAttribute('data-selected', 'false');

    // Navigate left using arrow key
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(100);

    // Verify selection moved back to first movie
    await expect(page.locator('[data-testid="movie-card"][data-index="0"]')).toHaveAttribute('data-selected', 'true');
    await expect(page.locator('[data-testid="movie-card"][data-index="1"]')).toHaveAttribute('data-selected', 'false');
  });

  test('should display synopsis when movie is selected', async ({ page }) => {
    // Navigate to the app
    await page.goto('/');

    // Wait for movies to load
    await page.waitForSelector('[data-testid="movie-card"]', { timeout: 10000 });

    // Check that synopsis is displayed
    const synopsis = page.locator('[data-testid="movie-synopsis"]');
    await expect(synopsis).toBeVisible();

    // Get initial synopsis text
    const initialSynopsis = await synopsis.textContent();
    expect(initialSynopsis?.trim()).toBeTruthy();

    // Navigate to next movie
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(200); // Wait for synopsis to update

    // Synopsis should still be visible (and potentially different)
    await expect(synopsis).toBeVisible();
    const newSynopsis = await synopsis.textContent();
    expect(newSynopsis?.trim()).toBeTruthy();
  });

  test('should show movie title for selected movie', async ({ page }) => {
    // Navigate to the app
    await page.goto('/');

    // Wait for movies to load
    await page.waitForSelector('[data-testid="movie-card"]', { timeout: 10000 });

    // Check that movie title is displayed for selected movie
    const movieTitle = page.locator('[data-testid="movie-title"]');
    await expect(movieTitle).toBeVisible();

    const titleText = await movieTitle.textContent();
    expect(titleText?.trim()).toBeTruthy();
  });

  test('should not navigate beyond boundaries', async ({ page }) => {
    // Navigate to the app
    await page.goto('/');

    // Wait for movies to load
    await page.waitForSelector('[data-testid="movie-card"]', { timeout: 10000 });

    // Verify we start at first movie
    await expect(page.locator('[data-testid="movie-card"][data-index="0"]')).toHaveAttribute('data-selected', 'true');

    // Try to navigate left from first movie (should stay at first)
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(100);
    await expect(page.locator('[data-testid="movie-card"][data-index="0"]')).toHaveAttribute('data-selected', 'true');

    // Navigate to last movie
    const movieCards = page.locator('[data-testid="movie-card"]');
    const movieCount = await movieCards.count();
    const lastIndex = movieCount - 1;

    for (let i = 0; i < lastIndex; i++) {
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(50);
    }

    // Verify we're at last movie
    await expect(page.locator(`[data-testid="movie-card"][data-index="${lastIndex}"]`)).toHaveAttribute('data-selected', 'true');

    // Try to navigate right from last movie (should stay at last)
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(100);
    await expect(page.locator(`[data-testid="movie-card"][data-index="${lastIndex}"]`)).toHaveAttribute('data-selected', 'true');
  });

  test('should handle loading and error states', async ({ page }) => {
    // Test error state by intercepting API call
    await page.route('**/v1/genres/1/contents*', route => {
      route.abort('failed');
    });

    await page.goto('/');

    // Should show error message
    await expect(page.locator('text=Error:')).toBeVisible({ timeout: 5000 });
  });

  test('should display movie images', async ({ page }) => {
    // Navigate to the app
    await page.goto('/');

    // Wait for movies to load
    await page.waitForSelector('[data-testid="movie-card"]', { timeout: 10000 });

    // Check that movie images are present
    const movieImages = page.locator('[data-testid="movie-image"]');
    await expect(movieImages.first()).toBeVisible();

    // Verify image has src attribute
    await expect(movieImages.first()).toHaveAttribute('src');
  });
});
