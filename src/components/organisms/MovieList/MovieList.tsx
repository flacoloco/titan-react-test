// MovieList Component - Organisms level component
// Following project guidelines: TypeScript types, styled-components, single responsibility

import React from 'react';
import type { Movie, MovieListProps } from '@src/types';
import {
  StyledContainer,
  StyledMovieCard,
  StyledMovieId,
  StyledMovieImage,
  StyledMovieInfo,
  StyledMovieList,
  StyledMovieTitle
} from './MovieList.styles';


// MovieList component following functional component pattern with FC type
export const MovieList: React.FC<MovieListProps> = ({
  movies,
  selectedMovie,
  setSelectedMovie
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (movies.length === 0) return;

      switch (event.key) {
        case 'ArrowRight':
          event.preventDefault();
          setSelectedIndex((prevIndex) => {
            const newIndex = prevIndex < movies.length - 1 ? prevIndex + 1 : movies.length - 1;
            console.log('New Index:', newIndex);
            setSelectedMovie(movies[newIndex]);
            return newIndex;
          });
          break;
        case 'ArrowLeft':
          event.preventDefault();
          setSelectedIndex((prevIndex) => {
            const newIndex = prevIndex > 0 ? prevIndex - 1 : 0;
            console.log('New Index:', newIndex);
            setSelectedMovie(movies[newIndex]);
            return newIndex;
          });
          break;
        default:
          break;
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener
    return (): void => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [movies, setSelectedMovie]);

  const handleMovieClick = (movie: Movie): void => {
    // Toggle selection: if same movie is clicked, deselect it
    if (selectedMovie?.id === movie.id) {
      setSelectedMovie(null);
    } else {
      setSelectedMovie(movie);
    }
  };

  return (
    <StyledContainer>
      <StyledMovieList $selectedIndex={selectedIndex}>
        {movies.map((movie) => (
          <StyledMovieCard
            key={movie.id}
            $isSelected={selectedMovie?.id === movie.id}
            onClick={() => handleMovieClick(movie)}
          >
            <StyledMovieImage
              src={movie.images.artwork_portrait}
              alt={movie.title}
              loading='lazy'
            />
            <StyledMovieInfo>
              <StyledMovieTitle>{movie.title}</StyledMovieTitle>
              <StyledMovieId>ID: {movie.id}</StyledMovieId>
            </StyledMovieInfo>
          </StyledMovieCard>
        ))}
      </StyledMovieList>
    </StyledContainer>
  );
};
