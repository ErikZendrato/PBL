import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Navigate } from 'react-router-dom';
import '../App.css'; // Kita pakai App.css

function Profil() {
  const { user, isAuthenticated } = useAuth();

  // Jika tidak login, lempar kembali ke halaman login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Jika login, tampilkan info user
  return (
    <div style={{ padding: '50px', maxWidth: '600px', margin: '30px auto', background: 'white', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', textAlign: 'center' }}>
      <h2>Profil Pengguna</h2>
      <p>Selamat datang, <strong>{user.name || user.email}</strong>!</p>
      <p>Email Anda: {user.email}</p>
    </div>
  );
}

export default Profil;
