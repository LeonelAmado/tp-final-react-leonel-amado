import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPokemonDetail } from "../services/pokemonDetail";
import type { PokemonDetail } from "../services/detail";
import "./Detalle.css";

export default function Detalle() {
  const { id } = useParams<{ id: string }>();
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

  // Función para obtener imagen con fallback
  const getImage = (pokemon: PokemonDetail) => {
    return (
      pokemon.sprites.other["official-artwork"]?.front_default ||
      pokemon.sprites.front_default ||
      "https://via.placeholder.com/300x300?text=Sin+imagen"
    );
  };

  if (loading) {
    return (
      <div className="detalle-page">
        <div className="detalle-loading">
          <p className="detalle-loading-text">Cargando detalle...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detalle-page">
        <div className="detalle-error">
          <p className="detalle-error-text">Error: {error}</p>
          <Link to="/listado" className="detalle-back-link">
            ← Volver al listado
          </Link>
        </div>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="detalle-page">
        <div className="detalle-not-found">
          <p className="detalle-not-found-text">No se encontró el Pokémon</p>
          <Link to="/listado" className="detalle-back-link">
            ← Volver al listado
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="detalle-page">
      <div className="detalle-container">
        {/* Header del Pokémon */}
        <div className="pokemon-header">
          <h1 className="pokemon-title">{pokemon.name}</h1>
          <span className="pokemon-id-badge">
            #{pokemon.id.toString().padStart(3, "0")}
          </span>
        </div>

        {/* Imagen del Pokémon */}
        <div className="pokemon-image-container">
          <div className="pokemon-image-bg"></div>
          <img
            src={getImage(pokemon)}
            alt={pokemon.name}
            className="pokemon-image"
          />
        </div>

        {/* Información básica */}
        <div className="pokemon-basic-info">
          <div className="info-card">
            <h3 className="info-card-title">Altura</h3>
            <p className="info-card-value">{pokemon.height / 10} m</p>
          </div>

          <div className="info-card">
            <h3 className="info-card-title">Peso</h3>
            <p className="info-card-value">{pokemon.weight / 10} kg</p>
          </div>
        </div>

        {/* Tipos */}
        <div className="pokemon-types-section">
          <h2 className="section-title">Tipos</h2>
          <div className="pokemon-types">
            {pokemon.types.map((type) => (
              <span key={type.slot} className={`type-badge ${type.type.name}`}>
                {type.type.name}
              </span>
            ))}
          </div>
        </div>

        {/* Estadísticas (si existen) */}
        {pokemon.stats && (
          <div className="pokemon-stats-section">
            <h2 className="section-title">Estadísticas</h2>
            <div className="pokemon-stats">
              {pokemon.stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-header">
                    <h4 className="stat-name">{stat.stat.name}</h4>
                    <span className="stat-value">{stat.base_stat}</span>
                  </div>
                  <div className="stat-bar">
                    <div
                      className="stat-fill"
                      style={{
                        width: `${Math.min(
                          (stat.base_stat / 200) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Habilidades (si existen) */}
        {pokemon.abilities && (
          <div className="pokemon-abilities-section">
            <h2 className="section-title">Habilidades</h2>
            <div className="pokemon-abilities">
              {pokemon.abilities.map((ability, index) => (
                <span key={index} className="ability-badge">
                  {ability.ability.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Botón de navegación */}
        <div className="navigation-section">
          <Link to="/listado" className="back-button">
            <span>←</span>
            Volver al listado
          </Link>
        </div>
      </div>
    </div>
  );
}
