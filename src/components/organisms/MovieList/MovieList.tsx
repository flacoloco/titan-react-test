// MovieList Component - Organisms level component
// Following project guidelines: TypeScript types, styled-components, single responsibility

import React from 'react';
import type { MovieListProps } from '@src/types';
import {
  StyledContainer,
  StyledMovieCard,
  StyledMovieImage,
  StyledMovieList,
  StyledMovieTitle
} from './MovieList.styles';


// MovieList component following functional component pattern with FC type
export const MovieList: React.FC<MovieListProps> = ({
  movies,
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
            setSelectedMovie(movies[newIndex]);
            return newIndex;
          });
          break;
        case 'ArrowLeft':
          event.preventDefault();
          setSelectedIndex((prevIndex) => {
            const newIndex = prevIndex > 0 ? prevIndex - 1 : 0;
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

  return (
    <StyledContainer>
      <StyledMovieList $selectedIndex={selectedIndex}>
        {movies.map((movie, index) => (
          <StyledMovieCard
            key={movie.id}
            $isSelected={selectedIndex === index}
          >
            <StyledMovieImage
              $backgroundImage={movie.images.artwork_portrait}
              $isSelected={selectedIndex === index}
            />
            {selectedIndex === index && (
              <StyledMovieTitle>{movie.title}</StyledMovieTitle>
            )}
          </StyledMovieCard>
        ))}
      </StyledMovieList>
    </StyledContainer>
  );
};
