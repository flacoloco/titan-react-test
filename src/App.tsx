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
      <p>
        React Movie App by Alejandro Vásquez. Use left and right arrow keys to navigate.
      </p>
      <div style={{ backgroundColor: 'pink', width: '1000px' }}>
        <MovieList
          movies={movies}
          selectedMovie={null}
          setSelectedMovie={() => { }}
        />
      </div>
    </>
  );
};
