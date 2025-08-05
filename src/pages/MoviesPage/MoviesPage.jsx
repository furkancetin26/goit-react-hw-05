import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList.jsx';
import { searchMovies } from '../../services/api.js';
import styles from './MoviesPage.module.css';

function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [input, setInput] = useState(query);

    useEffect(() => {
        if (!query) {
        setMovies([]);
        return;
        }
        setLoading(true);
        searchMovies(query)
        .then(data => {
            setMovies(data);
            setError(null);
        })
        .catch(() => setError('Failed to fetch movies'))
        .finally(() => setLoading(false));
    }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed) {
      setSearchParams({ query: trimmed });
    }
  };

  return (
    <main className={styles.main}>
      <h1>Search Movies</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter movie name"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
      {!loading && !error && movies.length === 0 && query && <p>No results found.</p>}
    </main>
  );
}

export default MoviesPage;
