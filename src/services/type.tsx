// api/types.ts

export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface PokemonTypeResponse {
  damage_relations: unknown; // si necesitás, podés tiparlo mejor
  pokemon: {
    pokemon: NamedAPIResource;
    slot: number;
  }[];
}

export interface PokemonByType {
  name: string;
  url: string;
  sprite?: string; // ← Agregar sprite opcional
  id: number; // ← Cambiar de opcional a requerido
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
}
