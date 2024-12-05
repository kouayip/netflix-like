"use client";

import React, { FC } from "react";
import { fetchSimilarMovies } from "@/lib/tmdb";
import MovieList from "./MovieList";
import { MovieAPIResponse } from "@/types/movie";

interface SimilarMovieProps {
  initialMovies: MovieAPIResponse;
  movieId: string;
}

const SimilarMovies: FC<SimilarMovieProps> = ({ movieId, initialMovies }) => {
  return (
    <MovieList
      maxPages={1}
      initialMovies={initialMovies}
      queryKey={["movies", "similar", movieId]}
      fetchMovies={(page) => fetchSimilarMovies(movieId, page)}
    />
  );
};

export default SimilarMovies;
