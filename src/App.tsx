import { useMovieStore } from './store';
import { type JSX } from 'react';
import { useData } from './hooks';
import { MovieList } from './components/organisms';

export const App = (): JSX.Element => {
  const { selectedMovie, setSelectedMovie } = useMovieStore();
  const [movies, error] = useData();

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movies) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <MovieList
        movies={movies}
        selectedMovie={null}
        setSelectedMovie={() => { }}
      />
    </>
  );
};
