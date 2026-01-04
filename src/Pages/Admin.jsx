// import { useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { FiHome, FiShoppingCart, FiLogOut, FiMenu, FiX } from "react-icons/fi";
// import { useAuth } from "../context/AuthContext"; // Import useAuth
// import "./Admin.css";

// export default function Admin() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user, logout } = useAuth(); // Ambil data user dari context
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   // Tentukan menu aktif berdasarkan current location
//   const getCurrentMenu = () => {
//     if (location.pathname.includes("/order")) return "orders";
//     return "dashboard";
//   };

//   const activeMenu = getCurrentMenu();

//   const handleLogout = () => {
//     // Clear auth data
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("user");
//     navigate("/");
//   };

// return (
//     <div className="admin-container">
//       {/* Sidebar */}
//       <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
//         <div className="sidebar-header">
//           <div className="admin-greeting">
//             <p>Halo, {user?.nama || "Admin"}!</p>
//             <h2>ADMIN PANEL</h2>
//           </div>
//           <button className="close-sidebar-btn" onClick={() => setSidebarOpen(false)}>
//             <FiX />
//           </button>
//         </div>

//         <nav className="sidebar-nav">
//           <button
//             className={`nav-item ${activeMenu === "dashboard" ? "active" : ""}`}
//             onClick={() => {
//               navigate("/admin/dashboard");
//             }}
//           >
//             <FiHome />
//             <span>Dashboard</span>
//           </button>

//           <button
//             className={`nav-item ${activeMenu === "orders" ? "active" : ""}`}
//             onClick={() => {
//               navigate("/admin/order");
//             }}
//           >
//             <FiShoppingCart />
//             <span>Order</span>
//           </button>

//           <button className="nav-item logout" onClick={handleLogout}>
//             <FiLogOut />
//             <span>Logout</span>
//           </button>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="main-content">
//         <button className="menu-toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
//           <FiMenu />
//         </button>

//         {activeMenu === "dashboard" && <Dashboard />}
//         {activeMenu === "orders" && <Orders />}
//       </div>
//     </div>
//   );
// }

// function Dashboard() {
//   const [revenueFilter, setRevenueFilter] = useState("all-time");
//   const [ordersFilter, setOrdersFilter] = useState("all-time");
//   const [graphFilter, setGraphFilter] = useState("7-days");

//   // Sample data - replace with API calls
//   const revenueData = {
//     today: "RP 2.500.000",
//     "specific-date": "RP 1.200.000",
//     month: "RP 45.000.000",
//     year: "RP 520.000.000",
//     "all-time": "RP 1.250.000.000",
//   };

//   const ordersData = {
//     today: 20,
//     "specific-date": 15,
//     month: 450,
//     year: 5200,
//     "all-time": 15890,
//   };

//   const graphData = {
//     "7-days": [120, 132, 101, 134, 90, 230, 210],
//     "1-month": [2200, 2290, 2000, 2181, 1890, 2390, 3490, 2100, 2800, 3100, 2900, 3200],
//     "1-year": [15000, 18000, 21000, 19000, 22000, 25000, 23000, 26000, 28000, 27000, 30000, 32000],
//   };

//   const imageUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/8+wHgAFBQIAX8jx0gAAAABJRU5ErkJggg==";

//   return (
//     <div className="dashboard">
//       <h1>Dashboard</h1>

//       {/* Cards Section */}
//       <div className="cards-section">
//         {/* Revenue Card */}
//         <div className="card revenue-card">
//           <div className="card-header">
//             <h3>Pendapatan</h3>
//             <select value={revenueFilter} onChange={(e) => setRevenueFilter(e.target.value)} className="filter-select">
//               <option value="today">Hari Ini</option>
//               <option value="specific-date">Tanggal Spesifik</option>
//               <option value="month">Bulan</option>
//               <option value="year">Tahun</option>
//               <option value="all-time">All Time</option>
//             </select>
//           </div>
//           <div className="card-content">
//             <p className="card-value">{revenueData[revenueFilter]}</p>
//           </div>
//         </div>

