import { useMovieStore } from './store';
import { type JSX } from 'react';
import { useData } from './hooks';
import { MovieList } from './components/organisms';
import { StyledContainer, StyledSynopsis, StyleHeader } from './App.styles';

export const App = (): JSX.Element => {
  const { selectedMovie, setSelectedMovie } = useMovieStore();
  const [movies, error, isLoading] = useData();

  return (
    <StyledContainer>
      <StyleHeader>
        React Movie App by Alejandro Vásquez. Use left and right arrow keys to navigate.
      </StyleHeader>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {movies && (
        <>
          <MovieList
            movies={movies}
            onSelectMovie={setSelectedMovie}
          />
          <StyledSynopsis data-testid='movie-synopsis'>
            {selectedMovie ? selectedMovie.synopsis : ''}
          </StyledSynopsis>
        </>
      )}
    </StyledContainer>
  );
};
