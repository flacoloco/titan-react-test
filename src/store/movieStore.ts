// Movie Store - Zustand state management for movie-related data
// Following project guidelines: TypeScript types, no 'any' usage, single responsibility

import { create } from 'zustand';
import type { Movie, MovieState, MovieActions } from '../types';

// Combined store interface following Zustand patterns
interface MovieStore extends MovieState, MovieActions { }

// Create the movie store with proper TypeScript typing
export const useMovieStore = create<MovieStore>((set) => ({
    // State
    selectedMovie: null,

    // Actions
    setSelectedMovie: (movie: Movie | null): void => set({ selectedMovie: movie })
}));