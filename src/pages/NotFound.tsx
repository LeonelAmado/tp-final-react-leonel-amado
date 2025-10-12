import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="not-found-page">
      <div className="pokeball-decoration"></div>

      <div className="not-found-container">
        <span className="not-found-icon">😵</span>
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">¡Pokémon no encontrado!</h2>
        <p className="not-found-description">
          Parece que este Pokémon se ha escapado o la página que buscas no
          existe. ¡No te preocupes, tenemos muchos más esperándote!
        </p>

        <div className="not-found-actions">
          <Link to="/" className="not-found-button primary">
            <span>🏠</span>
            Volver al inicio
          </Link>
          <Link to="/listado" className="not-found-button secondary">
            <span>🔍</span>
            Buscar Pokémon
          </Link>
        </div>

        <div className="not-found-suggestions">
          <h3 className="suggestions-title">¿Qué puedes hacer?</h3>
          <ul className="suggestions-list">
            <li className="suggestion-item">
              Explora nuestro catálogo completo de Pokémon
            </li>
            <li className="suggestion-item">Busca por tipos elementales</li>
            <li className="suggestion-item">Crea tu lista de favoritos</li>
            <li className="suggestion-item">
              Descubre estadísticas detalladas
            </li>
          </ul>
        </div>

        <div className="error-details">
          <h4 className="error-details-title">Detalles técnicos</h4>
          <p className="error-details-text">
            Error 404: La ruta solicitada no pudo ser encontrada en el servidor.
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