//         {/* Orders Card */}
//         <div className="card orders-card">
//           <div className="card-header">
//             <h3>Pesanan Tiket</h3>
//             <select value={ordersFilter} onChange={(e) => setOrdersFilter(e.target.value)} className="filter-select">
//               <option value="today">Hari Ini</option>
//               <option value="specific-date">Tanggal Spesifik</option>
//               <option value="month">Bulan</option>
//               <option value="year">Tahun</option>
//               <option value="all-time">All Time</option>
//             </select>
//           </div>
//           <div className="card-content">
//             <p className="card-value">{ordersData[ordersFilter]}</p>
//           </div>
//         </div>
//       </div>

//       {/* Graph Section */}
//       <div className="graph-section">
//         <div className="graph-header">
//           <h2>Tren Jumlah Pendaki</h2>
//           <select value={graphFilter} onChange={(e) => setGraphFilter(e.target.value)} className="filter-select">
//             <option value="7-days">7 Hari Terakhir</option>
//             <option value="1-month">1 Bulan Terakhir</option>
//             <option value="1-year">1 Tahun Terakhir</option>
//           </select>
//         </div>
//         <div className="graph-container">
//           <div className="placeholder-graph">
//             <p>Grafik Tren Pendaki</p>
//             <img src={imageUrl} alt="placeholder" style={{ width: "100%" }} />
//             {graphFilter === "7-days" && <p className="data-info">Data 7 Hari: {graphData["7-days"].join(", ")}</p>}
//             {graphFilter === "1-month" && <p className="data-info">Data 1 Bulan: {graphData["1-month"].join(", ")}</p>}
//             {graphFilter === "1-year" && <p className="data-info">Data 1 Tahun: {graphData["1-year"].join(", ")}</p>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Orders() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [hasSearched, setHasSearched] = useState(false);

//   // Sample orders data
//   const allOrders = [
//     {
//       id: 1,
//       nama: "Budi Santoso",
//       tanggalKunjungan: "2025-01-15",
//       jumlahTiket: 3,
//       alatMendaki: "Tersedia",
//       paket: "Premium",
//       totalHarga: "RP 1.500.000",
//     },
//     {
//       id: 2,
//       nama: "Siti Rahmawati",
//       tanggalKunjungan: "2025-01-16",
//       jumlahTiket: 2,
//       alatMendaki: "Tidak Tersedia",
//       paket: "Standard",
//       totalHarga: "RP 800.000",
//     },
//     {
//       id: 3,
//       nama: "Ahmad Wijaya",
//       tanggalKunjungan: "2025-01-17",
//       jumlahTiket: 4,
//       alatMendaki: "Tersedia",
//       paket: "Premium",
//       totalHarga: "RP 2.400.000",
//     },
//     {
//       id: 4,
//       nama: "Rina Kusuma",
//       tanggalKunjungan: "2025-01-18",
//       jumlahTiket: 1,
//       alatMendaki: "Tersedia",
//       paket: "Basic",
//       totalHarga: "RP 500.000",
//     },
//     {
//       id: 5,
//       nama: "Hendra Saputra",
//       tanggalKunjungan: "2025-01-19",
//       jumlahTiket: 5,
//       alatMendaki: "Tersedia",
//       paket: "Premium",
//       totalHarga: "RP 3.500.000",
//     },
//   ];

//   const handleSearch = () => {
//     setHasSearched(true);
//     if (searchQuery.trim() === "") {
//       setFilteredOrders(allOrders);
//     } else {
//       const filtered = allOrders.filter((order) => order.nama.toLowerCase().includes(searchQuery.toLowerCase()) || order.paket.toLowerCase().includes(searchQuery.toLowerCase()));
//       setFilteredOrders(filtered);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleSearch();
//     }
//   };

//   return (
//     <div className="orders">
//       <h1>Data Pesanan</h1>

//       {/* Search Section */}
//       <div className="search-section">
//         <input type="text" placeholder="Cari berdasarkan nama pemesan atau paket..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyPress={handleKeyPress} className="search-input" />
//         <button onClick={handleSearch} className="search-btn">
//           Cari
//         </button>
//       </div>

