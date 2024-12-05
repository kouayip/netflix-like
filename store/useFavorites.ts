import { create } from "zustand";
import { Movie } from "@/types/movie";

interface FavoritesState {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (id: number) => void;
}

const useFavorites = create<FavoritesState>((set) => ({
  favorites: [],
  addFavorite: (movie) =>
    set((state) => ({
      favorites: [...state.favorites, movie],
    })),
  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((movie) => movie.id !== id),
    })),
}));

export default useFavorites;
