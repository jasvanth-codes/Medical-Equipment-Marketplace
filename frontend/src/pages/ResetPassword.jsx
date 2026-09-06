import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./ResetPassword.css";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `https://medical-equipment-marketplace.onrender.com/api/auth/reset-password/${token}`,
        {
          password,
        }
      );

      setMessage(response.data.message);

      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      console.error("RESET PASSWORD ERROR:", error);

      setError(
        error.response?.data?.message ||
        "Password reset failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-container">

      <div className="reset-card">

        <div className="reset-logo">
          +
        </div>

        <h1>Create New Password</h1>

        <p className="reset-description">
          Enter a new password for your MedEquip account.
        </p>

        {message && (
          <div className="reset-success">
            {message}
            <br />
            Redirecting to login...
          </div>
        )}

        {error && (
          <div className="reset-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <label>New Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            minLength="6"
            required
          />

          <label>Confirm Password</label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            minLength="6"
            required
          />

          <button
            type="submit"
            disabled={loading || !!message}
          >
            {loading ? "Updating Password..." : "Reset Password"}
          </button>

        </form>

        <Link
          to="/login"
          className="reset-login-link"
        >
          ← Back to Login
        </Link>

      </div>

    </div>
  );
}

export default ResetPassword;

