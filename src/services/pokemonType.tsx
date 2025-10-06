import type { PokemonByType, PokemonTypeResponse } from "./type";

const BASE_URL = "https://pokeapi.co/api/v2";

export async function fetchPokemonByType(
  type: string,
  limit: number = 20
): Promise<PokemonByType[]> {
  const resp = await fetch(`${BASE_URL}/type/${type}`);
  if (!resp.ok) {
    throw new Error("Error fetching Pokémon by type");
  }

  const data = (await resp.json()) as PokemonTypeResponse;
  const sliced = data.pokemon.slice(0, limit);
  return sliced.map((item) => item.pokemon);
}
