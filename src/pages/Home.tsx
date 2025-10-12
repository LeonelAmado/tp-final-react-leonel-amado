import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      <div className="home-content">
        <h1 className="home-title">Mi Pokédx Web</h1>
        <p className="home-subtitle">
          Explora el fascinante mundo de los Pokémon
        </p>
        <p className="home-description">
          Descubre información detallada sobre tus Pokémon favoritos, navega por
          tipos, crea tu lista de favoritos y sumérgete en una experiencia
          interactiva única.
        </p>

        <div className="home-buttons">
          <Link to="/listado" className="home-button">
            <span>🔍</span>
            Explorar Pokémon
          </Link>
          <Link to="/favoritos" className="home-button secondary">
            <span>❤️</span>
            Mis Favoritos
          </Link>
        </div>
      </div>

      <div className="home-features">
        <div className="feature-card">
          <span className="feature-icon">🔥</span>
          <h3 className="feature-title">Por Tipos</h3>
          <p className="feature-description">
            Explora Pokémon organizados por sus tipos elementales
          </p>
        </div>

        <div className="feature-card">
          <span className="feature-icon">📊</span>
          <h3 className="feature-title">Estadísticas</h3>
          <p className="feature-description">
            Información detallada sobre stats, habilidades y más
          </p>
        </div>

        <div className="feature-card">
          <span className="feature-icon">⭐</span>
          <h3 className="feature-title">Favoritos</h3>
          <p className="feature-description">
            Guarda tus Pokémon favoritos en tu colección personal
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
