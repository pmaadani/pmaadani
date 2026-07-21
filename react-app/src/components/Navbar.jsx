import { NavLink } from 'react-router';

export default function Navbar() {
  return (
    <header className="site-header">
      <nav className="navbar">
        <NavLink className="brand" to="/">
          <span className="brand-mark">PM</span>

          <span className="brand-text">
            <strong>Parisa Maadani</strong>
            <small>Cloud & Software Engineer</small>
          </span>
        </NavLink>

        <div className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            About
          </NavLink>

          <NavLink
            to="/photos"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Photos
          </NavLink>

          <a className="nav-link" href="/#learning">
            Learning
          </a>
        </div>
      </nav>
    </header>
  );
}