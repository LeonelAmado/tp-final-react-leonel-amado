import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { PokemonByType } from "../services/type";
import {
  FavoritesContext,
  type FavoritesContextType,
} from "./favorites-context";

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<PokemonByType[]>([]);

  // Cargar favoritos del localStorage al inicializar
  useEffect(() => {
    const storedFavorites = localStorage.getItem("pokemonFavorites");
    if (storedFavorites) {
      try {
        const parsedFavorites = JSON.parse(storedFavorites);
        setFavorites(parsedFavorites);
      } catch (error) {
        console.error("Error al cargar favoritos del localStorage:", error);
      }
    }
  }, []);

  // Guardar favoritos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("pokemonFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (pokemon: PokemonByType) => {
    setFavorites((prev) => {
      // Verificar si ya existe para evitar duplicados
      if (prev.some((fav) => fav.id === pokemon.id)) {
        return prev;
      }
      return [...prev, pokemon];
    });
  };

  const removeFromFavorites = (pokemonId: number) => {
    setFavorites((prev) => prev.filter((pokemon) => pokemon.id !== pokemonId));
  };

  const isFavorite = (pokemonId: number) => {
    return favorites.some((pokemon) => pokemon.id === pokemonId);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const value: FavoritesContextType = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    clearFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
