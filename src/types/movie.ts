// Movie-related TypeScript interfaces and types
// Following project guidelines: never use 'any' type, prefer specific types

export interface Movie {
  id: number;
  title: string;
  images: {
    artwork_portrait: string;
  }
}

// Store state type for movie-related data
export interface MovieState {
  selectedMovie: Movie | null;
}

// Store actions type for movie-related operations
export interface MovieActions {
  setSelectedMovie: (movie: Movie | null) => void;
}

export interface MovieListProps {
  movies: Movie[];
  selectedMovie: Movie | null;
  setSelectedMovie: (movie: Movie | null) => void;
}

export interface JsonMovie {
  id: number;
  title: string;
  images?: {
    artwork_portrait?: string;
  };
}
export interface MoviesCollection {
  collection: JsonMovie[];
}
