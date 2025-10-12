import { Outlet, NavLink, ScrollRestoration } from "react-router-dom";
import "./components/Header.css";

export default function App({ children }: { children?: React.ReactNode }) {
  return (
    <div className="app">
      <header className="header">
        <nav>
          <div className="nav-links">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/listado" className="nav-link">
              Listado
            </NavLink>
            <NavLink to="/favoritos" className="nav-link">
              💫 Favoritos
            </NavLink>
          </div>
        </nav>
      </header>

      <main className="main-content">{children ?? <Outlet />}</main>
      <ScrollRestoration />
      <footer className="footer">
        <p>&copy; 2025 Mi Pokédx - Explora el mundo Pokémon</p>
      </footer>
    </div>
  );
}
