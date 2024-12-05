"use client";

import React, { FC } from "react";
import MovieList from "./MovieList";
import { MovieAPIResponse } from "@/types/movie";
import { searchMovies } from "@/lib/tmdb";

interface SearchMovieProps {
  initialMovies: MovieAPIResponse;
  query: string;
}

const SearchMovies: FC<SearchMovieProps> = ({ initialMovies, query }) => {
  return (
    <MovieList
      initialMovies={initialMovies}
      queryKey={["movies", "search", query]}
      fetchMovies={(page) => searchMovies(query, page)}
    />
  );
};

export default SearchMovies;
