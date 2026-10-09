import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="brand-symbol">L.</span>
        <span>
          <strong>LÚMEN</strong>
          <small>ODONTOLOGIA</small>
        </span>
      </Link>

      <nav className="navbar-links">
        <a href="#inicio">Início</a>
        <a href="#servicos">Tratamentos</a>
        <a href="#equipe">Nossa equipe</a>
      </nav>

      <Link to="/login" className="navbar-button">
        Agendar consulta <span>↗</span>
      </Link>
    </header>
  );
}