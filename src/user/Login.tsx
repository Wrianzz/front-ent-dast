import React from "react";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
    return (
      <div className="login">
        <div className="login-image">
          <img src="/images/Logo.png" alt="logo" className="logo" />
        </div>
        
        <div className="login-card">
          <div className="card-body">
            <h2 className="login-card-description">Login</h2>
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