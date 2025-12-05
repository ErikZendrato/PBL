import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import { FaWhatsapp, FaArrowRight, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const hikingPackages = [
  {
    name: 'Sunrise Summit Trek',
    duration: '03.30 – 09.00 WITA',
    description: 'Pendakian favorit untuk menikmati matahari terbit di puncak Gunung Batur bersama guide bersertifikat.',
  },
  {
    name: 'Crater Rim Adventure',
    duration: '05.30 – 10.30 WITA',
    description: 'Eksplorasi bibir kawah aktif, nikmati panorama Danau Batur dan formasi lava hitam dari jarak dekat.',
  },
  {
    name: 'Kintamani Village Tour',
    duration: '08.00 – 13.00 WITA',
    description: 'Paket santai mengunjungi desa-desa adat, kebun kopi, dan spot foto favorit menghadap kaldera.',
  },
  {
    name: 'Overnight Camping Experience',
    duration: '16.00 – 08.00 WITA',
    description: 'Rasakan malam berbintang di lereng Gunung Batur lengkap dengan tenda premium dan api unggun.',
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

const events = [
  { name: 'Batur Sunrise Trail Run', date: 'Juni 2025', description: 'Lomba lari lintas alam melintasi jalur pendakian utama Gunung Batur.' },
  { name: 'Festival Geotourism Batur', date: 'Agustus 2025', description: 'Pameran budaya, kuliner, dan edukasi geowisata di kawasan Geopark Batur.' },
  { name: 'Mountain Cleanup Day', date: 'Setiap Minggu Ketiga', description: 'Aksi gotong royong membersihkan jalur pendakian bersama komunitas lokal.' },
];

const videos = [
  { title: 'Sunrise Above The Clouds', description: 'Kisah pendaki meraih matahari pertama di puncak Gunung Batur.' },
  { title: 'Jeep Adventure on Black Lava', description: 'Sensasi off-road di hamparan lava hitam pasca erupsi.' },
  { title: 'Life of Batur Guides', description: 'Cerita para pemandu lokal menjaga tradisi dan keselamatan pendakian.' },
];

const newsItems = [
  {
    title: 'Update Jam Pendakian Musim Kemarau',
    excerpt: 'Slot keberangkatan dini hari dibuka hingga dua sesi demi kenyamanan wisatawan.',
  },
  {
    title: 'Panduan Keselamatan Pendakian Gunung Batur',
    excerpt: 'Tips perlengkapan, kesehatan, dan etika jalur dari komunitas guide Batur.',
  },
  {
    title: 'Penataan Area Start Desa Toya Bungkah',
    excerpt: 'Perbaikan jalur masuk serta fasilitas parkir untuk mendukung wisata berkelanjutan.',
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
          <h1>Sunrise Above the Caldera</h1>
          <p className="hero-subtitle">
            Jelajahi pesona Gunung Batur di jantung Bali: pendakian sunrise, kawah aktif, dan budaya Kintamani
            yang memikat.
          </p>
          <div className="hero-cta">
            <a href="#pendakian" className="primary-button">
              Rencanakan Pendakian
            </a>
            <a href="#paket" className="secondary-button">Jelajahi Area</a>
          </div>
        </div>
      </section>

      <section id="pendakian" className="section ticket-booking bg-1">
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
      </section>

      {null}

      <section id="paket" className="section temple-highlight bg-1">
        <div className="section-header">
          <h2>Zona Gunung Batur</h2>
          <p>Kenali tiga area utama yang membentuk pengalaman tak terlupakan di kaldera Batur.</p>
        </div>
        <div className="temple-grid">
          {experienceHighlights.map((spot) => (
            <article key={spot.name} className="temple-card">
              <span className="temple-theme">{spot.theme}</span>
              <h3>{spot.name}</h3>
              <p>{spot.description}</p>
              <button className="ghost-button">
                Lihat Rute
                <FaArrowRight />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section ref={statsRef} className="section stats-highlight bg-2">
        <div className="section-header">
          <h2>Kenapa Wisatawan Memilih Batur?</h2>
          <p>Data operasional selama dua musim terakhir menunjukkan tingginya kepercayaan pada komunitas kami.</p>
        </div>
        <div className="stats-grid">
          {statsData.map((stat, index) => (
            <article key={stat.label} className="stat-card">
              <p className="stat-label">{stat.label}</p>
              <p className="stat-value">
                {statsVisible ? numberFormatter.format(statValues[index]) : '0'}
                <span>{stat.suffix}</span>
              </p>
              <p className="stat-description">{stat.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section attractions">
        <div className="section-header">
          <h2>Aktivitas Favorit</h2>
          <p>Lengkapi perjalanan Anda di Kintamani dengan pengalaman tambahan yang autentik.</p>
        </div>
        <div className="attraction-grid">
          {attractionActivities.map((item) => (
            <article key={item.title} className="attraction-card">
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
            </article>
          ))}
        </div>
        <div className="section-footer">
          <a href="#contact" className="primary-link">
            Lihat Semua Aktivitas
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

      <section id="event" className="section events-videos bg-2">
        <div className="events-block">
          <div className="section-header">
            <h2>Kalender Kegiatan</h2>
            <p>Ikuti event komunitas dan festival Gunung Batur sepanjang tahun.</p>
          </div>
          <ul className="event-list">
            {events.map((event) => (
              <li key={event.name} className="event-item">
                <div>
                  <h3>{event.name}</h3>
                  <p>{event.description}</p>
                </div>
                <span className="event-date">{event.date}</span>
              </li>
            ))}
          </ul>
          <div className="section-footer">
            <a href="#contact" className="secondary-link">
              Lihat Semua Event
            </a>
          </div>
        </div>

        <div className="videos-block">
          <div className="section-header">
            <h2>Video Highlight</h2>
            <p>Rangkuman visual momen terbaik di Gunung Batur dan sekitarnya.</p>
          </div>
          <div className="video-list">
            {videos.map((video) => (
              <article key={video.title} className="video-card">
                <div className="video-thumbnail" aria-hidden="true">
                  ▶
                </div>
                <div>
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="berita" className="section news-updates bg-1">
        <div className="section-header">
          <h2>Berita & Tips</h2>
          <p>Pembaruan terkini mengenai regulasi, keamanan, dan rekomendasi perjalanan.</p>
        </div>
        <div className="news-grid">
          {newsItems.map((news) => (
            <article key={news.title} className="news-card">
              <p className="news-category">News</p>
              <h3>{news.title}</h3>
              <p>{news.excerpt}</p>
              <button className="ghost-button">
                Selengkapnya
                <FaArrowRight />
              </button>
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
          <span>Hubungi Guide</span>
          <span>+62 812 2688 000</span>
        </div>
      </a>
    </>
  );
}

export default Home;

