import React, { useEffect } from "react";
import { Link } from "react-router-dom";
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
        console.log("Pokémon con sprites:", list);
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
      {loading && <p>Cargando Pokémon y sprites...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <div>
          {pokemonFire.map((pokemon) => (
            <div key={pokemon.name}>
              {/* Sprite del Pokémon */}
              {pokemon.sprite ? (
                <img src={pokemon.sprite} alt={pokemon.name} />
              ) : (
                <div>Sin imagen</div>
              )}

              {/* Nombre del Pokémon */}
              <h3>{pokemon.name}</h3>

              {/* ID del Pokémon */}
              {pokemon.id && <p>#{pokemon.id.toString().padStart(3, "0")}</p>}

              {/* Botón para ver detalle */}
              {pokemon.id && (
                <Link to={`/detalle/${pokemon.id}`}>Ver Detalle</Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
