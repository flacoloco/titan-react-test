import type { Meta, StoryObj } from '@storybook/react-vite';
import { MovieList } from './MovieList';
import type { Movie } from '@src/types';
import moviesData from '@src/mockData/movies.json';

// Get movies from JSON file and transform them
const mockMovies: Movie[] = moviesData.collection
  .slice(0, 20); // Take first 20 movies

const meta: Meta<typeof MovieList> = {
  component: MovieList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'MovieList is an organism component that displays a list of movies. It allows users to navigate the list using keyboard controls.'
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

export const Default: Story = {
  render: () => (
    <MovieList
      movies={mockMovies}
      selectedMovie={null}
      setSelectedMovie={() => { }}
    />),
  parameters: {
    docs: {
      description: {
        story: 'Default view of MovieList.'
      }
    }
  }
};

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
