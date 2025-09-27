// Movie-related TypeScript interfaces and types
// Following project guidelines: never use 'any' type, prefer specific types

export interface Movie {
    id: number;
    title: string;
    overview?: string;
    releaseDate?: string;
    posterPath?: string;
    backdropPath?: string;
    voteAverage?: number;
    voteCount?: number;
    genre?: string[];
    runtime?: number;
    director?: string;
    cast?: string[];
}

// Store state type for movie-related data
export interface MovieState {
    selectedMovie: Movie | null;
}

// Store actions type for movie-related operations
export interface MovieActions {
    setSelectedMovie: (movie: Movie | null) => void;
}