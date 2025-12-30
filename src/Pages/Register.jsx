import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUserPlus, FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';
import '../App.css';
import baturImage from '../assets/batur.jpg';

function Register() {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // 🔒 LOCK SUBMIT

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // ❌ cegah submit 2x
    if (loading) return;

    setLoading(true);

    try {
      await axios.post(
        'http://127.0.0.1:8000/api/register',
        {
          nama,
          email,
          password,
        },
        {
          headers: {
            Accept: 'application/json',
          },
        }
      );

      alert('Registrasi berhasil, silakan login');
      navigate('/login');
    } catch (error) {
      const message =
        error.response?.data?.message || 'Registrasi gagal';
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-content-box">

        <div
          className="auth-image-side"
          style={{ backgroundImage: `url(${baturImage})` }}
        />

        <div className="auth-form-side">
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-icon"><FiUserPlus /></div>
            <h2>Create a New Account</h2>

            <div className="auth-input-group">
              <label>Nama</label>
              <input
                type="text"
                className="auth-input"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
              />
            </div>

            <div className="auth-input-group">
              <label>Email</label>
              <input
                type="email"
                className="auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="auth-input-group" style={{ position: 'relative' }}>
              <label>Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="auth-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '44px',
                  cursor: 'pointer',
                }}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            <button
              type="submit"
              className="auth-button-primary green"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Create'}
            </button>

            <div className="auth-link-text">
              Sudah punya akun? <Link to="/login">Login di sini</Link>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Register;
