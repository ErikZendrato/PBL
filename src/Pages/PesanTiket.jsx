// import React, { useMemo, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../App.css';

// const services = [
//   { id: 'transport', name: 'Transport Hotel', price: 150000, type: 'per_trip' },
//   { id: 'porter', name: 'Porter 15kg', price: 75000, type: 'per_person' },
//   { id: 'photographer', name: 'Dokumentasi Profesional', price: 200000, type: 'per_trip' },
// ];

// const equipments = [
//   { id: 'headlamp', name: 'Headlamp', price: 25000 },
//   { id: 'jacket', name: 'Jaket Hangat', price: 30000 },
//   { id: 'sticks', name: 'Trekking Pole', price: 35000 },
// ];

// const PACKAGE_PRICE = 450000;

// const formatCurrency = (value) =>
//   new Intl.NumberFormat('id-ID', {
//     style: 'currency',
//     currency: 'IDR',
//     maximumFractionDigits: 0,
//   }).format(value);

// export default function PesanTiket() {
//   const navigate = useNavigate();
//   const [date, setDate] = useState('');
//   const [pax, setPax] = useState(1);
//   const [servicesSelected, setServicesSelected] = useState([]);
//   const [equipmentsSelected, setEquipmentsSelected] = useState([]);

//   const servicesTotal = useMemo(() => {
//     return servicesSelected.reduce((total, id) => {
//       const s = services.find((x) => x.id === id);
//       if (!s) return total;
//       return s.type === 'per_person' ? total + s.price * pax : total + s.price;
//     }, 0);
//   }, [servicesSelected, pax]);

//   const equipmentsTotal = useMemo(() => {
//     return equipmentsSelected.reduce((total, id) => {
//       const e = equipments.find((x) => x.id === id);
//       return e ? total + e.price * pax : total;
//     }, 0);
//   }, [equipmentsSelected, pax]);

//   const total = pax * PACKAGE_PRICE + servicesTotal + equipmentsTotal;

//   return (
//     <div className="booking-modern">
//       <header className="hero">
//         <h1>Booking Pendakian Gunung Batur</h1>
//         <p>Paket Sunrise • Guide Lokal • Aman & Terpercaya</p>
//       </header>

//       <section className="card">
//         <h3>📅 Tanggal Pendakian</h3>
//         <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
//       </section>

//       <section className="card">
//         <h3>👥 Jumlah Pendaki</h3>
//         <div className="counter">
//           <button onClick={() => setPax(Math.max(1, pax - 1))}>−</button>
//           <span>{pax}</span>
//           <button onClick={() => setPax(pax + 1)}>+</button>
//         </div>
//       </section>

//       <section className="card">
//         <h3>➕ Layanan Tambahan</h3>
//         {services.map((s) => (
//           <label key={s.id} className="option">
//             <input
//               type="checkbox"
//               checked={servicesSelected.includes(s.id)}
//               onChange={() =>
//                 setServicesSelected((prev) =>
//                   prev.includes(s.id) ? prev.filter((x) => x !== s.id) : [...prev, s.id],
//                 )
//               }
//             />
//             {s.name} ({formatCurrency(s.price)})
//           </label>
//         ))}
//       </section>

//       <section className="card">
//         <h3>🎒 Sewa Peralatan</h3>
//         {equipments.map((e) => (
//           <label key={e.id} className="option">
//             <input
//               type="checkbox"
//               checked={equipmentsSelected.includes(e.id)}
//               onChange={() =>
//                 setEquipmentsSelected((prev) =>
//                   prev.includes(e.id) ? prev.filter((x) => x !== e.id) : [...prev, e.id],
//                 )
//               }
//             />
//             {e.name} ({formatCurrency(e.price)}/pax)
//           </label>
//         ))}
//       </section>

//       <section className="summary-card">
//         <h2>Total Pembayaran</h2>
//         <p className="price">{formatCurrency(total)}</p>
//         <button
//           className="btn-primary"
//           disabled={!date}
//           onClick={() =>
//             navigate('/invoice', {
//               state: { date, pax, total },
//             })
//           }
//         >
//           Lanjut Bayar
//         </button>
//       </section>
//     </div>
//   );
// }

