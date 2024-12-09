'use client';
import React, { FC, useCallback, useRef } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { MovieAPIResponse } from '@/types/movie';

import MovieCard from './MovieCard';

interface MovieListProps {
  initialMovies: MovieAPIResponse;
  queryKey: string[];
  fetchMovies: (page: number) => Promise<MovieAPIResponse>;
  maxPages?: number;
  enabledFetch?: boolean;
}

const MovieList: FC<MovieListProps> = ({
  initialMovies,
  queryKey,
  fetchMovies,
  enabledFetch = false,
  maxPages = 3,
}) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const { data, fetchNextPage, isFetching, hasNextPage, isLoading, error, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam = 1 }) => fetchMovies(pageParam),
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
      initialPageParam: 1,
      initialData: {
        pages: [initialMovies],
        pageParams: [1],
      },
      enabled: enabledFetch,
    });

  const isMaxPages = useCallback(() => data && data.pages.length >= maxPages, [data, maxPages]);

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading || isFetching) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isMaxPages()) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading, isMaxPages],
  );

  if (isLoading) return <p>Chargement...</p>;
  if (error || !data) return <p>Erreur lors du chargement des films.</p>;

  const allMovies = data.pages.flatMap((page) => page.results);

  return (
    <div className="grid w-full lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 gap-4 justify-items-center mb-0">
      {allMovies.map((movie, index) => (
        <MovieCard
          {...movie}
          key={movie.id}
          ref={index === allMovies.length - 1 ? lastElementRef : null}
        />
      ))}
      {isMaxPages() && hasNextPage && !isFetching && (
        <button
          className="col-span-full text-white text-center mt-4"
          onClick={() => fetchNextPage()}
        >
          Voir plus
        </button>
      )}
      {(isFetching || isFetchingNextPage) && (
        <div className="text-center text-white col-span-full">Chargement...</div>
      )}
    </div>
  );
};

export default MovieList;
