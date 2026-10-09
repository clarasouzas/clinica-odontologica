import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="footer">
      <Link to="/" className="navbar-brand footer-brand">
        <span className="brand-symbol">L.</span>
        <span>
          <strong>LÚMEN</strong>
          <small>ODONTOLOGIA</small>
        </span>
      </Link>

      <p>
        Cuidado, confiança e bem-estar em cada sorriso.
      </p>

      <span className="footer-copy">
        © {new Date().getFullYear()} Lúmen Odontologia.
      </span>
    </footer>
  );
}
