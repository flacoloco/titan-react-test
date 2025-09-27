// MovieList Component - Organisms level component
// Following project guidelines: TypeScript types, styled-components, single responsibility

import React from 'react';
import styled from 'styled-components';
import type { Movie } from '../../../types';

// Props interface following project guidelines - specific types, no 'any'
export interface MovieListProps {
    movies: Movie[];
    selectedMovie: Movie | null;
    setSelectedMovie: (movie: Movie | null) => void;
}

// Styled components for MovieList
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1rem;
`;

const MovieCard = styled.div<{ isSelected: boolean }>`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: ${(props): string => props.isSelected ? '3px solid #007bff' : '1px solid #e0e0e0'};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

const MovieImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
`;

const MovieInfo = styled.div`
  padding: 1rem;
`;

const MovieTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  line-height: 1.3;
`;

const MovieId = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: #666;
`;

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
        <Container>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    isSelected={selectedMovie?.id === movie.id}
                    onClick={() => handleMovieClick(movie)}
                >
                    <MovieImage
                        src={movie.images.artwork_portrait}
                        alt={movie.title}
                        loading='lazy'
                    />
                    <MovieInfo>
                        <MovieTitle>{movie.title}</MovieTitle>
                        <MovieId>ID: {movie.id}</MovieId>
                    </MovieInfo>
                </MovieCard>
            ))}
        </Container>
    );
};