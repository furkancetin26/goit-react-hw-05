import React, { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList.jsx';
import { getTrendingMovies } from '/src/services/api.js';
import styles from './HomePage.module.css';

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        const data = await getTrendingMovies();
        setMovies(data);
      } catch (err) {
        setError('Trend filmler alınamadı.');
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  return (
    <main className={styles.main}>
      <h1>Trending Movies</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </main>
  );
}

export default HomePage;
