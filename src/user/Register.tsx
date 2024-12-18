import React from "react";
import { Link } from 'react-router-dom';

const RegisterPage : React.FC = () => {
  return (
    <div className="login-wrapper">
      <div className="brand-wrapper">
        <img src="logo.png" alt="logo" className="logo" />
      </div>
      <div className="login-card">
        <div className="card-body">
          <h2 className="login-card-description">Welcome!</h2>
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
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                required
              />
            </div>
            <button type="submit" className="btn login-btn">
              Sign Up
            </button>
          </form>
          <p className="login-card-footer-text">
            Have an account? <Link to="/login">Login Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;