import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const services = [
  { id: 'transport', name: 'Transport Hotel', price: 150000, type: 'per_trip' },
  { id: 'porter', name: 'Porter 15kg', price: 75000, type: 'per_person' },
  { id: 'photographer', name: 'Dokumentasi Profesional', price: 200000, type: 'per_trip' },
];

const equipments = [
  { id: 'headlamp', name: 'Headlamp', price: 25000 },
  { id: 'jacket', name: 'Jaket Hangat', price: 30000 },
  { id: 'sticks', name: 'Trekking Pole', price: 35000 },
];

const PACKAGE_PRICE = 450000;

const formatCurrency = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);

export default function PesanTiket() {
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [pax, setPax] = useState(1);
  const [servicesSelected, setServicesSelected] = useState([]);
  const [equipmentsSelected, setEquipmentsSelected] = useState([]);

  const servicesTotal = useMemo(() => {
    return servicesSelected.reduce((total, id) => {
      const s = services.find((x) => x.id === id);
      if (!s) return total;
      return s.type === 'per_person' ? total + s.price * pax : total + s.price;
    }, 0);
  }, [servicesSelected, pax]);

  const equipmentsTotal = useMemo(() => {
    return equipmentsSelected.reduce((total, id) => {
      const e = equipments.find((x) => x.id === id);
      return e ? total + e.price * pax : total;
    }, 0);
  }, [equipmentsSelected, pax]);

  const total = pax * PACKAGE_PRICE + servicesTotal + equipmentsTotal;

  // FUNGSI BARU: Mengirim data lengkap ke Invoice
  const handleLanjutBayar = () => {
    const selectedS = services.filter(s => servicesSelected.includes(s.id)).map(s => s.name);
    const selectedE = equipments.filter(e => equipmentsSelected.includes(e.id)).map(e => e.name);
    
    // Gabungkan rincian alat & layanan menjadi string
    const rincianAlat = [...selectedS, ...selectedE].join(", ") || "-";

    navigate('/invoice', {
      state: { 
        date, 
        pax, 
        total,
        alat_mendaki: rincianAlat 
      },
    });
  };

  return (
    <div className="booking-modern">
      <header className="hero">
        <h1>Booking Pendakian Gunung Batur</h1>
        <p>Paket Sunrise • Guide Lokal • Aman & Terpercaya</p>
      </header>

      <section className="card">
        <h3>📅 Tanggal Pendakian</h3>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </section>

      <section className="card">
        <h3>👥 Jumlah Pendaki</h3>
        <div className="counter">
          <button onClick={() => setPax(Math.max(1, pax - 1))}>−</button>
          <span>{pax}</span>
          <button onClick={() => setPax(pax + 1)}>+</button>
        </div>
      </section>

      <section className="card">
        <h3>➕ Layanan Tambahan</h3>
        {services.map((s) => (
          <label key={s.id} className="option">
            <input
              type="checkbox"
              checked={servicesSelected.includes(s.id)}
              onChange={() =>
                setServicesSelected((prev) =>
                  prev.includes(s.id) ? prev.filter((x) => x !== s.id) : [...prev, s.id],
                )
              }
            />
            {s.name} ({formatCurrency(s.price)})
          </label>
        ))}
      </section>

      <section className="card">
        <h3>🎒 Sewa Peralatan</h3>
        {equipments.map((e) => (
          <label key={e.id} className="option">
            <input
              type="checkbox"
              checked={equipmentsSelected.includes(e.id)}
              onChange={() =>
                setEquipmentsSelected((prev) =>
                  prev.includes(e.id) ? prev.filter((x) => x !== e.id) : [...prev, e.id],
                )
              }
            />
            {e.name} ({formatCurrency(e.price)}/pax)
          </label>
        ))}
      </section>

      <section className="summary-card">
        <h2>Total Pembayaran</h2>
        <p className="price">{formatCurrency(total)}</p>
        <button
          className="btn-primary"
          disabled={!date}
          onClick={handleLanjutBayar}
        >
          Lanjut Bayar
        </button>
      </section>
    </div>
  );
}