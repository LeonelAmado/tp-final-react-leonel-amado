export interface PokeApiResource {
  name: string;
  url: string;
}

export interface PokemonByPoke {
  name: string;
  id: number;
  url: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
    front_default: string;
  };
  types: Array<{
    slot: number;
    type: {
      name: string;
    };
  }>;
  height: number;
  weight: number;
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }>;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
}

// En detail.tsx - agregar estas interfaces
export interface PokemonTypeItem {
  pokemon: {
    name: string;
    url: string;
  };
  slot: number;
}

export interface PokemonTypeResponse {
  pokemon: PokemonTypeItem[];
}
