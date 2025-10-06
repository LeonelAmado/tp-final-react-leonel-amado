// api/types.ts

export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface PokemonTypeResponse {
  damage_relations: any; // si necesitás, podés tiparlo mejor
  pokemon: {
    pokemon: NamedAPIResource;
    slot: number;
  }[];
}

export interface PokemonByType {
  name: string;
  url: string;
}
