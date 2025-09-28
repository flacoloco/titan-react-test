import type { Meta, StoryObj } from '@storybook/react-vite';
import { MovieList } from './MovieList';
import type { Movie } from '@src/types';
import moviesData from '@src/mockData/movies.json';

// Interface for the JSON movie structure
interface JsonMovie {
  id: number;
  synopsis: string;
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
  synopsis: jsonMovie.synopsis,
  title: jsonMovie.title,
  images: {
    artwork_portrait: jsonMovie.images?.artwork_portrait || ''
  }
});

// Get movies from JSON file and transform them
const mockMovies: Movie[] = (moviesData as MoviesCollection).collection
  .slice(0, 10) // Take first 10 movies for better performance
  .filter((movie: JsonMovie) => movie.images?.artwork_portrait) // Filter out movies without portrait images
  .map(transformMovieData);

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
    onSelectMovie: {
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
      onSelectMovie={() => { }}
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
    onSelectMovie: (): void => { }
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
    onSelectMovie: (): void => { }
  },
  parameters: {
    docs: {
      description: {
        story: 'MovieList component displaying only one movie.'
      }
    }
  }
};
