import { create } from "zustand";

interface FavoriteState {
  favorites: number;
  increasePopulation: () => void;
}

export const favoritePhotos = create<FavoriteState>()((set) => ({
  favorites: 0,
  increasePopulation: () =>
    set((state) => ({ favorites: state.favorites + 1 })),
}));
