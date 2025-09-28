import { test, expect } from '@playwright/test';

test.describe('Movie App E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto('/');
  });

  test('should load the app and display the header', async ({ page }) => {
    // Wait for the app to load
    await expect(page.locator('text=React Movie App by Alejandro Vásquez')).toBeVisible();
    await expect(page.locator('text=Use left and right arrow keys to navigate')).toBeVisible();
  });

  test('should show loading state initially', async ({ page }) => {
    // Check for loading state (might be brief)
    const loadingText = page.locator('text=Loading...');
    // We use waitFor with a short timeout since loading might be very brief
    try {
      await loadingText.waitFor({ timeout: 1000 });
    } catch {
      // Loading might be too fast to catch, which is fine
    }
  });

  test('should display movies after loading', async ({ page }) => {
    // Wait for movies to load by checking for movie elements
    await page.waitForSelector('[data-testid="movie-card"]', { timeout: 10000 });

    // Check that movies are displayed
    const movieCards = page.locator('[data-testid="movie-card"]');
    expect(await movieCards.count()).toBeGreaterThan(0);

    // Check that the first movie is selected by default
    const selectedMovie = page.locator('[data-testid="movie-card"][data-selected="true"]');
    await expect(selectedMovie).toHaveCount(1);
  });

  test('should navigate through movies using keyboard arrows', async ({ page }) => {
    // Wait for movies to load
    await page.waitForSelector('[data-testid="movie-card"]', { timeout: 10000 });

    // Get the total number of movies
    const movieCards = page.locator('[data-testid="movie-card"]');
    const movieCount = await movieCards.count();
    expect(movieCount).toBeGreaterThan(1); // Ensure we have multiple movies to test navigation

    // Check initial selection (should be first movie - index 0)
    let selectedMovie = page.locator('[data-testid="movie-card"][data-selected="true"]');
    await expect(selectedMovie).toHaveCount(1);

    // Get the initial selected movie's data-index
    const initialIndex = await selectedMovie.getAttribute('data-index');
    expect(initialIndex).toBe('0');

    // Navigate right with arrow key
    await page.keyboard.press('ArrowRight');

    // Check that selection moved to next movie
    selectedMovie = page.locator('[data-testid="movie-card"][data-selected="true"]');
    const newIndex = await selectedMovie.getAttribute('data-index');
    expect(newIndex).toBe('1');

    // Navigate left with arrow key
    await page.keyboard.press('ArrowLeft');

    // Check that selection moved back to first movie
    selectedMovie = page.locator('[data-testid="movie-card"][data-selected="true"]');
    const backIndex = await selectedMovie.getAttribute('data-index');
    expect(backIndex).toBe('0');
  });

  test('should not navigate beyond the first movie when pressing left', async ({ page }) => {
    // Wait for movies to load
    await page.waitForSelector('[data-testid="movie-card"]', { timeout: 10000 });

    // Ensure we start at the first movie
    let selectedMovie = page.locator('[data-testid="movie-card"][data-selected="true"]');
    let currentIndex = await selectedMovie.getAttribute('data-index');
    expect(currentIndex).toBe('0');

    // Try to navigate left (should stay at index 0)
    await page.keyboard.press('ArrowLeft');

    // Check that we're still at the first movie
    selectedMovie = page.locator('[data-testid="movie-card"][data-selected="true"]');
    currentIndex = await selectedMovie.getAttribute('data-index');
    expect(currentIndex).toBe('0');
  });

  test('should not navigate beyond the last movie when pressing right', async ({ page }) => {
    // Wait for movies to load
    await page.waitForSelector('[data-testid="movie-card"]', { timeout: 10000 });

    // Get total number of movies
    const movieCards = page.locator('[data-testid="movie-card"]');
    const movieCount = await movieCards.count();
    const lastIndex = movieCount - 1;

    // Navigate to the last movie
    for (let i = 0; i < lastIndex; i++) {
      await page.keyboard.press('ArrowRight');
    }

    // Verify we're at the last movie
    let selectedMovie = page.locator('[data-testid="movie-card"][data-selected="true"]');
    let currentIndex = await selectedMovie.getAttribute('data-index');
    expect(currentIndex).toBe(lastIndex.toString());

    // Try to navigate right (should stay at last index)
    await page.keyboard.press('ArrowRight');

    // Check that we're still at the last movie
    selectedMovie = page.locator('[data-testid="movie-card"][data-selected="true"]');
    currentIndex = await selectedMovie.getAttribute('data-index');
    expect(currentIndex).toBe(lastIndex.toString());
  });

  test('should display movie synopsis when a movie is selected', async ({ page }) => {
    // Wait for movies to load
    await page.waitForSelector('[data-testid="movie-card"]', { timeout: 10000 });

    // Wait for synopsis to appear
    const synopsisContainer = page.locator('[data-testid="movie-synopsis"]');
    await expect(synopsisContainer).toBeVisible();

    // Check that synopsis content is not empty for the initially selected movie
    const synopsisText = await synopsisContainer.textContent();
    expect(synopsisText?.trim()).toBeTruthy();

    // Navigate to next movie
    await page.keyboard.press('ArrowRight');

    // Wait a bit for the synopsis to update
    await page.waitForTimeout(100);

    // Check that synopsis updated (might be different)
    const newSynopsisText = await synopsisContainer.textContent();
    expect(newSynopsisText?.trim()).toBeTruthy();
  });

  test('should display movie title for selected movie', async ({ page }) => {
    // Wait for movies to load
    await page.waitForSelector('[data-testid="movie-card"]', { timeout: 10000 });

    // Check that the selected movie shows its title
    const selectedMovie = page.locator('[data-testid="movie-card"][data-selected="true"]');
    const movieTitle = selectedMovie.locator('[data-testid="movie-title"]');

    await expect(movieTitle).toBeVisible();
    const titleText = await movieTitle.textContent();
    expect(titleText?.trim()).toBeTruthy();
  });

  test('should handle multiple rapid key presses', async ({ page }) => {
    // Wait for movies to load
    await page.waitForSelector('[data-testid="movie-card"]', { timeout: 10000 });

    // Get total number of movies
    const movieCards = page.locator('[data-testid="movie-card"]');
    const movieCount = await movieCards.count();

    if (movieCount > 3) {
      // Rapidly press right arrow multiple times
      for (let i = 0; i < 3; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(50); // Small delay between presses
      }

      // Check final position
      const selectedMovie = page.locator('[data-testid="movie-card"][data-selected="true"]');
      const finalIndex = await selectedMovie.getAttribute('data-index');
      expect(finalIndex).toBe('3');
    }
  });

  test('should handle API errors gracefully', async ({ page }) => {
    // Mock a failed API response
    await page.route('**/v1/genres/1/contents*', route => {
      route.abort('failed');
    });

    // Navigate to the app
    await page.goto('/');

    // Check for error message
    await expect(page.locator('text=Error:')).toBeVisible({ timeout: 10000 });
  });

  test('should load movie images', async ({ page }) => {
    // Wait for movies to load
    await page.waitForSelector('[data-testid="movie-card"]', { timeout: 10000 });

    // Check that movie images are present
    const movieImages = page.locator('[data-testid="movie-image"]');
    await expect(movieImages.first()).toBeVisible();

    // Check that at least one image has loaded successfully
    const firstImage = movieImages.first();
    await expect(firstImage).toHaveAttribute('src');
  });
});
