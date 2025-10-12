import type { PokemonByType, PokemonTypeResponse } from "./type";

const BASE_URL = "https://pokeapi.co/api/v2";

// Función para obtener detalles de un Pokémon individual
async function fetchPokemonDetails(url: string): Promise<{
  sprite: string;
  id: number;
  sprites: {
    front_default: string;
    other?: {
      "official-artwork"?: {
        front_default: string;
      };
    };
  };
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
}> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching Pokemon details from ${url}`);
  }
  const data = await response.json();
  return {
    sprite:
      data.sprites.other["official-artwork"]?.front_default ||
      data.sprites.front_default,
    id: data.id,
    sprites: data.sprites,
    types: data.types,
  };
}

export async function fetchPokemonByType(
  type: string,
  limit: number = 20
): Promise<PokemonByType[]> {
  // 1. Obtener lista de Pokémon del tipo
  const resp = await fetch(`${BASE_URL}/type/${type}`);
  if (!resp.ok) {
    throw new Error("Error fetching Pokémon by type");
  }

  const data = (await resp.json()) as PokemonTypeResponse;
  const sliced = data.pokemon.slice(0, limit);

  // 2. Obtener detalles (sprite) de cada Pokémon
  const pokemonWithDetails = await Promise.all(
    sliced.map(async (item) => {
      try {
        const details = await fetchPokemonDetails(item.pokemon.url);
        return {
          name: item.pokemon.name,
          url: item.pokemon.url,
          sprite: details.sprite,
          id: details.id,
          sprites: details.sprites,
          types: details.types,
        };
      } catch (error) {
        console.error(
          `Error fetching details for ${item.pokemon.name}:`,
          error
        );
        // Retornar con valores por defecto si falla
        return {
          name: item.pokemon.name,
          url: item.pokemon.url,
          sprite: undefined,
          id: 0,
          sprites: { front_default: "" },
          types: [],
        };
      }
    })
  );

  return pokemonWithDetails;
}
