import { Outlet, NavLink, ScrollRestoration } from "react-router-dom";

export default function App({ children }: { children?: React.ReactNode }) {
  return (
    <div className="app">
      <header className="header">
        <nav>
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/listado" className="nav-link">
            Listado
          </NavLink>
          <NavLink to="/detalle/1" className="nav-link">
            Detalle
          </NavLink>
          <NavLink to="/error" className="nav-link">
            Not Found
          </NavLink>
        </nav>
      </header>

      <main className="main-content">{children ?? <Outlet />}</main>
      <ScrollRestoration />
      <footer className="footer">
        <p>&copy; 2025 Mi Pokédex</p>
      </footer>
    </div>
  );
}
