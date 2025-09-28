// Movie-related TypeScript interfaces and types
// Following project guidelines: never use 'any' type, prefer specific types

export interface Movie {
  id: number;
  synopsis: string;
  title: string;
  images: {
    artwork_portrait: string;
  }
}

// Store state type for movie-related data
export interface MovieStore {
  selectedMovie: Movie | null;
  setSelectedMovie: (movie: Movie | null) => void;
}

export interface MovieListProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie | null) => void;
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
