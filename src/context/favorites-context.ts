import { createContext } from 'react';
import type { PokemonByType } from '../services/type';

export interface FavoritesContextType {
  favorites: PokemonByType[];
  addToFavorites: (pokemon: PokemonByType) => void;
  removeFromFavorites: (pokemonId: number) => void;
  isFavorite: (pokemonId: number) => boolean;
  clearFavorites: () => void;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);