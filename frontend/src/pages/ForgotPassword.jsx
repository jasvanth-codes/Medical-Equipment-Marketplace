import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [resetUrl, setResetUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setResetUrl("");
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );

      setMessage(response.data.message);

      if (response.data.resetUrl) {
        setResetUrl(response.data.resetUrl);
      }

    } catch (error) {
      console.error("FORGOT PASSWORD ERROR:", error);

      setError(
        error.response?.data?.message ||
        "Unable to process your request."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">

      <div className="forgot-card">

        <Link to="/login" className="back-login">
          ← Back to Login
        </Link>

        <div className="forgot-logo">
          <div>+</div>
        </div>

        <h1>Forgot Password?</h1>

        <p className="forgot-description">
          Enter your registered email address and we'll
          generate a password reset link.
        </p>

        {message && (
          <div className="forgot-success">
            {message}
          </div>
        )}

        {error && (
          <div className="forgot-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <label>Email Address</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your registered email"
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Generating Reset Link..."
              : "Generate Reset Link"}
          </button>

        </form>

        {resetUrl && (
          <div className="reset-link-box">

            <strong>Development Reset Link</strong>

            <p>
              In this local development version, the reset
              link is displayed here instead of being emailed.
            </p>

            <a href={resetUrl}>
              Reset Your Password →
            </a>

          </div>
        )}

        <p className="forgot-footer">
          For security, never share your password or reset link.
        </p>

      </div>

    </div>
  );
}

export default ForgotPassword;
