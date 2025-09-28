// MovieList Stories - Storybook documentation for MovieList component
// Following project guidelines: never use title in meta object, proper TypeScript types

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MovieList } from './MovieList';
import type { Movie } from '@src/types';
import moviesData from '@src/mockData/movies.json';

// Interface for the JSON movie structure
interface JsonMovie {
  id: number;
  title: string;
  images?: {
    artwork_portrait?: string;
  };
}

// Interface for the movies collection
interface MoviesCollection {
  collection: JsonMovie[];
}

// Transform JSON data to match Movie type interface
const transformMovieData = (jsonMovie: JsonMovie): Movie => ({
  id: jsonMovie.id,
  title: jsonMovie.title,
  images: {
    artwork_portrait: jsonMovie.images?.artwork_portrait || ''
  }
});

// Get movies from JSON file and transform them
const mockMovies: Movie[] = (moviesData as MoviesCollection).collection
  .filter((movie: JsonMovie) => movie.images?.artwork_portrait) // Filter out movies without portrait images
  .map(transformMovieData);

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

export const ManyMovies: Story = {
  args: {
    movies: mockMovies,
    selectedMovie: null,
    setSelectedMovie: (): void => { }
  },
  parameters: {
    docs: {
      description: {
        story: 'MovieList with many movies.'
      }
    }
  }
};
