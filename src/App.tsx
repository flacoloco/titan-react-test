import { useMovieStore } from './store';
import type { JSX } from 'react';

export const App = (): JSX.Element => {
  const { selectedMovie, setSelectedMovie } = useMovieStore();

  return (
    <>
      // TODO: add MoviesList
    </>
  );
};
