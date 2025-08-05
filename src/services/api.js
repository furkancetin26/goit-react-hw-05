import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OWQwMjFhMjc3YTFhZjQ0ZTJiM2QyYWM3ZjgzZGMxZCIsIm5iZiI6MTc0NzA3OTI1Ni44NzIsInN1YiI6IjY4MjI1MDU4YTliY2UwZTU4NjczOTNhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VRALi1p8CxwYN9z-oBfnPFLOl9l--aIP6_LRBeR_ses';

const options = {
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,  // "Bearer " ifadesi mutlaka olmalı
  },
};

axios.get('https://api.themoviedb.org/3/trending/movie/day', options)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));

export const getTrendingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/trending/movie/day`, options);
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await axios.get(
    `${BASE_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  );
  return response.data.results;
};

export const getMovieDetails = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}`, options);
  return response.data;
};

export const getMovieCredits = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, options);
  return response.data.cast;
};

export const getMovieReviews = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, options);
  return response.data;
};

export const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
