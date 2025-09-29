import { useState, useEffect } from 'react';
import type { Movie } from '@src/types/movie';

const fetchUrl = 'https://acc01.titanos.tv/v1/genres/1/contents?market=es&device=tv&locale=es&page=1&per_page=50&type=movie';

type UseDataReturn = [Movie[] | null, string | null, boolean];
/**
 * Custom hook for fetching data from a URL
 * @param url - The URL to fetch data from
 * @returns [data, error] - Array containing the fetched data and error state
 */
export const useData = (): UseDataReturn => {
  const [data, setData] = useState<Movie[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async (): Promise<void> => {
      setError(null);

      try {
        const response = await fetch(fetchUrl, { signal });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const movies = result.collection;
        setData(movies);
        setError(null);
      } catch (err) {
        setError(`An unknown error occurred:${err}`);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };


    fetchData();

    return (): void => {
      controller.abort();
    };
  }, []);

  return [data, error, isLoading];
};
