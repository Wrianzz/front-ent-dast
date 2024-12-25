import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Tools from './components/Tools';
import Lists from './components/ScanLists';
import ScanDetails from './components/ScanDetails';
import LoginPage from './user/Login'; 
import RegisterPage from './user/Register';
import './css/App.css';

const App: React.FC = () => {
  // State untuk melacak apakah user sudah login
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('authToken'));

  // Fungsi untuk menangani login
  const handleLogin = (token: string) => {
    sessionStorage.setItem('authToken', token); // Simpan token di sessionStorage
    setIsLoggedIn(true); // Update state login
  };

  // Fungsi untuk menangani logout
  const handleLogout = () => {
    sessionStorage.removeItem('authToken'); // Hapus token dari sessionStorage
    setIsLoggedIn(false); // Update state login
  };

  return (
    <Router>
      {/* Kirim state dan fungsi logout ke Navbar */}
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        {/* Rute untuk halaman Beranda */}
        <Route path="/" element={<Home />} />
        {/* Rute untuk halaman Tools */}
        <Route path="/tools" element={<Tools />} />
        {/* Rute untuk halaman Scan Lists */}
        <Route path="/list" element={<Lists />} />
        <Route path="/scan/:id" element={<ScanDetails />} />
        {/* Kirim fungsi handleLogin ke LoginPage */}
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
};

export default App;
