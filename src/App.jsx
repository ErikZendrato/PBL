import React from 'react'
import './App.css'
import { FaWhatsapp } from 'react-icons/fa'

function App() {
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-links-left">
          <a href="#beranda">BERANDA</a>
          <a href="#profil">PROFIL</a>
          <a href="#tiket">PESAN TIKET</a>
        </div>
        <div className="nav-links-right">
          <a href="#login">LOGIN</a>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-content">
          <h1>Gunung Batur</h1>
          <p>Ayo Jelajahi Gunung Batur Dan Lihat Keindahan Alamnya</p>
        </div>
      </section>

      <a href="https://wa.me/6281234567890" className="emergency-button">
        <FaWhatsapp size={24} />
        <div>
          <span>Nomor Darurat</span>
          <span>+62 812-345-678</span>
        </div>
      </a>
    </div>
  )
}

export default App