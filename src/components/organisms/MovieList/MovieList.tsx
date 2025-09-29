import { useEffect, useState } from 'react';
import type { FC, SyntheticEvent } from 'react';
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

export const MovieList: FC<MovieListProps> = ({
  movies,
  onSelectMovie
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (movies.length === 0) return;

      switch (event.key) {
        case 'ArrowRight':
          event.preventDefault();
          setSelectedIndex((prevIndex) => {
            const newIndex = prevIndex < movies.length - 1 ? prevIndex + 1 : movies.length - 1;
            return newIndex;
          });

          break;
        case 'ArrowLeft':
          event.preventDefault();
          setSelectedIndex((prevIndex) => {
            const newIndex = prevIndex > 0 ? prevIndex - 1 : 0;
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
  }, [movies, onSelectMovie]);

  useEffect(() => {
    if (movies.length > 0) {
      onSelectMovie(movies[selectedIndex]);
    } else {
      onSelectMovie(null);
    }
  }, [selectedIndex, movies, onSelectMovie]);

  const onLoadImageError = (e: SyntheticEvent<HTMLImageElement, Event>): void => {
    e.currentTarget.src = imageError;
  };

  return (
    <StyledContainer>
      <StyledMovieList $selectedIndex={selectedIndex}>
        {movies.length === 0 && <p>No movies available</p>}
        {movies.map((movie, index) => (
          <StyledMovieCard
            key={movie.id}
            $isSelected={selectedIndex === index}
            data-testid='movie-card'
            data-selected={selectedIndex === index}
            data-index={index}
          >
            <StyledMovieImageContainer
              key={movie.id}
              $isSelected={selectedIndex === index}
            >
              <StyledMImage
                loading='lazy'
                onError={(e) => onLoadImageError(e)}
                src={movie.images.artwork_portrait}
                $isSelected={selectedIndex === index}
                data-testid='movie-image'
              />
            </StyledMovieImageContainer>


            {selectedIndex === index && (
              <StyledMovieTitle data-testid='movie-title'>{movie.title}</StyledMovieTitle>
            )}
          </StyledMovieCard>
        ))}
      </StyledMovieList>
    </StyledContainer>
  );
};
