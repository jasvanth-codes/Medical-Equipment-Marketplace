import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    if (
      !user.name ||
      !user.email ||
      !user.password ||
      !user.confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        "https://medical-equipment-marketplace.onrender.com/api/auth/register",
        {
          name: user.name,
          email: user.email,
          password: user.password,
        }
      );

      alert("Registration Successful");

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      setUser({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/products");
    } catch (err) {
      alert(
        err.response?.data?.message || "Registration Failed"
      );
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">

        <h1>Medical Equipment Marketplace</h1>

        <h2>Create Account</h2>

        <form onSubmit={registerUser}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={user.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={user.confirmPassword}
            onChange={handleChange}
          />

          <button type="submit">
            Register
          </button>

        </form>

      </div>
    </div>
  );
}

export default Register;
