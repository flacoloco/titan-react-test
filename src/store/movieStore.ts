// Movie Store - Zustand state management for movie-related data

import { create } from 'zustand';
import type { Movie, MovieStore } from '@src/types';


export const useMovieStore = create<MovieStore>((set) => ({
  selectedMovie: null,
  setSelectedMovie: (movie: Movie | null): void => set({ selectedMovie: movie })
}));
