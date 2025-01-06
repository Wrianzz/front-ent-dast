import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/apiService";
import Swal from "sweetalert2";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // Fungsi untuk validasi password
  const isPasswordValid = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi field kosong
    if (!username || !password || !confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please provide all required fields.",
      });
      return;
    }

    // Validasi format password
    if (!isPasswordValid(password)) {
      Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 number, and 1 special symbol.",
      });
      return;
    }

    // Validasi password tidak cocok
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match!",
      });
      return;
    }

    try {
      await registerUser(username, password); 
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "Redirecting to login page...",
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => navigate("/login"), 1000); // Redirect ke halaman login
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message || "An error occurred during registration.",
      });
    }
  };

  return (
    <div className="login">
      <div className="login-image">
        {/* <img src="/images/Logo.png" alt="logo" className="logo" /> */}
      </div>

      <div className="login-card">
        <div className="card-body">
          <h2 className="login-card-description">Register</h2>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn login-btn">
              Register
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
