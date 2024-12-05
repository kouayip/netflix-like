"use client";

import React, { FC } from "react";
import MovieList from "./MovieList";
import { MovieAPIResponse } from "@/types/movie";
import { getMovies } from "@/lib/tmdb";

interface PopularMovieProps {
  initialMovies: MovieAPIResponse;
}

const PopularMovies: FC<PopularMovieProps> = ({ initialMovies }) => {
  return (
    <MovieList
      initialMovies={initialMovies}
      queryKey={["movies", "popular"]}
      fetchMovies={(page) => getMovies("popular", page)}
    />
  );
};

export default PopularMovies;
