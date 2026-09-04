import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBoxOpen,
  FaPlusCircle,
  FaShoppingCart,
  FaUsers,
  FaSync,
  FaArrowRight,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../utils/api";

import "./AdminDashboard.css";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const response = await API.get("/admin/dashboard");

      console.log(
        "ADMIN DASHBOARD RESPONSE:",
        response.data
      );

      if (response.data.success) {
        setStats({
          totalUsers:
            response.data.statistics?.totalUsers || 0,

          totalProducts:
            response.data.statistics?.totalProducts || 0,

          totalOrders:
            response.data.statistics?.totalOrders || 0,
        });
      }
    } catch (error) {
      console.error(
        "ADMIN DASHBOARD ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <>
      <Navbar />

      <main className="admin-dashboard">

        {/* HEADER */}
        <div className="admin-dashboard-header">

          <div>
            <span className="admin-label">
              ADMIN PANEL
            </span>

            <h1>Admin Dashboard</h1>

            <p>
              Monitor users, products, orders and
              marketplace revenue.
            </p>
          </div>

          <div className="admin-dashboard-actions">

            <button
              className="admin-refresh-btn"
              onClick={fetchDashboard}
              disabled={loading}
            >
              <FaSync />
              Refresh
            </button>

            <Link
              to="/admin/orders"
              className="admin-orders-btn"
            >
              <FaShoppingCart />
              Manage Orders
            </Link>

          </div>

        </div>

        {/* STATISTICS */}
        <section className="admin-statistics">

          {/* TOTAL USERS - CLICKABLE */}
          <Link
            to="/admin/users"
            className="admin-stat-card admin-stat-link"
          >

            <div className="admin-stat-icon">
              <FaUsers />
            </div>

            <div>
              <span>Total Users</span>

              <strong>
                {loading ? "..." : stats.totalUsers}
              </strong>

              <small>
                Registered customers
              </small>
            </div>

          </Link>

          {/* TOTAL PRODUCTS */}
          <Link
            to="/admin/products"
            className="admin-stat-card admin-stat-link"
          >

            <div className="admin-stat-icon">
              <FaBoxOpen />
            </div>

            <div>
              <span>Total Products</span>

              <strong>
                {loading
                  ? "..."
                  : stats.totalProducts}
              </strong>

              <small>
                Medical equipment
              </small>
            </div>

          </Link>

          {/* TOTAL ORDERS */}
          <Link
            to="/admin/orders"
            className="admin-stat-card admin-stat-link"
          >

            <div className="admin-stat-icon">
              <FaShoppingCart />
            </div>

            <div>
              <span>Total Orders</span>

              <strong>
                {loading
                  ? "..."
                  : stats.totalOrders}
              </strong>

              <small>
                Customer orders
              </small>
            </div>

          </Link>

        </section>

        {/* MANAGEMENT */}
        <section className="admin-management">

          <div className="admin-section-heading">

            <span>
              MANAGEMENT
            </span>

            <h2>
              Marketplace Management
            </h2>

            <p>
              Manage products, orders and
              marketplace information.
            </p>

          </div>

          <div className="dashboard-grid">

            {/* MANAGE PRODUCTS */}
            <Link
              to="/admin/products"
              className="dashboard-card"
            >

              <div className="dashboard-card-icon">
                <FaBoxOpen />
              </div>

              <div className="dashboard-card-content">

                <h2>
                  Manage Products
                </h2>

                <p>
                  View, edit and delete your
                  medical equipment products.
                </p>

              </div>

              <FaArrowRight className="dashboard-arrow" />

            </Link>

            {/* ADD PRODUCT */}
            <Link
              to="/admin/add-product"
              className="dashboard-card"
            >

              <div className="dashboard-card-icon">
                <FaPlusCircle />
              </div>

              <div className="dashboard-card-content">

                <h2>
                  Add Product
                </h2>

                <p>
                  Add new medical equipment
                  to your marketplace.
                </p>

              </div>

              <FaArrowRight className="dashboard-arrow" />

            </Link>

            {/* MANAGE ORDERS */}
            <Link
              to="/admin/orders"
              className="dashboard-card"
            >

              <div className="dashboard-card-icon">
                <FaShoppingCart />
              </div>

              <div className="dashboard-card-content">

                <h2>
                  Manage Orders
                </h2>

                <p>
                  See who ordered your products
                  and manage delivery status.
                </p>

              </div>

              <FaArrowRight className="dashboard-arrow" />

            </Link>

            {/* ADMIN PROFILE */}
            <Link
              to="/profile"
              className="dashboard-card"
            >

              <div className="dashboard-card-icon">
                <FaUsers />
              </div>

              <div className="dashboard-card-content">

                <h2>
                  Admin Profile
                </h2>

                <p>
                  View and manage your admin
                  account information.
                </p>

              </div>

              <FaArrowRight className="dashboard-arrow" />

            </Link>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default AdminDashboard;
