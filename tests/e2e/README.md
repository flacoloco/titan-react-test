# E2E Testing Setup and Usage

This directory contains Playwright end-to-end tests for the Movie App, focusing on keyboard navigation functionality.

## Setup

The Playwright E2E tests are configured to run against the local development server. Make sure you have Playwright installed:

```bash
npm install @playwright/test
```

If this is your first time using Playwright, you may need to install the browsers:

```bash
npx playwright install
```

## Test Files

- `app.spec.ts` - Comprehensive app functionality tests
- `keyboard-navigation.spec.ts` - Focused tests for keyboard navigation features

## Key Test Scenarios

### Keyboard Navigation Tests
- ✅ Navigate through movies using left/right arrow keys
- ✅ Verify movie selection updates correctly
- ✅ Test boundary conditions (can't navigate beyond first/last movie)
- ✅ Ensure rapid key presses are handled properly

### UI State Tests
- ✅ Movie synopsis updates when selection changes
- ✅ Movie title displays for selected movie
- ✅ Movie images load correctly
- ✅ Loading states display properly

### Error Handling Tests
- ✅ API failure scenarios
- ✅ Network error graceful handling

## Running Tests

### Run all E2E tests
```bash
npm run test:e2e
```

### Run tests in headed mode (see browser)
```bash
npm run test:e2e:headed
```

### Run specific test file
```bash
npx playwright test tests/e2e/keyboard-navigation.spec.ts
```

### Run tests in debug mode
```bash
npx playwright test --debug
```

### Generate test report
```bash
npx playwright show-report
```

## Test Data Attributes

The components have been updated with the following test attributes:

- `data-testid="movie-card"` - Individual movie items
- `data-selected="true|false"` - Whether movie is currently selected
- `data-index="0|1|2..."` - Movie position in the list
- `data-testid="movie-image"` - Movie poster images
- `data-testid="movie-title"` - Movie title text
- `data-testid="movie-synopsis"` - Movie synopsis container

## Configuration

The tests are configured in `playwright.config.ts`:

- **Browsers**: Chrome
- **Base URL**: http://localhost:5173 (Vite dev server)
- **Timeout**: 30 seconds per test
- **Retries**: 2 retries on CI
- **Screenshots**: On failure only
- **Traces**: On first retry

## Prerequisites for Testing

1. **Development Server**: Tests automatically start the dev server (`npm run dev`)
2. **Network Access**: Tests fetch real movie data from Titan OS API
3. **Keyboard Events**: Tests simulate actual keyboard interactions

## Troubleshooting

### Common Issues

1. **Timeout errors**: Increase timeout if API is slow
2. **Element not found**: Check that test attributes are properly added
3. **Flaky tests**: Add appropriate waits for state changes

### Debug Tips

1. Use `--headed` flag to see browser actions
2. Add `await page.pause()` to stop execution at specific points
3. Use `--debug` flag for step-by-step debugging
4. Check `test-results/` folder for failure screenshots

## Best Practices

1. **Wait for elements**: Always wait for dynamic content to load
2. **Use data-testid**: Prefer test IDs over text content or CSS selectors
3. **Test user flows**: Focus on actual user interactions
4. **Handle async operations**: Account for API calls and state updates
5. **Boundary testing**: Test edge cases and error conditions
