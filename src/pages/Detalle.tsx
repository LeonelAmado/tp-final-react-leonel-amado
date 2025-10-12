import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPokemonDetail } from "../services/pokemonDetail";
import type { PokemonDetail } from "../services/detail";

export default function Detalle() {
  const { id } = useParams<{ id: string }>(); // Obtener ID de la URL
  const [pokemon, setPokemon] = React.useState<PokemonDetail | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchPokemonDetail(parseInt(id, 10))
        .then((data) => {
          setPokemon(data);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <p>Cargando detalle...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!pokemon) return <p>No se encontró el Pokémon</p>;

  return (
    <div>
      <h1>
        {pokemon.name} (#{pokemon.id})
      </h1>
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
      />
      <p>Altura: {pokemon.height / 10} m</p>
      <p>Peso: {pokemon.weight / 10} kg</p>
      <div>
        <h3>Tipos:</h3>
        {pokemon.types.map((type) => (
          <span key={type.slot}>{type.type.name}</span>
        ))}
      </div>
    </div>
  );
}