//       {/* Orders Table */}
//       <div className="table-container">
//         <table className="orders-table">
//           <thead>
//             <tr>
//               <th>No</th>
//               <th>Nama Pemesan</th>
//               <th>Tanggal Kunjungan</th>
//               <th>Jumlah Tiket</th>
//               <th>Alat Mendaki</th>
//               <th>Paket</th>
//               <th>Total Harga</th>
//             </tr>
//           </thead>
//           <tbody>
//             {!hasSearched ? (
//               <tr className="empty-row">
//                 <td colSpan="7">Silakan gunakan tombol Cari untuk menampilkan data pesanan</td>
//               </tr>
//             ) : filteredOrders.length === 0 ? (
//               <tr className="empty-row">
//                 <td colSpan="7">Tidak ada pesanan yang ditemukan</td>
//               </tr>
//             ) : (
//               filteredOrders.map((order, index) => (
//                 <tr key={order.id}>
//                   <td>{index + 1}</td>
//                   <td>{order.nama}</td>
//                   <td>{order.tanggalKunjungan}</td>
//                   <td>{order.jumlahTiket}</td>
//                   <td>{order.alatMendaki}</td>
//                   <td>{order.paket}</td>
//                   <td className="price">{order.totalHarga}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// =========================================================================================================

// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { FiHome, FiShoppingCart, FiLogOut, FiMenu, FiX, FiCheckCircle } from "react-icons/fi";
// import { useAuth } from "../context/AuthContext";
// import axios from "axios";
// import "./Admin.css";

// export default function Admin() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user, logout } = useAuth();
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const activeMenu = location.pathname.includes("/order") ? "orders" : "dashboard";

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <div className="admin-container">
//       <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
//         <div className="sidebar-header">
//           <div className="admin-greeting">
//             <p>Halo, {user?.nama || "Petugas"}!</p>
//             <h2>ADMIN PANEL</h2>
//           </div>
//           <button className="close-sidebar-btn" onClick={() => setSidebarOpen(false)}><FiX /></button>
//         </div>

//         <nav className="sidebar-nav">
//           <button className={`nav-item ${activeMenu === "dashboard" ? "active" : ""}`} onClick={() => navigate("/admin/dashboard")}>
//             <FiHome /> <span>Dashboard</span>
//           </button>
//           <button className={`nav-item ${activeMenu === "orders" ? "active" : ""}`} onClick={() => navigate("/admin/order")}>
//             <FiShoppingCart /> <span>Order</span>
//           </button>
//           <button className="nav-item logout" onClick={handleLogout}>
//             <FiLogOut /> <span>Logout</span>
//           </button>
//         </nav>
//       </div>

//       <div className="main-content">
//         <button className="menu-toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}><FiMenu /></button>
//         {activeMenu === "dashboard" && <Dashboard />}
//         {activeMenu === "orders" && <Orders />}
//       </div>
//     </div>
//   );
// }

// function Dashboard() {
//   const [summary, setSummary] = useState({ total_pendapatan: 0, total_pesanan: 0 });

//   useEffect(() => {
//     const fetchSummary = async () => {
//       try {
//         const token = localStorage.getItem("authToken");
//         const res = await axios.get("http://localhost:8000/api/admin/pesanan", {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         // Hitung total dari data yang success
//         const successOrders = res.data.filter(o => o.status === 'success');
//         const total = successOrders.reduce((acc, curr) => acc + parseFloat(curr.total_harga), 0);
//         setSummary({ total_pendapatan: total, total_pesanan: res.data.length });
//       } catch (e) { console.error(e); }
//     };
//     fetchSummary();
//   }, []);

//   return (
//     <div className="dashboard">
//       <h1>Dashboard Overview</h1>
//       <div className="cards-section">
//         <div className="card revenue-card">
//           <h3>Total Pendapatan (Success)</h3>
//           <p className="card-value">Rp {new Intl.NumberFormat("id-ID").format(summary.total_pendapatan)}</p>
//         </div>
//         <div className="card orders-card">
//           <h3>Total Seluruh Pesanan</h3>
//           <p className="card-value">{summary.total_pesanan} Tiket</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
                                      
//   const fetchOrders = async () => {
//     try {
//       const token = localStorage.getItem("authToken");
//       const res = await axios.get("http://localhost:8000/api/admin/pesanan", {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setOrders(res.data);
//       setLoading(false);
//     } catch (e) { setLoading(false); }
//   };

//   useEffect(() => { fetchOrders(); }, []);

