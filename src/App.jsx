// import React from "react";
// import "./App.css";
// import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
// import { useAuth } from "./context/AuthContext";

// // Pages
// import Home from "./Pages/Home";
// import Login from "./Pages/Login";
// import Register from "./Pages/Register";
// import Profil from "./Pages/Profil";
// import PesanTiket from "./Pages/PesanTiket";
// import ResetPassword from "./Pages/ResetPassword";
// import Admin from "./Pages/Admin";
// import LoginAdmin from "./Pages/LoginAdmin";

// function App() {
//   const { isAuthenticated, user, logout, loading } = useAuth();
//   const location = useLocation();

//   // Jangan tampilkan navbar di halaman admin
//   if (loading) return <div>Loading...</div>;

//   const isAdminPage = location.pathname.startsWith("/admin");

//   const authTopOffset = isAdminPage ? "0px" : "72px";

//   // Admin must be authenticated and have admin role flag from server
//   // const isAdminAuthenticated = isAuthenticated && (user?.role === "admin" || user?.is_admin);
//   const isAdminAuthenticated = isAuthenticated && user && !user.email;

//   return (
//     <div className="app-container" style={{ "--auth-top-offset": authTopOffset }}>
//       {/* NAVBAR - Hanya tampil untuk non-admin pages */}
//       {!isAdminPage && (
//         <nav className="navbar">
//           <div className="navbar-inner">
//             <div className="navbar-section navbar-left"></div>

//             <div className="navbar-section navbar-center">
//               <Link to="/">Beranda</Link>
//               <Link to="/tiket">Tiket</Link>
//               <a href="#event">Event</a>
//               <a href="#berita">Berita</a>
//               <a href="#kontak">Kontak</a>
//             </div>

//             <div className="navbar-section navbar-right">
//               {isAuthenticated && !isAdminAuthenticated ? (
//                 <>
//                   {/* Gunakan ?. agar tidak error saat user null */}
//                   <span>Halo, {user?.nama || "Pengguna"}!</span>
//                   <p>|</p>
//                   <button onClick={logout}>Logout</button>
//                 </>
//               ) : (
//                 <Link to="/login">Login</Link>
//               )}
//             </div>
//           </div>
//         </nav>
//       )}

//       {/* ROUTES — HANYA SATU */}
//       <Routes>
//         {/* PUBLIC */}
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/reset-password" element={<ResetPassword />} />

//         {/* USER */}
//         <Route path="/profil" element={<Profil />} />
//         <Route path="/tiket" element={<PesanTiket />} />

//         {/* ADMIN */}
//         <Route path="/admin" element={isAdminAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <LoginAdmin />} />
//         <Route path="/admin/login" element={isAdminAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <LoginAdmin />} />
//         <Route path="/admin/dashboard" element={isAdminAuthenticated ? <Admin /> : <Navigate to="/admin" replace />} />
//         <Route path="/admin/order" element={isAdminAuthenticated ? <Admin /> : <Navigate to="/admin" replace />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;

//=====================================================================================

import React from "react";
import "./App.css";
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Pages
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profil from "./Pages/Profil";
import PesanTiket from "./Pages/PesanTiket";
import Invoice from "./Pages/Invoice"; // 1. IMPORT INVOICE DI SINI
import ResetPassword from "./Pages/ResetPassword";
import Admin from "./Pages/Admin";
import LoginAdmin from "./Pages/LoginAdmin";

function App() {
  const { isAuthenticated, user, logout, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  const isAdminPage = location.pathname.startsWith("/admin");
  const authTopOffset = isAdminPage ? "0px" : "72px";
  const isAdminAuthenticated = isAuthenticated && user && !user.email;

  return (
    <div className="app-container" style={{ "--auth-top-offset": authTopOffset }}>
      {!isAdminPage && (
        <nav className="navbar">
          <div className="navbar-inner">
            <div className="navbar-section navbar-left"></div>
            <div className="navbar-section navbar-center">
              <Link to="/">Beranda</Link>
              <Link to="/tiket">Tiket</Link>
              <a href="#berita">Panduan</a>
              <a href="#kontak">Kontak</a>
            </div>
            <div className="navbar-section navbar-right">
              {isAuthenticated && !isAdminAuthenticated ? (
                <>
                  <span>Halo, {user?.nama || "Pengguna"}!</span>
                  <p>|</p>
                  <button onClick={logout}>Logout</button>
                </>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </div>
          </div>
        </nav>
      )}

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* USER */}
        <Route path="/profil" element={<Profil />} />
        <Route path="/tiket" element={<PesanTiket />} />
        {/* 2. TAMBAHKAN ROUTE INVOICE DI SINI */}
        <Route path="/invoice" element={<Invoice />} /> 

        {/* ADMIN */}
        <Route path="/admin" element={isAdminAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <LoginAdmin />} />
        <Route path="/admin/login" element={isAdminAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <LoginAdmin />} />
        <Route path="/admin/dashboard" element={isAdminAuthenticated ? <Admin /> : <Navigate to="/admin" replace />} />
        <Route path="/admin/order" element={isAdminAuthenticated ? <Admin /> : <Navigate to="/admin" replace />} />
      </Routes>
    </div>
  );
}

export default App;