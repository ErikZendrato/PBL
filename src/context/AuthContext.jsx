import React, { createContext, useState, useContext } from 'react';

// 1. Buat Context
const AuthContext = createContext(null);

// 2. Buat Provider (komponen yang menyediakan state)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Awalnya tidak ada user (null)

  // Fungsi untuk login
  const login = (userData) => {
    setUser(userData);
    // Di aplikasi nyata, Anda bisa simpan token di localStorage
  };

  // Fungsi untuk logout
  const logout = () => {
    setUser(null);
    // Di aplikasi nyata, Anda bisa hapus token dari localStorage
  };

  // Cek apakah user sudah terotentikasi
  const isAuthenticated = user !== null;

  // Kirim nilai state dan fungsi ke komponen anak
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Buat hook kustom (ini yang Anda import di Login.jsx)
// Ini adalah cara mudah untuk mengakses data context
export const useAuth = () => {
  return useContext(AuthContext);
};