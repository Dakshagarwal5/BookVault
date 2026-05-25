import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon" aria-hidden="true">📚</span>
          <span className="brand-text">
            Book<span className="brand-accent">Vault</span>
          </span>
        </Link>
        <nav className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Library
          </NavLink>
          <NavLink
            to="/add"
            className={({ isActive }) =>
              isActive ? 'nav-link nav-cta active' : 'nav-link nav-cta'
            }
          >
            + Add Book
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
