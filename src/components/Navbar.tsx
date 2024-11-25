import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <header className="navbar-container">
      <div className="logo">
        <img src="/logo192.png" alt="Cyber Ranger" />
      </div>
      <nav className="nav-list">
        <ul>
          <li>
            <Link to="/">Beranda</Link>
          </li>
          <li>
            <Link to="/tools">Tools</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
