import { useMovieStore } from './store';

import './App.css';

export const App = () => {
  const { selectedMovie, setSelectedMovie } = useMovieStore();

  return (
    <>
      <p>
        React test for Titan OS
      </p>
    </>
  );
};
