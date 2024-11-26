import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Tools from './components/Tools';
import './css/App.css';

const App: React.FC = () => {
  return (
    <Router>
    <Navbar />
    <Routes>
      {/* Rute untuk halaman Beranda */}
      <Route path="/" element={<Home />} />
      {/* Rute untuk halaman Tools */}
      <Route path="/tools" element={<Tools />} />
    </Routes>
  </Router>
  );
};

export default App;
