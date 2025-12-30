import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import "../App.css";
import baturImage from "../assets/batur.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      // Pass the actual user object to the context so `user.nama` is available
      login(res.data.user);

      navigate("/");
    } catch (error) {
      alert("Login gagal: email atau password salah");
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
            <h2>Login</h2>

            <div className="auth-input-group">
              <label>Email</label>
              <input type="email" className="auth-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
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

            <div className="auth-link-text">
              Lupa Password? <Link to="/reset-password">Klik di sini</Link>
            </div>

            <div className="auth-link-text">
              <Link to="/register" className="auth-link-button green">
                Create new account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
