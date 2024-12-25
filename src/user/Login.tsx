import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/apiService"; 

interface LoginPageProps {
  onLogin: (token: string) => void; 
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const token = await loginUser(username, password); // Fungsi login
      onLogin(token); // Panggil onLogin untuk memperbarui status login
      navigate("/"); // Arahkan ke halaman utama
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="login">
      <div className="login-image">
       { /*<img src="/images/Logo.png" alt="logo" className="logo" /> */ }
      </div>

      <div className="login-card">
        <div className="card-body">
          <h2 className="login-card-description">Login</h2>
          <form onSubmit={handleLogin}>
            {error && <p className="error-message">{error}</p>}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn login-btn">
              Log In
            </button>
          </form>
          <p className="login-card-footer-text">
            Don't have an account? <Link to="/register">Register Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;