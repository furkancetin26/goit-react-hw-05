import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits } from '../../services/api.js';
import styles from './MovieCast.module.css';

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getMovieCredits(movieId)
      .then(data => {
        setCast(data);  // data direkt cast dizisi
        setError(null);
      })
      .catch(() => setError('Failed to load cast'))
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) return <p>Loading cast...</p>;
  if (error) return <p>{error}</p>;
  if (cast.length === 0) return <p>No cast information available.</p>;

  return (
    <ul className={styles.castList}>
      {cast.map(member => (
        <li key={member.cast_id} className={styles.castItem}>
          <img
            src={
              member.profile_path
                ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                : 'https://via.placeholder.com/100x150?text=No+Image'
            }
            alt={member.name}
            className={styles.castImage}
          />
          <p className={styles.name}>{member.name}</p>
          <p className={styles.character}>as {member.character}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieCast;
