"use client";

import Container from "@/components/Container";
import MovieList from "@/components/MovieList";
import { useFavorites } from "@/store/useFavorites";
import { Movie } from "@/types/movie";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const ITEMS_PER_PAGE = 20; // Nombre de films par page

const EMPTY_MOVIE = {
  page: 1,
  type: "movie",
  limit: ITEMS_PER_PAGE,
  total_pages: ITEMS_PER_PAGE,
  total_results: 0,
  results: [],
};

const Favorites = () => {
  const { favorites, isHydrated } = useFavorites();
  const queryClient = useQueryClient();

  const getFavorites = (currentPage = 1) => {
    const paginatedFavorites = favorites.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

    return {
      page: currentPage,
      type: "movie",
      limit: ITEMS_PER_PAGE,
      total_pages: ITEMS_PER_PAGE,
      total_results: paginatedFavorites.length,
      results: paginatedFavorites as Movie[],
    };
  };

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["movies", "favorites"] });
  }, [favorites, queryClient]);

  if (!isHydrated) {
    // Pendant l'hydratation de Zustand, affiche un loader ou un fallback
    return (
      <Container>
        <p className="text-center text-white">Chargement des favoris...</p>;
      </Container>
    );
  }

  if (favorites.length === 0) {
    return (
      <Container>
        <p className="text-center text-white">
          {"Aucun favori pour l'instant"}.
        </p>
      </Container>
    );
  }

  return (
    <Container>
      <div className="w-full">
        <h1 className="text-2xl font-bold mb-6 text-white">Mes Favoris</h1>
        {favorites.length ? (
          <MovieList
            initialMovies={EMPTY_MOVIE}
            maxPages={1}
            queryKey={["movies", "favorites"]}
            fetchMovies={(page) => Promise.resolve(getFavorites(page))}
            enabledFetch={favorites.length > 0}
          />
        ) : (
          <p className="mt-4">{"Vous n'avez pas encore de favoris."}</p>
        )}
      </div>
    </Container>
  );
};

export default Favorites;
