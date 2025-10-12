import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { fetchPokemonByType } from "../services/pokemonType";
import type { PokemonByType } from "../services/type";
import "./Listado.css";

export default function Listado() {
  const [pokemonList, setPokemonList] = useState<PokemonByType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<string>("fire");
  const [currentLimit, setCurrentLimit] = useState<number>(20);
  const [hasMorePokemon, setHasMorePokemon] = useState<boolean>(true);

  // Lista de tipos de Pokémon
  const pokemonTypes = [
    { name: "fire", label: "Fuego", color: "#f87171" },
    { name: "water", label: "Agua", color: "#60a5fa" },
    { name: "grass", label: "Planta", color: "#34d399" },
    { name: "electric", label: "Eléctrico", color: "#fbbf24" },
    { name: "psychic", label: "Psíquico", color: "#c084fc" },
    { name: "ice", label: "Hielo", color: "#67e8f9" },
    { name: "dragon", label: "Dragón", color: "#a78bfa" },
    { name: "dark", label: "Siniestro", color: "#6b7280" },
    { name: "fairy", label: "Hada", color: "#f9a8d4" },
    { name: "fighting", label: "Lucha", color: "#fb7185" },
    { name: "poison", label: "Veneno", color: "#c084fc" },
    { name: "ground", label: "Tierra", color: "#fbbf24" },
    { name: "flying", label: "Volador", color: "#93c5fd" },
    { name: "bug", label: "Bicho", color: "#84cc16" },
    { name: "rock", label: "Roca", color: "#a8a29e" },
    { name: "ghost", label: "Fantasma", color: "#a78bfa" },
    { name: "steel", label: "Acero", color: "#94a3b8" },
    { name: "normal", label: "Normal", color: "#d1d5db" },
  ];

  // Función para cargar Pokémon por tipo (estabilizada con useCallback)
  const loadPokemonByType = useCallback(
    async (type: string, isLoadMore: boolean = false) => {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        setCurrentLimit(20);
      }
      setError(null);

      try {
        const limit = isLoadMore ? currentLimit + 20 : 20;
        const list = await fetchPokemonByType(type, limit);

        setPokemonList(list);
        setCurrentLimit(limit);
        setHasMorePokemon(list.length === limit);

        console.log(
          `Pokémon de tipo ${type} (${limit} solicitados, ${list.length} recibidos):`,
          list
        );
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        if (isLoadMore) {
          setLoadingMore(false);
        } else {
          setLoading(false);
        }
      }
    },
    [currentLimit]
  );

  useEffect(() => {
    loadPokemonByType(selectedType);
  }, [selectedType, loadPokemonByType]);

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setHasMorePokemon(true);
  };

  const handleLoadMore = () => {
    loadPokemonByType(selectedType, true);
  };

  return (
    <div className="listado-page">
      <div className="listado-container">
        {/* Header */}
        <div className="listado-header">
          <h1 className="listado-title">Pokédx por Tipos</h1>
          <p className="listado-subtitle">
            Explora Pokémon organizados por sus tipos elementales
          </p>
        </div>

        {/* Selector de tipos */}
        <div className="type-selector">
          <h2 className="type-selector-title">Selecciona un tipo:</h2>

          <div className="type-grid">
            {pokemonTypes.map((type) => (
              <button
                key={type.name}
                onClick={() => handleTypeChange(type.name)}
                disabled={loading || loadingMore}
                className="type-button"
                style={{
                  background: selectedType === type.name 
                    ? `linear-gradient(135deg, ${type.color}, ${type.color}dd)`
                    : "rgba(255, 255, 255, 0.1)",
                  color: selectedType === type.name ? "white" : "#374151",
                  borderColor: selectedType === type.name ? type.color : "#d1d5db",
                }}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tipo seleccionado actual */}
        <div className="current-type">
          <h2 className="current-type-title">
            Pokémon de tipo{" "}
            <span
              style={{
                color: pokemonTypes.find((t) => t.name === selectedType)?.color || "#fbbf24"
              }}
            >
              {pokemonTypes.find((t) => t.name === selectedType)?.label}
            </span>
          </h2>
          {!loading && !error && (
            <p className="current-type-count">
              {pokemonList.length} Pokémon mostrados
              {hasMorePokemon && " (hay más disponibles)"}
            </p>
          )}
        </div>

        {/* Estados de carga y error */}
        {loading && (
          <div className="loading-container">
            <p className="loading-text">
              Cargando Pokémon de tipo{" "}
              {pokemonTypes.find((t) => t.name === selectedType)?.label}...
            </p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <p className="error-text">Error: {error}</p>
            <button 
              className="retry-button"
              onClick={() => loadPokemonByType(selectedType)}
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Lista de Pokémon */}
        {!loading && !error && pokemonList.length > 0 && (
          <>
            <div className="pokemon-grid">
              {pokemonList.map((pokemon) => (
                <div 
                  key={pokemon.name} 
                  className="pokemon-card"
                  style={{
                    "--type-color": pokemonTypes.find((t) => t.name === selectedType)?.color || "#fbbf24"
                  } as React.CSSProperties}
                >
                  {/* Sprite del Pokémon */}
                  {pokemon.sprite ? (
                    <img 
                      src={pokemon.sprite} 
                      alt={pokemon.name}
                      className="pokemon-sprite"
                    />
                  ) : (
                    <div className="pokemon-placeholder">
                      Sin imagen
                    </div>
                  )}

                  {/* Nombre del Pokémon */}
                  <h3 className="pokemon-name">{pokemon.name}</h3>

                  {/* ID del Pokémon */}
                  {pokemon.id && (
                    <p className="pokemon-id">
                      #{pokemon.id.toString().padStart(3, "0")}
                    </p>
                  )}

                  {/* Botón para ver detalle */}
                  {pokemon.id && (
                    <Link
                      to={`/detalle/${pokemon.id}`}
                      className="pokemon-detail-button"
                      style={{
                        background: `linear-gradient(135deg, ${
                          pokemonTypes.find((t) => t.name === selectedType)?.color || "#3b82f6"
                        }, ${
                          pokemonTypes.find((t) => t.name === selectedType)?.color || "#1d4ed8"
                        }dd)`
                      }}
                    >
                      Ver Detalle
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Botón Cargar Más */}
            {hasMorePokemon && (
              <div className="load-more-container">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="load-more-button"
                  style={{
                    background: loadingMore 
                      ? "#9ca3af" 
                      : `linear-gradient(135deg, ${
                          pokemonTypes.find((t) => t.name === selectedType)?.color || "#3b82f6"
                        }, ${
                          pokemonTypes.find((t) => t.name === selectedType)?.color || "#1d4ed8"
                        }dd)`
                  }}
                >
                  {loadingMore ? (
                    <>
                      <span>⏳</span>
                      Cargando más...
                    </>
                  ) : (
                    <>
                      <span>➕</span>
                      Cargar más Pokemones
                    </>
                  )}
                </button>
                
                {loadingMore && (
                  <p className="load-more-text">
                    Cargando más Pokémon de tipo {pokemonTypes.find((t) => t.name === selectedType)?.label}...
                  </p>
                )}
              </div>
            )}
          </>
        )}

        {/* Mensaje si no hay Pokémon */}
        {!loading && !error && pokemonList.length === 0 && (
          <div className="empty-container">
            <p className="empty-text">
              No se encontraron Pokémon de tipo{" "}
              {pokemonTypes.find((t) => t.name === selectedType)?.label}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}