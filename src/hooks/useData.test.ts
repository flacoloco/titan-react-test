// useData Hook Tests
// Following project guidelines: TypeScript types, comprehensive testing, no 'any' usage

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useData } from './useData';
import type { Movie } from '@src/types/movie';

// Mock data that matches the expected API response structure
const mockMovieData: Movie[] = [
  {
    id: 1,
    synopsis: 'A great movie about testing.',
    title: 'Test Movie 1',
    images: {
      artwork_portrait: 'https://example.com/poster1.jpg'
    }
  },
  {
    id: 2,
    synopsis: 'Another great movie about testing.',
    title: 'Test Movie 2',
    images: {
      artwork_portrait: 'https://example.com/poster2.jpg'
    }
  }
];

const mockApiResponse = {
  collection: mockMovieData
};

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('useData Hook', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Reset mocks after each test
    vi.resetAllMocks();
  });

  it('should return initial state with null data and null error', () => {
    // Mock a pending promise to prevent useEffect from completing
    mockFetch.mockReturnValue(new Promise(() => { }));

    const { result } = renderHook(() => useData());
    const [data, error] = result.current;

    expect(data).toBeNull();
    expect(error).toBeNull();
  });

  it('should fetch and return movie data successfully', async () => {
    // Mock successful API response
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    const { result } = renderHook(() => useData());

    // Wait for the effect to complete
    await waitFor(() => {
      const [data, error] = result.current;
      expect(data).toEqual(mockMovieData);
      expect(error).toBeNull();
    });

    // Verify fetch was called with correct URL
    expect(mockFetch).toHaveBeenCalledWith(
      'https://acc01.titanos.tv/v1/genres/1/contents?market=es&device=tv&locale=es&page=1&per_page=50&type=movie',
      expect.objectContaining({
        signal: expect.any(AbortSignal)
      })
    );
  });

  it('should handle HTTP error responses', async () => {
    // Mock HTTP error response
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const { result } = renderHook(() => useData());

    await waitFor(() => {
      const [data, error] = result.current;
      expect(data).toBeNull();
      expect(error).toBe('An unknown error occurred:Error: HTTP error! status: 404');
    });
  });

  it('should handle network errors', async () => {
    // Mock network error
    const networkError = new Error('Network error');
    mockFetch.mockRejectedValueOnce(networkError);

    const { result } = renderHook(() => useData());

    await waitFor(() => {
      const [data, error] = result.current;
      expect(data).toBeNull();
      expect(error).toBe('An unknown error occurred:Error: Network error');
    });
  });

  it('should handle malformed JSON response', async () => {
    // Mock response with invalid JSON
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => {
        throw new Error('Invalid JSON');
      },
    });

    const { result } = renderHook(() => useData());

    await waitFor(() => {
      const [data, error] = result.current;
      expect(data).toBeNull();
      expect(error).toBe('An unknown error occurred:Error: Invalid JSON');
    });
  });

  it('should abort fetch request on component unmount', () => {
    const mockAbort = vi.fn();
    const mockAbortController = {
      signal: {
        aborted: false,
        onabort: null,
        reason: undefined,
        throwIfAborted: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn()
      },
      abort: mockAbort,
    };

    // Mock AbortController
    vi.spyOn(window, 'AbortController').mockImplementation(() => mockAbortController as unknown as AbortController);

    // Mock a pending promise
    mockFetch.mockReturnValue(new Promise(() => { }));

    const { unmount } = renderHook(() => useData());

    // Unmount the component
    unmount();

    // Verify abort was called
    expect(mockAbort).toHaveBeenCalled();
  });
});
