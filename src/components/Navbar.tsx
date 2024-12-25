import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC<{ isLoggedIn: boolean; onLogout: () => void }> = ({ isLoggedIn, onLogout }) => {
  const location = useLocation();
  
  return (
    <header className="navbar-container">
      <div className="logo">
        <img src="/images/logo-mini.png" alt="Cyber Ranger" />
      </div>
      <nav className="nav-list">
        <ul>
        {location.pathname === "/login" || location.pathname === "/register" ? (
            <li>
              <Link to="/">Beranda</Link> {/* Ganti menjadi Beranda */}
            </li>
          ) : (
          !isLoggedIn ? (
            <li>
              <Link to="/register">Register Here</Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/">Beranda</Link>
              </li>
              <li>
                <Link to="/tools">Tools</Link>
              </li>
              <li>
                <Link to="/list">Scan Lists</Link>
              </li>
              <li>
                <Link to="/" onClick={onLogout}>Logout</Link>
              </li>
            </>
          )
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
