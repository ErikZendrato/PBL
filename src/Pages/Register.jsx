import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUserPlus } from 'react-icons/fi';
import '../App.css';

// Import gambar dari assets
import baturImage from '../assets/batur.jpg'; 

function Register() {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    
   
    console.log('Mencoba mendaftar dengan:', { nama, email, password });

    
   
    alert('Pendaftaran berhasil! Silakan login.');
    
  
    navigate('/login');
  };

  return (
    <div className="auth-page-container">
      <div className="auth-content-box">
        
        {/* Sisi Gambar (Kiri) */}
        <div 
          className="auth-image-side" 
          style={{ backgroundImage: `url(${baturImage})` }}
        >
          {/* Sisi ini sengaja dibiarkan kosong untuk menampilkan gambar */}
        </div>

        {/* Sisi Form (Kanan) */}
        <div className="auth-form-side">
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-icon">
              <FiUserPlus />
            </div>
            <h2>Create a New Account</h2>

            <div className="auth-input-group">
              <label htmlFor="nama">Nama</label>
              <input
                id="nama"
                type="text"
                className="auth-input"
                placeholder="Nama lengkap Anda" // Placeholder ditambahkan
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
              />
            </div>

            <div className="auth-input-group">
              <label htmlFor="email">Email address</label> {/* Label disesuaikan */}
              <input
                id="email"
                type="email"
                className="auth-input"
                placeholder="Email Anda" // Placeholder ditambahkan
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
                placeholder="Buat password" // Placeholder ditambahkan
                value={password}
                // INI PERBAIKANNYA
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Tombol ini akan berwarna hijau karena kelas 'green' */}
            <button type="submit" className="auth-button-primary green">
              Create
            </button>

            <div className="auth-link-text">
              Sudah punya akun? <Link to="/login">Login di sini</Link>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Register;

