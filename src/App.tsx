import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Tools from './components/Tools';
import Lists from './components/ScanLists';
import ScanDetails from './components/ScanDetails';
import LoginPage from './user/Login'; 
import RegisterPage from './user/Register';
import NotFound from './components/NotFound';
import './css/App.css';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('authToken'));

  const handleLogin = (token: string) => {
    sessionStorage.setItem('authToken', token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/list" element={<Lists />} />
        <Route path="/scan/:id" element={<ScanDetails />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Tambahkan catch-all route untuk halaman NotFound */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
