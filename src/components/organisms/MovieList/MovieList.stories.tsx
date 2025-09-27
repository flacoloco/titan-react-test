// MovieList Stories - Storybook documentation for MovieList component
// Following project guidelines: never use title in meta object, proper TypeScript types

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MovieList } from './MovieList';
import type { Movie } from '@src/types';

// Mock data for stories following project guidelines - specific types, no 'any'
const mockMovies: Movie[] = [
    {
        id: 1,
        title: 'The Shawshank Redemption',
        images: {
            artwork_portrait: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg'
        }
    },
    {
        id: 2,
        title: 'The Godfather',
        images: {
            artwork_portrait: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg'
        }
    },
    {
        id: 3,
        title: 'The Dark Knight',
        images: {
            artwork_portrait: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg'
        }
    },
    {
        id: 4,
        title: 'Pulp Fiction',
        images: {
            artwork_portrait: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg'
        }
    },
    {
        id: 5,
        title: 'Forrest Gump',
        images: {
            artwork_portrait: 'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg'
        }
    }
];

const meta: Meta<typeof MovieList> = {
    component: MovieList,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'MovieList is an organism component that displays a grid of movies with selection functionality. It follows atomic design principles and allows users to select/deselect movies by clicking on them.'
            }
        }
    },
    argTypes: {
        movies: {
            description: 'Array of movie objects to display in the list',
            control: { type: 'object' }
        },
        selectedMovie: {
            description: 'Currently selected movie object or null if none selected',
            control: { type: 'object' }
        },
        setSelectedMovie: {
            description: 'Function to update the selected movie state',
            action: 'setSelectedMovie'
        }
    },
    tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive story with state management for demonstration
const MovieListWithState = (): React.ReactElement => {
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    return (
        <MovieList
            movies={mockMovies}
            selectedMovie={selectedMovie}
            setSelectedMovie={setSelectedMovie}
        />
    );
};

// Default story showing the component with interactive state
export const Default: Story = {
    render: () => <MovieListWithState />,
    parameters: {
        docs: {
            description: {
                story: 'Default view of MovieList with interactive selection. Click on any movie to select it, click again to deselect.'
            }
        }
    }
};

// Story showing empty state
export const Empty: Story = {
    args: {
        movies: [],
        selectedMovie: null,
        setSelectedMovie: (): void => { }
    },
    parameters: {
        docs: {
            description: {
                story: 'MovieList component when no movies are provided.'
            }
        }
    }
};

// Story with a movie pre-selected
export const WithSelectedMovie: Story = {
    args: {
        movies: mockMovies,
        selectedMovie: mockMovies[0],
        setSelectedMovie: (): void => { }
    },
    parameters: {
        docs: {
            description: {
                story: 'MovieList with the first movie pre-selected to show the selection visual state.'
            }
        }
    }
};

// Story showing single movie
export const SingleMovie: Story = {
    args: {
        movies: [mockMovies[0]],
        selectedMovie: null,
        setSelectedMovie: (): void => { }
    },
    parameters: {
        docs: {
            description: {
                story: 'MovieList component displaying only one movie.'
            }
        }
    }
};

// Story with many movies to show grid behavior
export const ManyMovies: Story = {
    args: {
        movies: [
            ...mockMovies,
            ...mockMovies.map(movie => ({
                ...movie,
                id: movie.id + 10,
                title: `${movie.title} (Extended)`
            })),
            ...mockMovies.map(movie => ({
                ...movie,
                id: movie.id + 20,
                title: `${movie.title} (Sequel)`
            }))
        ],
        selectedMovie: null,
        setSelectedMovie: (): void => { }
    },
    parameters: {
        docs: {
            description: {
                story: 'MovieList with many movies to demonstrate responsive grid behavior.'
            }
        }
    }
};
