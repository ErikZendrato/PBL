import React from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';


// Import halaman-halaman Anda
import Home from './Pages/Home';
import Invoice from './Pages/Invoice';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profil from './Pages/Profil';
import PesanTiket from './Pages/PesanTiket';
import ResetPassword from "./Pages/ResetPassword";
import Beritadetail from './Pages/Beritadetail';
import Tiket from "./Pages/tiket";



function App() {
  const { isAuthenticated, user, logout } = useAuth();
 
  return (
    <div className="app-container">
      {/* --- NAVBAR BARU DENGAN 3 BAGIAN --- */}
      <nav className="navbar">
        <div className="navbar-inner">
        <div className="navbar-section navbar-left">
            {/* Logo placeholder */}
        </div>
        <div className="navbar-section navbar-center">
            <Link to="/">Beranda</Link>
           
            <Link to="/tiket">Tiket</Link>
            <a href="#berita">Panduan</a>
            <a href="#kontak">Kontak</a>
        </div>
        <div className="navbar-section navbar-right">
          {isAuthenticated ? (
            <>
                <span>Halo, {user.name || 'Pengguna'}!</span>
                <button onClick={logout}>Logout</button>
            </>
          ) : (
              <Link to="/login">Login</Link>
          )}
          </div>
        </div>
      </nav>
      {/* --- AKHIR NAVBAR BARU --- */}


      {/* Rute-rute Anda */}
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/tiket" element={<PesanTiket />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/berita/:slug" element={<Beritadetail />} /> 
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/tiket-saya" element={<Tiket />} />
       
      </Routes>
     
      <Routes>
        <Route path="/admin" element={<Home />} />
        <Route path="/admin/login" element={<Login />} />
        
      </Routes>
    </div>
  );
}

export default App;
