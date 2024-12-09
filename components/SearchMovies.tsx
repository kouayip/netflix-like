'use client';

import React, { FC } from 'react';

import { searchMovies } from '@/lib/tmdb';
import { MovieAPIResponse } from '@/types/movie';

import MovieList from './MovieList';

interface SearchMovieProps {
  initialMovies: MovieAPIResponse;
  query: string;
}

const SearchMovies: FC<SearchMovieProps> = ({ initialMovies, query }) => (
  <MovieList
    initialMovies={initialMovies}
    queryKey={['movies', 'search', query]}
    fetchMovies={(page) => searchMovies(query, page)}
  />
);

export default SearchMovies;
