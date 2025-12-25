import { useState } from "react";
import "./ResetPassword.css";

function ResetPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Link reset password telah dikirim ke: " + email);
  };

  return (
    <div className="reset-wrapper">
      {/* Bagian Kiri */}
      <div className="reset-left"></div>

      {/* Bagian Kanan */}
      <div className="reset-right">
        <div className="reset-card">
          <h2>Reset Password</h2>
          <p className="subtitle">Masukkan email Anda untuk mengatur ulang kata sandi.</p>

          <form onSubmit={handleSubmit}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Masukkan Email Anda..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit">Kirim Link Reset</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
