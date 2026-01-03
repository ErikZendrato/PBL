import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import "../App.css";

export default function Tiket() {
    const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <button onClick={() => navigate("/")}>Kembali</button>;
  }
  
  return (
    <div className="ticket-page">
      <div className="ticket-card">
        <h1>🎫 E-Ticket Pendakian</h1>

        <p><strong>Nama Paket:</strong> Sunrise Summit Trek</p>
        <p><strong>Tanggal:</strong> 2026-01-07</p>
        <p><strong>Jumlah Pendaki:</strong> 3 Orang</p>
        <p><strong>Status:</strong> <span className="success">LUNAS</span></p>

        <hr />

        <p>
          Silakan tunjukkan tiket ini kepada guide saat meeting point.
        </p>

        <button
          className="btn-primary"
          onClick={() => window.print()}
        >
          Cetak / Simpan Tiket
        </button>
      </div>
    </div>
  );
}
