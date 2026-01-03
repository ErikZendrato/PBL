import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PendakiChart from "../components/PendakiChart";


const beritaData = [
{
    slug: 'jumlah-pendaki-tahun-ini',
   
  },
  {
    slug: 'panduan-keselamatan-pendakian',
    title: 'Panduan Keselamatan Pendakian Gunung Batur',
    content: `
     1.Ikuti jalur resmi
  -Jangan membuat jalur sendiri agar tidak tersesat.
2.Jaga ritme dan tenaga
  -Jalan perlahan tapi konsisten.
  -Istirahat teratur, minum sebelum haus
3.Waspadai cuaca
  -Jika cuaca memburuk (kabut tebal, hujan deras, badai), pertimbangkan untuk berhenti atau turun.
4.Jangan terpisah dari rombongan
  -Terapkan sistem buddy (berpasangan).
  -Pastikan tidak ada yang tertinggal.
5.Kenali tanda bahaya
  -Hipotermia: menggigil hebat, bicara melantur.
  -Dehidrasi: pusing, lemas, urine gelap.
  -AMS (penyakit ketinggian): mual, sakit kepala, sesak napas.
    `,
  },
  {
    slug: 'prosedur-larangan-dan-etika-pendakian',
    title: 'Prodedur,larangan dan etika pendakian',
    content: `
      Area start Desa Toya Bungkah kini dilengkapi jalur masuk baru,
      area parkir, dan pos informasi pendaki.
    `,
  },
];

function BeritaDetail() {
  const { slug } = useParams();
  const berita = beritaData.find((item) => item.slug === slug);

  if (!berita) {
    return <h2>Berita tidak ditemukan</h2>;
  }

  return (
  <>
    {slug === 'jumlah-pendaki-tahun-ini' && (
  <section className="news-hero">
    <div className="news-hero-overlay"></div>

    <div className="news-hero-content dashboard">
      {/* HEADER */}
      <div className="dashboard-header">
        <h1>Kondisi Pendakian Gunung Batur</h1>
        <p>
          Berikut informasi realtime data dan grafik perbandingan pengunjung
          Gunung Batur.
        </p>
      </div>

      {/* BODY */}
      <div className="dashboard-body">
        <div className="stats-column">
          <div className="stat-item">
            <h2>575</h2>
            <span>Sedang Mendaki</span>
          </div>

          <div className="stat-item">
            <h2>452</h2>
            <span>Pendaki Laki-laki</span>
          </div>

          <div className="stat-item">
            <h2>123</h2>
            <span>Pendaki Perempuan</span>
          </div>
        </div>

        <div className="chart-column">
          <PendakiChart />
        </div>
      </div>
       <Link to="/" className="news-back-button">
          ← Kembali ke Beranda
        </Link>
    </div>
  </section>
)}

    {/* HERO SECTION */}
  
{slug === 'prosedur-larangan-dan-etika-pendakian' && (
  <section className="news-hero">
   <div className="news-hero-content">
  <h1>prosedur larangan dan etika pendakian Gunung Batur</h1>

  <div className="news-section">
    <h3>A. Sebelum Pendakian</h3>
    <ul>
      <li>Registrasi dan verifikasi data pendaki</li>
      <li>Pengecekan perlengkapan</li>
      <li>Briefing keselamatan dari petugas / guide</li>
      <li>Mengetahui kondisi cuaca dan status gununge</li>
    </ul>
  </div>

  <div className="news-section">
    <h3>B. Saat Pendakian</h3>
    <ul>
      <li>Mengikuti arahan guide dan petugas</li>
      <li>Tidak mendahului atau meninggalkan rombongan</li>
      <li>Tidak berlari di jalur pendakian</li>
      <li>Istirahat di titik yang diperbolehkan</li>
      <li>Menjaga jarak aman antar pendaki</li>
    </ul>
  </div>

 <div className="news-section">
    <h3>B. Saat Pendakian</h3>
    <ul>
      <li>Mengikuti arahan guide dan petugas</li>
      <li>Tidak mendahului atau meninggalkan rombongan</li>
      <li>Tidak berlari di jalur pendakian</li>
      <li>Istirahat di titik yang diperbolehkan</li>
      <li>Menjaga jarak aman antar pendaki</li>
    </ul>
  </div>

 <div className="news-section">
    <h3>C. Setelah Mendaki</h3>
    <ul>
      <li>Melaporkan kembali ke pos pendakian</li>
      <li>Memastikan seluruh anggota rombongan turun dengan selamat</li>
      <li>Mengembalikan perlengkapan sewa (jika ada)</li>
    </ul>
  </div>

 <div className="news-section">
    <h3>LARANGAN PENDAKIAN</h3>
    <ul>
      <li>Menbuang Samapah Sembarangan</li>
      <li>Merusak Fasilitah Alam Sekitar</li>
      <li>Membuat Api unggun Sembarangan</li>
      <li>Mendaki Saat Status Gunung ditutup</li>
    </ul>
  </div>

   <div className="news-section">
    <h3>EITKA $ PELESTARIAN LINGKUNGAN</h3>
    <ul>
      <li>Membawa Kembali Sampah masing-masing </li>
      <li>Menghormati adat dan budaya setempat</li>
      <li>Tidak memetik tanaman atau mengganggu satwa</li>
      <li>Menggunakan toilet yang tersedia</li>
    </ul>
  </div>

     {slug !== 'jumlah-pendaki-tahun-ini' && (
  <Link to="/" className="news-back-button">
    ← Kembali ke Beranda
  </Link>
)}
    </div>
  </section>
)}
{slug === 'panduan-keselamatan-pendakian' && (
  <section className="news-hero">
   <div className="news-hero-content">
  <h1>Panduan Keselamatan Pendakian Gunung Batur</h1>

  <div className="news-section">
    <h3>⛰️ Ikuti Jalur Resmi</h3>
    <p>
      Gunakan jalur pendakian resmi dan{" "}
      <strong>jangan membuat jalur sendiri</strong> agar tidak tersesat
      dan tetap aman.
    </p>
  </div>

  <div className="news-section">
    <h3>⏱️ Jaga Ritme dan Tenaga</h3>
    <ul>
      <li>Jalan perlahan tapi konsisten</li>
      <li>Istirahat secara teratur</li>
      <li>Minum air sebelum merasa haus</li>
    </ul>
  </div>

  <div className="news-section">
    <h3>🌦️ Waspadai Kondisi Cuaca</h3>
    <p>
      Jika cuaca memburuk seperti <strong>kabut tebal</strong>,{" "}
      <strong>hujan deras</strong>, atau <strong>angin kencang</strong>,
      pertimbangkan untuk berhenti atau turun demi keselamatan.
    </p>
  </div>

  <div className="news-section">
    <h3>👥 Jangan Terpisah dari Rombongan</h3>
    <ul>
      <li>Terapkan sistem buddy (berpasangan)</li>
      <li>Pastikan tidak ada anggota yang tertinggal</li>
    </ul>
  </div>

  <div className="news-section">
    <h3>⚠️ Kenali Tanda Bahaya</h3>
    <ul>
      <li><strong>Hipotermia:</strong> menggigil hebat, bicara melantur</li>
      <li><strong>Dehidrasi:</strong> pusing, lemas, urine gelap</li>
      <li><strong>AMS:</strong> mual, sakit kepala, sesak napas</li>
    </ul>
  </div>

     {slug !== 'jumlah-pendaki-tahun-ini' && (
  <Link to="/" className="news-back-button">
    ← Kembali ke Beranda
  </Link>
)}
    </div>
  </section>
)}


    

  </>
);
 

  
}

export default BeritaDetail;
