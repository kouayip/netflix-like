import React, { Suspense } from "react";
import { getMovies, searchMovies } from "@/lib/tmdb";
import { MovieAPIResponse } from "@/types/movie";
import SearchBar from "@/components/SearchBar";
import PopularMovies from "@/components/PopularMovies";
import SearchMovies from "@/components/SearchMovies";
import Container from "@/components/Container";

const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
    page?: string | number;
    category?: string;
  }>;
}) => {
  const { query, category = "popular", page: pageStr } = await searchParams;
  const page = Number(pageStr) || 1;
  let movies: MovieAPIResponse | undefined = undefined;

  if (query) movies = await searchMovies(query, page);
  else movies = await getMovies(category, page);

  return (
    <Container>
      <div className="flex flex-col w-full space-y-8">
        <Suspense>
          <SearchBar />
        </Suspense>
        {query ? (
          <SearchMovies initialMovies={movies} query={query} />
        ) : (
          <PopularMovies initialMovies={movies} />
        )}
      </div>
    </Container>
  );
};

export default HomePage;
