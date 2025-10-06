import React, { useEffect } from "react";
import { fetchPokemonByType } from "../services/pokemonType";
import type { PokemonByType } from "../services/type";

export default function Listado() {
  const [pokemonFire, setPokemonFire] = React.useState<PokemonByType[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    fetchPokemonByType("fire", 20)
      .then((list) => {
        setPokemonFire(list);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Listado de Pokémon de tipo Fuego</h1>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {pokemonFire.map((pokemon) => (
            <li key={pokemon.name}>{pokemon.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
