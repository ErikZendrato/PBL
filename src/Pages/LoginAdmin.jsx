import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import { FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import "../App.css";
import "./Admin.css";
import baturImage from "../assets/batur.jpg";

export default function LoginAdmin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [nama, setNama] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/admin/login", {
        nama,
        password,
      });

      // 1. Simpan Token untuk header API
      localStorage.setItem("authToken", res.data.token);
      
      // 2. Masukkan ke context
      login(res.data.user);

      // 3. Pindah halaman
      navigate("/admin/dashboard");
    } catch (error) {
      alert("Login admin gagal!");
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-content-box">
        <div className="auth-image-side" style={{ backgroundImage: `url(${baturImage})` }} />

        <div className="auth-form-side">
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-icon">
              <FiUser />
            </div>
            <h2>Admin Login</h2>

            <div className="auth-input-group">
              <label>Nama</label>
              <input type="text" className="auth-input" value={nama} onChange={(e) => setNama(e.target.value)} required />
            </div>

            <div className="auth-input-group" style={{ position: "relative" }}>
              <label>Password</label>
              <input type={showPassword ? "text" : "password"} className="auth-input" value={password} onChange={(e) => setPassword(e.target.value)} required />

              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "44px",
                  cursor: "pointer",
                }}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            <button type="submit" className="auth-button-primary blue">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
