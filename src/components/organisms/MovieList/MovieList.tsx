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
  StyledMovieTitle
} from './MovieList.styles';


// MovieList component following functional component pattern with FC type
export const MovieList: React.FC<MovieListProps> = ({
  movies,
  selectedMovie,
  setSelectedMovie
}) => {
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
      {movies.map((movie) => (
        <StyledMovieCard
          key={movie.id}
          isSelected={selectedMovie?.id === movie.id}
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
    </StyledContainer>
  );
};
