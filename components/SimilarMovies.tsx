'use client';

import React, { FC } from 'react';

import { fetchSimilarMovies } from '@/lib/tmdb';
import { MovieAPIResponse } from '@/types/movie';

import MovieList from './MovieList';

interface SimilarMovieProps {
  initialMovies: MovieAPIResponse;
  movieId: string;
}

const SimilarMovies: FC<SimilarMovieProps> = ({ movieId, initialMovies }) => (
  <MovieList
    maxPages={1}
    initialMovies={initialMovies}
    queryKey={['movies', 'similar', movieId]}
    fetchMovies={(page) => fetchSimilarMovies(movieId, page)}
  />
);

export default SimilarMovies;
