import React from 'react';
import type { MovieListProps } from '@src/types';
import {
  StyledContainer,
  StyledMImage,
  StyledMovieCard,
  StyledMovieImageContainer,
  StyledMovieList,
  StyledMovieTitle
} from './MovieList.styles';
import imageError from '@src/assets/imageError.svg';

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

  const onLoadImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>): void => {
    e.currentTarget.src = imageError;
  };

  return (
    <StyledContainer>
      <StyledMovieList $selectedIndex={selectedIndex}>
        {movies.length === 0 && <p>No movies available</p>}
        {movies.map((movie, index) => (
          <StyledMovieCard key={movie.id} $isSelected={selectedIndex === index}>
            <StyledMovieImageContainer
              key={movie.id}
              $isSelected={selectedIndex === index}
            >
              <StyledMImage
                onError={(e) => onLoadImageError(e)}
                src={movie.images.artwork_portrait}
                $isSelected={selectedIndex === index}
              />
            </StyledMovieImageContainer>


            {selectedIndex === index && (
              <StyledMovieTitle>{movie.title}</StyledMovieTitle>
            )}
          </StyledMovieCard>
        ))}
      </StyledMovieList>
    </StyledContainer>
  );
};