//   const handleKonfirmasi = async (id) => {
//     if (!window.confirm("Konfirmasi pembayaran ini?")) return;
//     try {
//       const token = localStorage.getItem("authToken");
//       await axios.put(`http://localhost:8000/api/admin/pesanan/${id}/konfirmasi`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       fetchOrders();
//     } catch (e) { alert("Gagal konfirmasi"); }
//   };

//   return (
//     <div className="orders">
//       <h1>Manajemen Pesanan</h1>
//       <div className="table-container">
//         <table className="orders-table">
//           <thead>
//             <tr>
//               <th>No</th>
//               <th>Pemesan</th>
//               <th>Tgl Kunjungan</th>
//               <th>Total</th>
//               <th>Status</th>
//               <th>Aksi</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr><td colSpan="6">Loading...</td></tr>
//             ) : orders.length === 0 ? (
//               <tr><td colSpan="6">Tidak ada data pesanan.</td></tr>
//             ) : (
//               orders.map((order, index) => (
//                 <tr key={order.id}>
//                   <td>{index + 1}</td>
//                   {/* Menggunakan Optional Chaining ?. agar tidak blank jika data relasi null */}
//                   <td>{order.pengguna?.nama || "Anonim"}</td>
//                   <td>{order.tanggal_pesan}</td>
//                   <td>Rp {new Intl.NumberFormat("id-ID").format(order.total_harga)}</td>
//                   <td>
//                     <span className={`status-badge ${order.status}`}>
//                       {order.status.toUpperCase()}
//                     </span>
//                   </td>
//                   <td>
//                     {order.status === "pending" ? (
//                       <button className="btn-konfirmasi" onClick={() => handleKonfirmasi(order.id)}>
//                         Konfirmasi
//                       </button>
//                     ) : (
//                       <span className="text-verified"><FiCheckCircle /> Verified</span>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// =========================================================================================================

import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiHome, FiShoppingCart, FiLogOut, FiMenu, FiX, FiCheckCircle } from "react-icons/fi";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./Admin.css";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- KOMPONEN TIME FILTER (DITARUH DI LUAR AGAR BISA DIAKSES SEMUA) ---
const TimeFilter = ({ value, onChange }) => (
  <select className="stat-filter" value={value} onChange={(e) => onChange(e.target.value)}>
    <option value="all">All Time</option>
    <option value="7days">7 Hari</option>
    <option value="1month">1 Bulan</option>
    <option value="1year">1 Tahun</option>
    <optgroup label="Bulan Spesifik">
      {["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"].map((mo, i) => (
        <option key={i} value={i.toString()}>{mo}</option>
      ))}
    </optgroup>
  </select>
);

