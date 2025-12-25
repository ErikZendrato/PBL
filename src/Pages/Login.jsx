import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { FiUser } from 'react-icons/fi'; // Import ikon
import '../App.css'; // Import styling

// Import gambar dari assets
// Pastikan path ini benar!
import baturImage from '../assets/batur.jpg'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Simulasi login
    // Di aplikasi nyata, Anda akan fetch ke API di sini
    console.log('Mencoba login dengan:', { email, password });
    
    // Kita buat data pengguna palsu untuk demo
    const userData = { email: email, name: 'Pendaki' }; 
    login(userData); // Panggil fungsi login dari context
    
    navigate('/profil'); // Arahkan ke profil setelah login
  };

  return (
    <div className="auth-page-container">
      <div className="auth-content-box">
        
        {/* ======================= */}
        {/* Sisi Gambar (Kiri)    */}
        {/* ======================= */}
        <div 
          className="auth-image-side" 
          // Kita gunakan style inline untuk mengatur gambar
          style={{ backgroundImage: `url(${baturImage})` }}
        >
          {/* Sisi ini sengaja dibiarkan kosong untuk menampilkan gambar */}
        </div>

        {/* ======================= */}
        {/* Sisi Form (Kanan)    */}
        {/* ======================= */}
        <div className="auth-form-side">
          {/* Ini adalah bagian form yang hilang */}
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-icon">
              <FiUser />
            </div>
            <h2>Login</h2>

            <div className="auth-input-group">
              <label htmlFor="email">Email address or phone number</label>
              <input
                id="email"
                type="email"
                className="auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="auth-input-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="auth-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-button-primary blue">
              Login
            </button>

            <div className="auth-link-text">
              Forgot Password? <Link to="/reset-password">Click Here</Link>
              {/* Link ini akan mengarah ke halaman Register */}
              <Link to="/register" className="auth-link-button green">
                Create new account
              </Link>
            </div>
          </form>
        </div>
        {/* Akhir dari auth-form-side */}

      </div>
      {/* Akhir dari auth-content-box */}
    </div>
    /* Akhir dari auth-page-container */
  );
}

export default Login;

