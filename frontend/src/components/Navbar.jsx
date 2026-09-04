import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBoxOpen,
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaTachometerAlt,
  FaPlus,
} from "react-icons/fa";

import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* LOGO */}

        <Link to="/" className="navbar-brand">
          <div className="navbar-brand-icon">
            +
          </div>

          <div className="navbar-brand-text">
            <strong>MedEquip</strong>
            <span>Healthcare Store</span>
          </div>
        </Link>

        {/* NAVIGATION */}

        <nav className="navbar-nav">

          <Link
            to="/"
            className={`navbar-link ${
              isActive("/") ? "active" : ""
            }`}
          >
            <FaHome />
            <span>Home</span>
          </Link>

          <Link
            to="/products"
            className={`navbar-link ${
              isActive("/products") ? "active" : ""
            }`}
          >
            <FaBoxOpen />
            <span>Products</span>
          </Link>

          <Link
            to="/cart"
            className={`navbar-link ${
              isActive("/cart") ? "active" : ""
            }`}
          >
            <FaShoppingCart />
            <span>Cart</span>
          </Link>

          <Link
            to="/wishlist"
            className={`navbar-link ${
              isActive("/wishlist") ? "active" : ""
            }`}
          >
            <FaHeart />
            <span>Wishlist</span>
          </Link>

          {user && (
            <Link
              to="/profile"
              className={`navbar-link ${
                isActive("/profile") ? "active" : ""
              }`}
            >
              <FaUser />
              <span>Profile</span>
            </Link>
          )}

          {user?.role === "admin" && (
            <>
              <Link
                to="/admin"
                className={`navbar-link admin-link ${
                  isActive("/admin") ? "active" : ""
                }`}
              >
                <FaTachometerAlt />
                <span>Admin</span>
              </Link>

              <Link
                to="/admin/add-product"
                className="navbar-link admin-add-link"
              >
                <FaPlus />
                <span>Add Product</span>
              </Link>
            </>
          )}

        </nav>

        {/* RIGHT SIDE */}

        <div className="navbar-actions">

          {user ? (
            <>
              <div className="navbar-user">

                <div className="navbar-user-icon">
                  <FaUser />
                </div>

                <div className="navbar-user-text">
                  <span>Welcome</span>
                  <strong>
                    {user.name || "User"}
                  </strong>
                </div>

              </div>

              <button
                type="button"
                className="navbar-logout"
                onClick={handleLogout}
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="navbar-login"
              >
                <FaSignInAlt />
                <span>Login</span>
              </Link>

              <Link
                to="/register"
                className="navbar-register"
              >
                <FaUserPlus />
                <span>Register</span>
              </Link>
            </>
          )}

        </div>

      </div>
    </header>
  );
}

export default Navbar;
