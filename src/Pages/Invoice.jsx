// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import '../App.css';

// const formatCurrency = (value) =>
//   new Intl.NumberFormat('id-ID', {
//     style: 'currency',
//     currency: 'IDR',
//     maximumFractionDigits: 0,
//   }).format(value);

// export default function Invoice() {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const [file, setFile] = useState(null);

//   if (!state) {
//     return <button onClick={() => navigate('/')}>Kembali</button>;
//   }

//   return (
//     <div className="booking-modern">
//       <header className="hero">
//         <h1>Invoice Pembayaran</h1>
//         <p>Booking Pendakian Gunung Batur</p>
//       </header>

//       <section className="card">
//         <p><strong>Tanggal:</strong> {state.date}</p>
//         <p><strong>Jumlah Pendaki:</strong> {state.pax} orang</p>
//         <p><strong>Total Bayar:</strong> {formatCurrency(state.total)}</p>
//       </section>

//       <section className="card">
//         <h3>Transfer Pembayaran</h3>
//         <p>Bank BCA</p>
//         <p>No Rekening: <strong>1234567890</strong></p>
//         <p>Atas Nama: <strong>Gunung Batur Adventure</strong></p>
//       </section>

//       <section className="card">
//         <h3>Upload Bukti Pembayaran</h3>
//         <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
//         {file && <p className="success">File dipilih: {file.name}</p>}
//       </section>

//       <section className="summary-card">
//         <button
//   className="btn-primary"
//   disabled={!file}
//   onClick={() =>
//     navigate('/tiket-saya', {
//       state: {
//         date: state.date,
//         pax: state.pax,
//         total: state.total,
//       },
//     })
//   }
// >
//   Kirim Bukti Pembayaran
// </button>
//       </section>
//     </div>
//   );
// }

//=====================================================================================

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const formatCurrency = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);

export default function Invoice() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Jika state kosong (misal karena refresh halaman), tampilkan pesan error
  if (!state) {
    return (
      <div style={{ padding: "100px", textAlign: "center", color: "white" }}>
        <h2>Data tidak ditemukan. Silakan pesan ulang.</h2>
        <button className="btn-primary" onClick={() => navigate('/tiket')}>Kembali ke Form Tiket</button>
      </div>
    );
  }

  const handleKirimBukti = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");

      // Payload data pesanan sesuai dengan PesananController.php
      const payload = {
        tanggal_pesan: state.date,
        jumlah_tiket: state.pax,
        total_harga: state.total,
        alat_mendaki: state.alat_mendaki,
      };

      const res = await axios.post("http://127.0.0.1:8000/api/pesanan", payload, {
        headers: { 
          Authorization: `Bearer ${token}`, // Pastikan token ini ada!
          Accept: 'application/json'
        }
      });

      if (res.data.success) {
        alert("Berhasil! Pesanan Anda telah diterima dan sedang diproses oleh Admin.");
        navigate('/tiket'); // Atau navigasi ke halaman riwayat pesanan user
      }
    } catch (err) {
      console.error("Error Detail:", err.response?.data);
      alert("Gagal mengirim pesanan: " + (err.response?.data?.message || "Koneksi Bermasalah"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-modern">
      <header className="hero">
        <h1>Invoice Pembayaran</h1>
        <p>Booking Pendakian Gunung Batur</p>
      </header>

      <section className="card">
        <h3>Rincian Pesanan</h3>
        <p><strong>Tanggal:</strong> {state.date}</p>
        <p><strong>Jumlah Pendaki:</strong> {state.pax} orang</p>
        <p><strong>Rincian Tambahan:</strong> {state.alat_mendaki}</p>
        <p><strong>Total Bayar:</strong> {formatCurrency(state.total)}</p>
      </section>

      <section className="card">
        <h3>Transfer Pembayaran</h3>
        <p>Bank BCA - 1234567890</p>
        <p>Atas Nama: <strong>Gunung Batur Adventure</strong></p>
      </section>

      <section className="card">
        <h3>Upload Bukti Pembayaran</h3>
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
        {file && <p className="success">File dipilih: {file.name}</p>}
      </section>

      <section className="summary-card">
        <button
          className="btn-primary"
          disabled={!file || loading}
          onClick={handleKirimBukti}
        >
          {loading ? "Sedang Mengirim..." : "Kirim Bukti Pembayaran"}
        </button>
      </section>
    </div>
  );
}