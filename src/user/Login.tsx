import React from "react";
import { Link } from "react-router-dom";

const LoginPage : React.FC = () => {
  return (
    <div className="landing">
      <div className="brand-wrapper">
        <img src="logo.png" alt="logo" className="logo" />
      </div>
      <div className="login-card">
        <div className="card-body">
          <h2 className="login-card-description">Welcome Back!</h2>
          <form>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email address"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
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