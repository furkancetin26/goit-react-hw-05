import React, { useEffect, useState, useRef } from 'react';
import {
  useParams,
  Link,
  Outlet,
  NavLink,
  useLocation,
} from 'react-router-dom';
import { getMovieDetails } from '../../services/api.js';
import styles from './MovieDetailsPage.module.css';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/movies');

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getMovieDetails(movieId)
      .then(data => {
        setMovie(data);
        setError(null);
      })
      .catch(() => setError('Failed to load movie details'))
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) return <p>Loading movie details...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return null;

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '';

  return (
    <main className={styles.main}>
      <Link to={backLinkRef.current} className={styles.goBack}>
        &larr; Go back
      </Link>

      <div className={styles.details}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={movie.title}
            className={styles.poster}
          />
        )}
        <div className={styles.info}>
          <h2>{movie.title}</h2>
          <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{movie.genres.map(g => g.name).join(', ')}</p>
        </div>
      </div>

      <nav className={styles.subNav}>
        <NavLink
          to="cast"
          className={({ isActive }) =>
            isActive ? styles.active : undefined
          }
        >
          Cast
        </NavLink>
        <NavLink
          to="reviews"
          className={({ isActive }) =>
            isActive ? styles.active : undefined
          }
        >
          Reviews
        </NavLink>
      </nav>

      <Outlet />
    </main>
  );
}

export default MovieDetailsPage;
