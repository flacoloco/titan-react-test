import { useMovieStore } from './store';
import { type JSX } from 'react';
import { useData } from './hooks';
import { MovieList } from './components/organisms';
import { StyledContainer, StyledSynopsis, StyleHeader } from './App.styles';

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
    <StyledContainer>
      <StyleHeader>
        React Movie App by Alejandro Vásquez. Use left and right arrow keys to navigate.
      </StyleHeader>
      <MovieList
        movies={movies}
        onSelectMovie={setSelectedMovie}
      />
      <StyledSynopsis>
        {selectedMovie ? selectedMovie.synopsis : ''}
      </StyledSynopsis>
    </StyledContainer>
  );
};
