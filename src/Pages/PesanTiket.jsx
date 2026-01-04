import React, { useMemo, useState } from 'react';
import '../App.css';

const trekkingPackages = [
  {
    id: 'sunrise',
    name: 'Sunrise Summit Trek',
    description: 'Pendakian standar bersama guide komunitas Gunung Batur.',
    price: 450000,
    startTime: '03.30 WITA',
    endTime: '09.00 WITA',
  },
  {
    id: 'jeep',
    name: 'Jeep Lava Sunrise',
    description: 'Pengalaman sunrise via jeep 4x4 menuju spot lava hitam.',
    price: 650000,
    startTime: '04.15 WITA',
    endTime: '08.30 WITA',
  },
  {
    id: 'glamping',
    name: 'Overnight Glamping Trek',
    description: 'Camping premium, makan malam dan pendakian sunrise private.',
    price: 1200000,
    startTime: '16.00 WITA',
    endTime: '08.00 WITA (hari berikutnya)',
  },
];

const services = [
  { id: 'transport', name: 'Transport Hotel (Ubud/Kintamani)', price: 150000, type: 'per_trip' },
  { id: 'porter', name: 'Porter Barang 15kg', price: 75000, type: 'per_person' },
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

function PesanTiket() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(trekkingPackages[0].id);
  const [ticketCount, setTicketCount] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedEquipments, setSelectedEquipments] = useState([]);
  const [notes, setNotes] = useState('');

  const packageData = useMemo(
    () => trekkingPackages.find((pkg) => pkg.id === selectedPackage) ?? trekkingPackages[0],
    [selectedPackage],
  );

  const isDateSelected = Boolean(selectedDate);

  const handleServiceToggle = (id) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((serviceId) => serviceId !== id) : [...prev, id],
    );
  };

  const handleEquipmentToggle = (id) => {
    setSelectedEquipments((prev) =>
      prev.includes(id) ? prev.filter((equipmentId) => equipmentId !== id) : [...prev, id],
    );
  };

  const servicesTotal = useMemo(() => {
    return selectedServices.reduce((total, id) => {
      const service = services.find((item) => item.id === id);
      if (!service) return total;

      if (service.type === 'per_person') {
        return total + service.price * ticketCount;
      }

      return total + service.price;
    }, 0);
  }, [selectedServices, ticketCount]);

  const equipmentTotal = useMemo(() => {
    return selectedEquipments.reduce((total, id) => {
      const equipment = equipments.find((item) => item.id === id);
      return equipment ? total + equipment.price * ticketCount : total;
    }, 0);
  }, [selectedEquipments, ticketCount]);

  const baseTotal = packageData.price * ticketCount;
  const grandTotal = baseTotal + servicesTotal + equipmentTotal;

  const canCheckout = isDateSelected && ticketCount > 0;

  const handleCheckout = (event) => {
    event.preventDefault();
    if (!canCheckout) return;

    const orderSummary = {
      date: selectedDate,
      package: packageData.name,
      ticketCount,
      services: selectedServices.map((id) => services.find((item) => item.id === id)?.name),
      equipments: selectedEquipments.map((id) => equipments.find((item) => item.id === id)?.name),
      notes: notes.trim() || '-',
      total: grandTotal,
    };

    alert(
      `Pesanan Anda siap diproses!\n\nTanggal Pendakian: ${orderSummary.date}\nPaket: ${orderSummary.package}\nJumlah Pendaki: ${orderSummary.ticketCount}\n` +
        `Layanan Tambahan: ${orderSummary.services.length ? orderSummary.services.join(', ') : '-'}\n` +
        `Peralatan: ${orderSummary.equipments.length ? orderSummary.equipments.join(', ') : '-'}\n` +
        `Catatan: ${orderSummary.notes}\n\nTotal Pembayaran: ${formatCurrency(orderSummary.total)}\n\nTim kami akan menghubungi Anda melalui WhatsApp untuk konfirmasi.`,
    );
  };

  return (
    <div className="booking-page">
      <div className="booking-hero">
        <h1>Form Pemesanan Tiket Pendakian</h1>
        <p>
          Pilih tanggal pendakian, sesuaikan jumlah peserta, tambahkan layanan atau peralatan yang dibutuhkan,
          dan selesaikan pemesanan Anda.
        </p>
      </div>

      <form className="booking-form" onSubmit={handleCheckout}>
        <section className="booking-section bg-1">
          <h2>1. Pilih Tanggal Pendakian</h2>
          <p className="booking-section-subtitle">
            Silakan pilih tanggal keberangkatan. Tahapan berikutnya akan aktif setelah tanggal dipilih.
          </p>
          <input
            type="date"
            className="booking-date-input"
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </section>

        <section className={`booking-section bg-2${isDateSelected ? '' : ' disabled'}`}>
          <h2>2. Pilih Paket Pendakian</h2>
          <p className="booking-section-subtitle">
            Harga tertera untuk setiap pendaki. Detail durasi dan fasilitas akan disesuaikan per paket.
          </p>
          <div className="booking-package-grid">
            {trekkingPackages.map((pkg) => (
              <label key={pkg.id} className={`booking-package-card${selectedPackage === pkg.id ? ' active' : ''}`}>
                <input
                  type="radio"
                  name="trekkingPackage"
                  value={pkg.id}
                  checked={selectedPackage === pkg.id}
                  onChange={(event) => setSelectedPackage(event.target.value)}
                  disabled={!isDateSelected}
                />
                <div className="booking-package-content">
                  <div className="booking-package-header">
                    <h3>{pkg.name}</h3>
                    <span>{formatCurrency(pkg.price)}/pax</span>
                  </div>
                  <p>{pkg.description}</p>
                  <p className="booking-package-time">
                    {pkg.startTime} – {pkg.endTime}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </section>

        <section className={`booking-section bg-1${isDateSelected ? '' : ' disabled'}`}>
          <h2>3. Jumlah Tiket</h2>
          <p className="booking-section-subtitle">Masukkan jumlah pendaki dalam rombongan Anda.</p>
          <div className="booking-counter">
            <button
              type="button"
              onClick={() => setTicketCount((count) => Math.max(1, count - 1))}
              disabled={!isDateSelected || ticketCount <= 1}
            >
              –
            </button>
            <input
              type="number"
              min={1}
              value={ticketCount}
              disabled={!isDateSelected}
              onChange={(event) => setTicketCount(Math.max(1, Number(event.target.value)))}
            />
            <button
              type="button"
              onClick={() => setTicketCount((count) => count + 1)}
              disabled={!isDateSelected}
            >
              +
            </button>
          </div>
        </section>

        <section className={`booking-section bg-2${isDateSelected ? '' : ' disabled'}`}>
          <h2>4. Layanan Tambahan</h2>
          <p className="booking-section-subtitle">
            Tambahkan layanan opsional untuk kenyamanan dan dokumentasi selama pendakian.
          </p>
          <div className="booking-addon-grid">
            {services.map((service) => {
              const isChecked = selectedServices.includes(service.id);
              return (
                <label key={service.id} className={`booking-addon-card${isChecked ? ' active' : ''}`}>
                  <input
                    type="checkbox"
                    value={service.id}
                    checked={isChecked}
                    onChange={() => handleServiceToggle(service.id)}
                    disabled={!isDateSelected}
                  />
                  <div>
                    <div className="booking-addon-header">
                      <h3>{service.name}</h3>
                      <span>
                        {formatCurrency(service.price)}
                        {service.type === 'per_person' ? ' /pax' : ' /trip'}
                      </span>
                    </div>
                    <p>{service.type === 'per_person' ? 'Dikenakan per pendaki.' : 'Biaya per rombongan.'}</p>
                  </div>
                </label>
              );
            })}
          </div>
        </section>

        <section className={`booking-section bg-1${isDateSelected ? '' : ' disabled'}`}>
          <h2>5. Sewa Peralatan</h2>
          <p className="booking-section-subtitle">
            Pilih peralatan pendakian tambahan. Biaya dihitung per pendaki agar perlengkapan tersedia untuk semua.
          </p>
          <div className="booking-addon-grid">
            {equipments.map((item) => {
              const isChecked = selectedEquipments.includes(item.id);
              return (
                <label key={item.id} className={`booking-addon-card${isChecked ? ' active' : ''}`}>
                  <input
                    type="checkbox"
                    value={item.id}
                    checked={isChecked}
                    onChange={() => handleEquipmentToggle(item.id)}
                    disabled={!isDateSelected}
                  />
                  <div>
                    <div className="booking-addon-header">
                      <h3>{item.name}</h3>
                      <span>{formatCurrency(item.price)}/pax</span>
                    </div>
                    <p>Peralatan steril dan siap pakai disediakan oleh operator resmi.</p>
                  </div>
                </label>
              );
            })}
          </div>
        </section>

        <section className={`booking-section bg-2${isDateSelected ? '' : ' disabled'}`}>
          <h2>6. Catatan Tambahan</h2>
          <p className="booking-section-subtitle">
            Informasikan kebutuhan khusus (makanan, kesehatan, atau agenda rombongan).
          </p>
          <textarea
            rows={4}
            className="booking-notes"
            placeholder="Contoh: peserta memiliki alergi makanan tertentu."
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            disabled={!isDateSelected}
          />
        </section>

        <section className="booking-summary">
          <div>
            <h2>Ringkasan Pesanan</h2>
            <ul>
              <li>
                <strong>Tanggal Pendakian:</strong>{' '}
                {selectedDate ? new Date(selectedDate).toLocaleDateString('id-ID', { dateStyle: 'full' }) : '-'}
              </li>
              <li>
                <strong>Paket:</strong> {packageData.name}
              </li>
              <li>
                <strong>Jumlah Pendaki:</strong> {ticketCount} orang
              </li>
              <li>
                <strong>Layanan Tambahan:</strong>{' '}
                {selectedServices.length
                  ? selectedServices
                      .map((id) => services.find((service) => service.id === id)?.name)
                      .filter(Boolean)
                      .join(', ')
                  : '-'}
              </li>
              <li>
                <strong>Peralatan:</strong>{' '}
                {selectedEquipments.length
                  ? selectedEquipments
                      .map((id) => equipments.find((equipment) => equipment.id === id)?.name)
                      .filter(Boolean)
                      .join(', ')
                  : '-'}
              </li>
            </ul>
          </div>
          <div className="booking-total">
            <div>
              <p>
                Paket ({ticketCount} x {formatCurrency(packageData.price)})
              </p>
              <p>{formatCurrency(baseTotal)}</p>
            </div>
            <div>
              <p>Layanan tambahan</p>
              <p>{formatCurrency(servicesTotal)}</p>
            </div>
            <div>
              <p>Sewa peralatan</p>
              <p>{formatCurrency(equipmentTotal)}</p>
            </div>
            <hr />
            <div className="booking-grand-total">
              <p>Total Pembayaran</p>
              <p>{formatCurrency(grandTotal)}</p>
            </div>
            <button type="submit" className="primary-button checkout-button" disabled={!canCheckout}>
              Checkout & Konfirmasi
            </button>
            {!isDateSelected && (
              <p className="booking-helper-text">Pilih tanggal pendakian terlebih dahulu untuk melanjutkan pemesanan.</p>
            )}
          </div>
        </section>
      </form>
    </div>
  );
}

export default PesanTiket;
