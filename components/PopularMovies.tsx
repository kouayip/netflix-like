'use client';

import React, { FC } from 'react';

import { getMovies } from '@/lib/tmdb';
import { MovieAPIResponse } from '@/types/movie';

import MovieList from './MovieList';

interface PopularMovieProps {
  initialMovies: MovieAPIResponse;
}

const PopularMovies: FC<PopularMovieProps> = ({ initialMovies }) => (
  <MovieList
    initialMovies={initialMovies}
    queryKey={['movies', 'popular']}
    fetchMovies={(page) => getMovies('popular', page)}
  />
);

export default PopularMovies;
