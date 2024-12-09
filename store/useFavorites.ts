import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const STORE_FAVORITES_KEY = 'favorites';

type Favorite = {
  id: number;
  title: string;
  poster_path?: string;
};

interface FavoritesState {
  favorites: Favorite[];
  toggleFavorite: (favorite: Favorite) => void;
  isFavorite: (id: number) => boolean;
  setHasHydrated: (state: boolean) => void;
  isHydrated: boolean; // Indique si les données de `localStorage` sont chargées
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      isHydrated: false, // Ajout de l'état de chargement

      toggleFavorite: (favorite) => {
        const { favorites } = get();
        const exists = favorites.some((fav) => fav.id === favorite.id);

        if (exists) {
          set({
            favorites: favorites.filter((fav) => fav.id !== favorite.id),
          });
        } else {
          set({ favorites: [...favorites, favorite] });
        }
      },
      isFavorite: (id) => {
        const { favorites } = get();
        return favorites.some((fav) => fav.id === id);
      },
      setHasHydrated: (state: boolean) => {
        set({
          isHydrated: state,
        });
      },
    }),
    {
      name: STORE_FAVORITES_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        favorites: state.favorites,
      }),

      // Callback : Hydratation terminée
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
