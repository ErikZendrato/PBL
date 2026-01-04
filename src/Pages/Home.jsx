import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import { FaWhatsapp, FaArrowRight, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const hikingRoutes = [
  {
    name: 'Jalur Toya Bungkah',
    category: 'Sunrise Trek',
    level: 'Pemula – Menengah',
    duration: '± 2 jam naik',
    description:
      'Jalur pendakian paling populer dengan medan landai dan jalur resmi.',
    experience: [
      'Sunrise terbaik Gunung Batur',
      'Panorama Danau Batur',
      'Jalur aman & ramai',
    ],
    mapSrc:
      'https://www.google.com/maps?q=-8.2420,115.3757&hl=id&z=14&output=embed',
  },
  {
    name: 'Jalur Pura Jati',
    category: 'Crater Route',
    level: 'Menengah',
    duration: '± 2,5 jam naik',
    description:
      'Jalur alternatif menuju bibir kawah dengan panorama kaldera.',
    experience: [
      'Bibir kawah aktif',
      'Edukasi geowisata',
      'Panorama timur Batur',
    ],
    mapSrc:
      'https://www.google.com/maps?q=-8.2512,115.3865&hl=id&z=14&output=embed',
  },
  {
    name: 'Jalur Serongga',
    category: 'Adventure Trek',
    level: 'Menengah – Berpengalaman',
    duration: '± 3 jam naik',
    description:
      'Jalur menantang melalui lava hitam, direkomendasikan dengan guide.',
    experience: [
      'Lava hitam erupsi 1963',
      'Trek menantang & sepi',
      'Petualangan vulkanik',
    ],
    mapSrc:
      'https://www.google.com/maps?q=-8.2595,115.3649&hl=id&z=14&output=embed',
  },
];


const experienceHighlights = [
  {
    name: 'Sunrise Ridge',
    theme: 'Panorama',
    description: 'Jalur utama untuk menyaksikan matahari terbit di atas awan, dengan latar Danau Batur dan Gunung Agung.',
  },
  {
    name: 'Active Crater Steam',
    theme: 'Geowisata',
    description: 'Belajar tentang aktivitas vulkanik Gunung Batur sambil menikmati sarapan telur kukus dari uap kawah.',
  },
  {
    name: 'Black Lava Field',
    theme: 'Petualangan',
    description: 'Hamparan lava hitam dari erupsi 1963, ideal untuk tur jeep atau sesi foto bertema vulkanik.',
  },
];

const attractionActivities = [
  { title: 'Jeep Lava Sunrise', subtitle: 'Bangun lebih siang, jelajahi jalur lava dengan jeep off-road menuju spot sunrise.' },
  { title: 'Batur Natural Hot Spring', subtitle: 'Berendam di sumber air panas alami dengan panorama danau setelah pendakian.' },
  { title: 'Cycling Kintamani', subtitle: 'Tur sepeda menuruni jalur desa, persawahan, dan kebun kopi arabika lokal.' },
  { title: 'Coffee Roastery Visit', subtitle: 'Cicipi kopi Kintamani sambil belajar proses roasting dari petani setempat.' },
  { title: 'Trekking Guide Workshop', subtitle: 'Pelatihan singkat teknik pendakian dan keselamatan oleh komunitas guide Batur.' },
  { title: 'Sunset Canoe Experience', subtitle: 'Menikmati senja di Danau Batur dengan kano berlampu LED bersama pemandu.' },
];


const newsItems = [
{
    slug: 'jumlah-pendaki-tahun-ini',
    title: 'Jumlah Pendaki di Tahun Ini',
    excerpt: 'Total pendaki Gunung Batur tahun ini mencapai 12.845 orang.',
  },
 
  {
    slug: 'panduan-keselamatan-pendakian',
    title: 'Panduan Keselamatan Pendakian Gunung Batur',
    excerpt: 'Tips perlengkapan, kesehatan, dan etika jalur dari komunitas guide Batur.',
   
  },
  {
    slug:'prosedur-larangan-dan-etika-pendakian',
    title: 'Prodedur,larangan dan etika pendakian',
    excerpt: 'Prodedur,larangan dan etika pendakian',
    content: `
      Penataan area start Desa Toya Bungkah dilakukan untuk meningkatkan
      kenyamanan dan keamanan pendaki.
    `,
  },
];


const statsData = [
  { label: 'Sunrise trek terselenggara', value: 540, suffix: '/tahun', description: 'Dipandu komunitas guide resmi dengan standar keselamatan terbaru.' },
  { label: 'Komunitas & sekolah', value: 62, suffix: '+', description: 'Mengikuti program edukasi geowisata Batur sepanjang 2024.' },
  { label: 'Tingkat kepuasan tamu', value: 4.9, suffix: '/5', description: 'Berdasarkan ulasan platform perjalanan dan survei internal.' },
  { label: 'Guide tersertifikasi', value: 85, suffix: ' orang', description: 'Siap siaga mendampingi pendakian privat maupun kelompok besar.' },
];

const faqs = [
  {
    question: 'Jam start terbaik untuk pendakian sunrise?',
    answer:
      'Rombongan berangkat antara pukul 02.30 – 03.30 WITA. Briefing keselamatan dilakukan 15 menit sebelum keberangkatan.',
  },
  {
    question: 'Apakah tersedia opsi transport dari hotel?',
    answer:
      'Ya, tersedia penjemputan dari kawasan Ubud, Kintamani, dan Bangli. Mohon sertakan alamat lengkap saat reservasi.',
  },
  {
    question: 'Bagaimana jika cuaca buruk?',
    answer:
      'Tim operasional akan melakukan penilaian 2 jam sebelum keberangkatan. Anda dapat memilih reschedule atau refund sesuai kebijakan.',
  },
  {
    question: 'Apakah paket sudah termasuk asuransi?',
    answer:
      'Seluruh paket trekking dan jeep sudah termasuk asuransi perjalanan dasar dari mitra resmi kami.',
  },
];

function Home() {
const [activeFaqIndex, setActiveFaqIndex] = useState(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [statValues, setStatValues] = useState(statsData.map(() => 0));
  const statsRef = useRef(null);
  const numberFormatter = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 1 });
  const [selectedRoute, setSelectedRoute] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!statsVisible) return;

    let animationFrame;
    const start = performance.now();
    const duration = 1500;

    const updateValues = (timestamp) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;

      setStatValues(
        statsData.map((stat) => {
          const targetValue = typeof stat.value === 'number' ? stat.value : Number(stat.value) || 0;
          const currentValue =
            typeof targetValue === 'number' ? targetValue * eased : parseFloat(targetValue) * eased;
          return stat.value % 1 !== 0 ? parseFloat(currentValue.toFixed(1)) : Math.round(currentValue);
        })
      );

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateValues);
      }
    };

    animationFrame = requestAnimationFrame(updateValues);

    return () => cancelAnimationFrame(animationFrame);
  }, [statsVisible]);

  const toggleFaq = (index) => {
    setActiveFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <section id="beranda" className="hero-section">
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-kicker">Gunung Batur</p>
          <h1>Gunung Batur</h1>
          <p className="hero-subtitle">
            Jelajahi pesona Gunung Batur di jantung Bali: pendakian sunrise, kawah aktif, dan budaya Kintamani
            yang memikat.
          </p>
          <div className="hero-cta">
            <a href="/tiket" className="primary-button">
              Rencanakan Pendakian
            </a>
            <a href="#maps" className="secondary-button">Jelajahi Area</a>
          </div>
        </div>
      </section>

      {/* <section id="pendakian" className="section ticket-booking bg-1">
        <div className="section-header">
          <h2>Rencana Pendakian</h2>
          <p>Pilih gaya pendakian Gunung Batur yang paling sesuai dengan ritme dan minat Anda.</p>
        </div>
        <div className="ticket-grid">
          {hikingPackages.map((pack) => (
            <article key={pack.name} className="ticket-card">
              <div className="ticket-label">Paket</div>
              <h3>{pack.name}</h3>
              <p className="ticket-meta">{pack.duration}</p>
              <p>{pack.description}</p>
              <Link className="ghost-button" to="/tiket">
                Cek Ketersediaan
                <FaArrowRight />
              </Link>
            </article>
          ))}
        </div>
      </section> */}

      {null}

    <section id="jalur" className="section hiking-route-section bg-2">
        <div className="section-header">
          <h2>Jalur Pendakian Gunung Batur</h2>
          <p>Pilih jalur sesuai tingkat pengalaman dan panorama favorit.</p>
        </div>

        <div className="route-grid">
          {hikingRoutes.map((route) => (
            <article key={route.name} className="route-card">
              <span className="route-category">{route.category}</span>
              <h3>{route.name}</h3>
              <p>{route.description}</p>

              <div className="route-map">
                <iframe
                  title={route.name}
                  src={route.mapSrc}
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>

              <button
                className="ghost-button"
                onClick={() => setSelectedRoute(route)}
              >
                Lihat Detail Rute <FaArrowRight />
              </button>
            </article>
          ))}
        </div>
      </section>
      

     {/* ===================== MAP GUNUNG BATUR ===================== */}
<section id="maps" className="section map-section bg-2">
  <div className="section-header">
    <h2>Lokasi Gunung Batur</h2>
    <p>Kecamatan Kintamani, Kabupaten Bangli – Bali</p>
  </div>

  <div className="map-container">
    <iframe
      title="Peta Gunung Batur"
      src="https://www.google.com/maps?q=-8.2420,115.3757&hl=id&z=13&output=embed"
      width="100%"
      height="450"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  </div>

  <div style={{ textAlign: 'center', marginTop: '20px' }}>
    <a
      href="https://www.google.com/maps/place/Gunung+Batur"
      target="_blank"
      rel="noreferrer"
      className="primary-button"
    >
      Buka di Google Maps
    </a>
  </div>
</section>


      

      <section className="section faq-section bg-1" id="faq">
        <div className="faq-grid">
          <div className="faq-intro">
            <p className="faq-kicker">Pertanyaan Populer</p>
            <h2>Kami bantu siapkan perjalanan Anda dengan lebih percaya diri.</h2>
            <p>
              Klik setiap pertanyaan untuk melihat detail persiapan, logistik, hingga kebijakan cuaca. Tim support siap
              membantu kapan pun dibutuhkan.
            </p>
            <Link to="/tiket" className="primary-button compact">
              Konsultasi Paket
            </Link>
          </div>
          <div className="faq-list" role="tablist" aria-label="FAQ pendakian">
            {faqs.map((faq, index) => {
              const isOpen = activeFaqIndex === index;
              return (
                <article key={faq.question} className={`faq-item ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="faq-question"
                    aria-expanded={isOpen}
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{faq.question}</span>
                    <span className="faq-icon">{isOpen ? '−' : '+'}</span>
                  </button>
                  <div className="faq-answer" aria-hidden={!isOpen}>
                    <p>{faq.answer}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

     

      <section id="berita" className="section news-updates bg-1">
        <div className="section-header">
          <h2>Kondisi,Panduan & Aturan</h2>
          <p>Pembaruan terkini mengenai regulasi, keamanan, dan rekomendasi perjalanan.</p>
        </div>
        <div className="news-grid">
          {newsItems.map((news) => (
            <article key={news.slug} className="news-card">
              {/* Bungkus konten dengan Link untuk membuat seluruh card bisa diklik */}
              <Link to={`/berita/${news.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <p className="news-category">News</p>
                <h3>{news.title}</h3>
                <p>{news.excerpt}</p>
                <div className="ghost-button" style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                  Selengkapnya <FaArrowRight style={{ marginLeft: '8px' }} />
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section id="kontak" className="section contact-strip">
        <div className="contact-info">
          <h2>Pusat Informasi Gunung Batur</h2>
          <p>Koordinasi Pendakian Gunung Batur · Desa Toya Bungkah, Kecamatan Kintamani</p>
          <div className="contact-detail">
            <FaPhoneAlt />
            <span>Hotline Guide (24 Jam): +62 812 2688 000</span>
          </div>
          <div className="contact-detail">
            <FaEnvelope />
            <span>info@gunungbatur.explore · booking@gunungbatur.explore</span>
          </div>
        </div>
        <div className="contact-links">
          <div>
            <h3>Zona Pendakian</h3>
            <ul>
              <li>Puncak Utama</li>
              <li>Kawah Timur</li>
              <li>Lava Hitam</li>
            </ul>
          </div>
          <div>
            <h3>Informasi</h3>
            <ul>
              <li>Perizinan Pendakian</li>
              <li>Daftar Guide Resmi</li>
              <li>Sewa Peralatan</li>
            </ul>
          </div>
          <div>
            <h3>Komunitas Batur</h3>
            <ul>
              <li>Tentang Kami</li>
              <li>Program Edukasi</li>
              <li>Hubungi Kami</li>
            </ul>
          </div>
        </div>
      </section>
      

      <footer className="footer">
        <p>© 2025 Komunitas Wisata Gunung Batur. All Rights Reserved.</p>
      </footer>

      <a href="https://wa.me/628122688000" className="emergency-button" target="_blank" rel="noreferrer">
        <FaWhatsapp size={24} />
        <div>
          <span>Emergency Contact</span>
          <span>+62 812 3456 7897</span>
        </div>
      </a>

       {selectedRoute && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedRoute(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedRoute.name}</h2>
            <p className="modal-category">{selectedRoute.category}</p>

            <p>{selectedRoute.description}</p>

            <ul className="route-info">
              <li><strong>Tingkat:</strong> {selectedRoute.level}</li>
              <li><strong>Durasi:</strong> {selectedRoute.duration}</li>
            </ul>

            <h4>Pengalaman yang Didapat</h4>
            <ul className="experience-list">
              {selectedRoute.experience.map((item, i) => (
                <li key={i}>✓ {item}</li>
              ))}
            </ul>

            <div className="modal-map">
              <iframe
                title={selectedRoute.name}
                src={selectedRoute.mapSrc}
                width="100%"
                height="250"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>

            <button
              className="primary-button"
              onClick={() => setSelectedRoute(null)}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    
  
    </>
  );

}

export default Home;

