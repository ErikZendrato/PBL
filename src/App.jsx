import React from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Pages
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profil from './Pages/Profil';
import PesanTiket from './Pages/PesanTiket';
import ResetPassword from "./Pages/ResetPassword";

function App() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="app-container">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="navbar-section navbar-left"></div>

          <div className="navbar-section navbar-center">
            <Link to="/">Beranda</Link>
            <Link to="/tiket">Tiket</Link>
            <a href="#event">Event</a>
            <a href="#berita">Berita</a>
            <a href="#kontak">Kontak</a>
          </div>

          <div className="navbar-section navbar-right">
            {isAuthenticated ? (
              <>
                <span>Halo, {user?.nama || 'Pengguna'}!</span>
                <p>|</p>
                <button onClick={logout}>Logout</button>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </div>
      </nav>

      {/* ROUTES — HANYA SATU */}
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* USER */}
        <Route path="/profil" element={<Profil />} />
        <Route path="/tiket" element={<PesanTiket />} />

        {/* ADMIN */}
        <Route path="/admin" element={<Home />} />
        <Route path="/admin/login" element={<Login />} />
      </Routes>

    </div>
  );
}

export default App;
