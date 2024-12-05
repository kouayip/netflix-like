"use client";

import Container from "@/components/Container";
import MovieList from "@/components/MovieList";
import useFavorites from "@/store/useFavorites";

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <Container>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Mes Favoris</h1>
        {favorites.length ? (
          // <MovieList movies={favorites} />
          <>FILM</>
        ) : (
          <p className="mt-4">{"Vous n'avez pas encore de favoris."}</p>
        )}
      </div>
    </Container>
  );
};

export default Favorites;
