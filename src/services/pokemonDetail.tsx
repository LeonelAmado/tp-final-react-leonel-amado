// En pokemonDetail.tsx
import type {
  PokemonDetail,
  PokemonByPoke,
  PokemonTypeResponse,
} from "./detail";

const BASE_URL = "https://pokeapi.co/api/v2";

// Función para extraer ID de la URL de PokeAPI
function extractPokemonId(url: string): number {
  const parts = url.split("/");
  const id = parts[parts.length - 2]; // Penúltimo elemento
  return parseInt(id, 10);
}

// Service para obtener lista de Pokémon con IDs
export async function fetchPokemonByType(
  type: string,
  limit: number = 20
): Promise<PokemonByPoke[]> {
  const resp = await fetch(`${BASE_URL}/type/${type}`);
  if (!resp.ok) {
    throw new Error("Error fetching Pokémon by type");
  }

  const data: PokemonTypeResponse = await resp.json(); // ← Tipado correcto
  const sliced = data.pokemon.slice(0, limit);

  return sliced.map((item) => ({
    // ← Sin 'any'
    name: item.pokemon.name,
    id: extractPokemonId(item.pokemon.url),
    url: item.pokemon.url,
  }));
}

// Service para obtener detalle de un Pokémon específico por ID
export async function fetchPokemonDetail(id: number): Promise<PokemonDetail> {
  const resp = await fetch(`${BASE_URL}/pokemon/${id}`);
  if (!resp.ok) {
    throw new Error(`Error fetching Pokémon with ID ${id}`);
  }

  return (await resp.json()) as PokemonDetail;
}
