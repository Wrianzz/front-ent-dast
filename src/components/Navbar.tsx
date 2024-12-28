import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; 

const Navbar: React.FC<{ isLoggedIn: boolean; onLogout: () => void }> = ({
  isLoggedIn,
  onLogout,
}) => {
  const location = useLocation();
  const navigate = useNavigate(); 

  // Fungsi logout dengan SweetAlert
  const handleLogout = async (event: React.MouseEvent) => {
    event.preventDefault(); 

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    });

    if (result.isConfirmed) {
      onLogout(); 
        navigate("/"); 
    }
  };

  return (
    <header className="navbar-container">
      <div className="logo">
        <img src="/images/logo-mini.png" alt="Cyber Ranger" />
      </div>
      <nav className="nav-list">
        <ul>
          {location.pathname === "/login" || location.pathname === "/register" ? (
            <li>
              <Link to="/">Beranda</Link>
            </li>
          ) : !isLoggedIn ? (
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
                <Link to="/" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
