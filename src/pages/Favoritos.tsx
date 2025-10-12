import { useFavorites } from "../hooks/useFavorites";
import { Link } from "react-router-dom";
import "./Favoritos.css";

export default function Favoritos() {
  const { favorites, clearFavorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="favorites-page">
        <div className="favorites-empty">
          <div className="empty-content">
            <h1>💫 Favoritos</h1>
            <div className="empty-illustration">
              <span className="empty-icon">💔</span>
            </div>
            <h2>No tienes Pokémon favoritos</h2>
            <p>
              Explora la Pokédex y agrega tus Pokémon favoritos para verlos
              aquí.
            </p>
            <Link to="/listado" className="cta-button">
              <span>🔍</span>
              Explorar Pokédex
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h1>💫 Mis Favoritos</h1>
        <p>
          Has guardado {favorites.length} Pokémon
          {favorites.length !== 1 ? "s" : ""} como favoritos
        </p>
        <button
          onClick={clearFavorites}
          className="clear-favorites-btn"
          title="Limpiar todos los favoritos"
        >
          🗑️ Limpiar favoritos
        </button>
      </div>

      <div className="favorites-grid">
        {favorites.map((pokemon) => (
          <Link
            key={pokemon.id}
            to={`/detalle/${pokemon.id}`}
            className="pokemon-card"
          >
            <div className="pokemon-image-container">
              <img
                src={
                  pokemon.sprites.front_default || "/placeholder-pokemon.png"
                }
                alt={pokemon.name}
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder-pokemon.png";
                }}
              />
            </div>
            <div className="pokemon-info">
              <h3 className="pokemon-name">
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </h3>
              <p className="pokemon-id">
                #{pokemon.id?.toString().padStart(3, "0") || "000"}
              </p>
              <div className="pokemon-types">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className={`type-badge type-${type.type.name}`}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="favorite-indicator">⭐</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
