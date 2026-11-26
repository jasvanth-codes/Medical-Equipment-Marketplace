import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/api";
import "./Login.css";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      const data = response.data;

      const userData = {
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
      };

      const token = data.token;

      if (!userData._id || !token) {
        setError("Login failed. User or token not received.");
        return;
      }

      const success = login(userData, token);

      if (!success) {
        setError("Unable to save login session.");
        return;
      }

      if (userData.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }

    } catch (error) {
      console.error("LOGIN ERROR:", error);

      setError(
        error.response?.data?.message ||
        "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <div className="login-logo">
          <div className="login-logo-icon">+</div>

          <div>
            <h1>MedEquip</h1>
            <span>Healthcare Store</span>
          </div>
        </div>

        <div className="login-heading">
          <h2>Welcome Back</h2>

          <p>
            Login to access your medical equipment account
          </p>
        </div>

        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>

          <div className="login-field">
            <label>Email Address</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="login-field">

            <div className="password-label-row">
              <label>Password</label>

              <Link
                to="/forgot-password"
                className="forgot-link"
              >
                Forgot Password?
              </Link>
            </div>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="login-button"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <div className="login-divider">
          <span>New to MedEquip?</span>
        </div>

        <Link
          to="/register"
          className="create-account-btn"
        >
          Create an Account
        </Link>

        <p className="login-footer-text">
          Secure access to professional healthcare equipment.
        </p>

      </div>

    </div>
  );
}

export default Login;