export default function Admin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Deteksi menu aktif berdasarkan path
  const activeMenu = location.pathname.includes("/order") ? "orders" : "dashboard";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="admin-container">
      {/* SIDEBAR */}
      <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <div className="admin-greeting">
            <p>Halo, {user?.nama || "Admin"}!</p>
            <h2>ADMIN PANEL</h2>
          </div>
          <button className="close-sidebar-btn" onClick={() => setSidebarOpen(false)}>
            <FiX />
          </button>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeMenu === "dashboard" ? "active" : ""}`} 
            onClick={() => navigate("/admin/dashboard")}
          >
            <FiHome /> <span>Dashboard</span>
          </button>
          <button 
            className={`nav-item ${activeMenu === "orders" ? "active" : ""}`} 
            onClick={() => navigate("/admin/order")}
          >
            <FiShoppingCart /> <span>Order</span>
          </button>
          <button className="nav-item logout" onClick={handleLogout}>
            <FiLogOut /> <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">
        <button className="menu-toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FiMenu />
        </button>
        
        {/* Render Komponen */}
        {activeMenu === "dashboard" && <Dashboard />}
        {activeMenu === "orders" && <Orders />}
      </div>
    </div>
  );
}

// --- KOMPONEN DASHBOARD ---
function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [filterPendapatan, setFilterPendapatan] = useState("all");
  const [filterTiket, setFilterTiket] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get("http://localhost:8000/api/admin/pesanan", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Gagal memuat data dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const getFilteredData = (type) => {
    const now = new Date();
    return orders.filter(order => {
      if (order.status !== "success" || !order.tanggal_pesan) return false;
      if (type === "all") return true;

      const orderDate = new Date(order.tanggal_pesan);
      if (isNaN(orderDate.getTime())) return false;

      const diffDays = (now - orderDate) / (1000 * 60 * 60 * 24);
      if (type === "7days") return diffDays <= 7;
      if (type === "1month") return diffDays <= 30;
      if (type === "1year") return diffDays <= 365;
      
      return orderDate.getMonth() === parseInt(type);
    });
  };

  const statsPendapatan = useMemo(() => 
    getFilteredData(filterPendapatan).reduce((acc, curr) => acc + Number(curr.total_harga || 0), 0)
  , [orders, filterPendapatan]);

  const statsTiket = useMemo(() => 
    getFilteredData(filterTiket).reduce((acc, curr) => acc + Number(curr.jumlah_tiket || 0), 0)
  , [orders, filterTiket]);

  const chartData = useMemo(() => {
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      last7Days.push({
        dateStr: d.toDateString(),
        dayName: days[d.getDay()]
      });
    }

    return last7Days.map(item => {
      const count = orders.filter(o => {
        if (o.status !== "success" || !o.tanggal_pesan) return false;
        return new Date(o.tanggal_pesan).toDateString() === item.dateStr;
      }).length;
      return { name: item.dayName, pendaki: count };
    });
  }, [orders]);

  if (loading) return <div style={{padding: "40px"}}>Memuat data dashboard...</div>;

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card revenue-card-new">
          <div className="stat-card-header">
            <h2>Pendapatan</h2>
            <TimeFilter value={filterPendapatan} onChange={setFilterPendapatan} />
          </div>
          <div className="stat-value-large">RP {statsPendapatan.toLocaleString("id-ID")}</div>
        </div>

        <div className="stat-card ticket-card-new">
          <div className="stat-card-header">
            <h2>Pesanan Tiket</h2>
            <TimeFilter value={filterTiket} onChange={setFilterTiket} />
          </div>
          <div className="stat-value-large blue-text">{statsTiket}</div>
        </div>
      </div>

      <div className="graph-section-new">
        <h2>Tren Jumlah Pendaki</h2>
        <div className="graph-container-real" style={{height: "300px", marginTop: "20px"}}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis dataKey="name" tick={{fontSize: 12, fill: "#999"}} />
              <YAxis tick={{fontSize: 12, fill: "#999"}} />
              <Tooltip />
              <Area type="monotone" dataKey="pendaki" stroke="#82ca9d" fill="#dcfce7" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// --- KOMPONEN ORDERS ---
function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const res = await axios.get("http://localhost:8000/api/admin/pesanan", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleConfirm = async (id) => {
    if (!window.confirm("Konfirmasi pesanan ini?")) return;
    try {
      const token = localStorage.getItem("authToken");
      await axios.put(`http://localhost:8000/api/admin/pesanan/${id}/konfirmasi`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Berhasil!");
      fetchOrders();
    } catch (err) {
      alert("Gagal konfirmasi");
    }
  };

  const displayOrders = orders.filter(o => 
    o.pengguna?.nama?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="orders">
      <h1>Data Pesanan Masuk</h1>
      <input 
        type="text" 
        className="search-input"
        placeholder="Cari pemesan..." 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
      />
      <div className="table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Tgl Kunjungan</th>
              <th>Tiket</th>
              {/* Header Baru */}
              <th>Alat Mendaki</th> 
              <th>Total</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="8" align="center">Memuat...</td></tr>
            ) : displayOrders.map((o, i) => (
              <tr key={o.id}>
                <td>{i + 1}</td>
                <td>{o.pengguna?.nama || "-"}</td>
                <td>{o.tanggal_pesan}</td>
                <td>{o.jumlah_tiket}</td>
                {/* Baris yang error tadi diperbaiki di bawah ini */}
                <td style={{ fontSize: '13px', color: '#666' }}>
                  {o.alat_mendaki ? o.alat_mendaki : "-"}
                </td>
                <td>Rp {Number(o.total_harga).toLocaleString("id-ID")}</td>
                <td><span className={`status-badge ${o.status}`}>{o.status}</span></td>
                <td>
                  {o.status === 'pending' && (
                    <button className="confirm-btn" onClick={() => handleConfirm(o.id)}>
                      <FiCheckCircle /> Konfirmasi
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}