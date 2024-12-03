import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Tools from './components/Tools';
import Lists from './components/ScanLists';
import ScanDetails from './components/ScanDetails'; 
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
      {/* Rute untuk halaman Scan Lists */}
      <Route path="/list" element={<Lists />} />
      <Route path="/scan/:id" element={<ScanDetails />} />
    </Routes>
  </Router>
  );
};

export default App;
