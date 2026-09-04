import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaUsers,
  FaBoxOpen,
  FaShoppingBag,
  FaRupeeSign,
  FaClipboardCheck,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaArrowRight,
  FaSync,
} from "react-icons/fa";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import API from "../../utils/api";

import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [statistics, setStatistics] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    confirmedOrders: 0,
    processingOrders: 0,
    shippedOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
    totalSales: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const response = await API.get("/admin/dashboard");

      console.log("ADMIN DASHBOARD:", response.data);

      if (response.data.success) {
        setStatistics(response.data.statistics || {});
        setRecentOrders(response.data.recentOrders || []);
      }
    } catch (error) {
      console.error(
        "ADMIN DASHBOARD ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to load admin dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatMoney = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <FaCheckCircle />;

      case "Cancelled":
        return <FaTimesCircle />;

      case "Shipped":
      case "Out for Delivery":
        return <FaTruck />;

      case "Processing":
        return <FaBoxOpen />;

      default:
        return <FaClock />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered":
        return "dashboard-status-delivered";

      case "Cancelled":
        return "dashboard-status-cancelled";

      case "Shipped":
      case "Out for Delivery":
        return "dashboard-status-shipped";

      case "Processing":
        return "dashboard-status-processing";

      default:
        return "dashboard-status-confirmed";
    }
  };

  const percentage = (value) => {
    if (!statistics.totalOrders) return 0;

    return Math.round(
      (value / statistics.totalOrders) * 100
    );
  };

  return (
    <>
      <Navbar />

      <main className="admin-dashboard-page">
        <div className="admin-dashboard-container">

          {/* HEADER */}

          <div className="admin-dashboard-header">
            <div>
              <span className="admin-dashboard-label">
                ADMIN PANEL
              </span>

              <h1>Dashboard</h1>

              <p>
                Monitor users, products, orders and marketplace
                revenue.
              </p>
            </div>

            <div className="admin-header-actions">

              <button
                className="admin-refresh-btn"
                onClick={fetchDashboard}
                disabled={loading}
              >
                <FaSync className={loading ? "spin" : ""} />

                {loading ? "Loading..." : "Refresh"}
              </button>

              <button
                className="manage-orders-header-btn"
                onClick={() => navigate("/admin/orders")}
              >
                <FaClipboardCheck />
                Manage Orders
              </button>

            </div>
          </div>

          {/* STATISTICS */}

          <div className="admin-stats-grid">

            <div
              className="admin-stat-card"
              onClick={() => navigate("/admin/users")}
            >
              <div className="admin-stat-icon">
                <FaUsers />
              </div>

              <div>
                <span>Total Users</span>

                <h2>
                  {loading ? "..." : statistics.totalUsers}
                </h2>

                <small>Registered customers</small>
              </div>
            </div>

            <div
              className="admin-stat-card"
              onClick={() => navigate("/admin/products")}
            >
              <div className="admin-stat-icon">
                <FaBoxOpen />
              </div>

              <div>
                <span>Total Products</span>

                <h2>
                  {loading ? "..." : statistics.totalProducts}
                </h2>

                <small>Medical equipment</small>
              </div>
            </div>

            <div
              className="admin-stat-card"
              onClick={() => navigate("/admin/orders")}
            >
              <div className="admin-stat-icon">
                <FaShoppingBag />
              </div>

              <div>
                <span>Total Orders</span>

                <h2>
                  {loading ? "..." : statistics.totalOrders}
                </h2>

                <small>Customer orders</small>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon">
                <FaRupeeSign />
              </div>

              <div>
                <span>Total Sales</span>

                <h2>
                  {loading
                    ? "..."
                    : formatMoney(statistics.totalSales)}
                </h2>

                <small>Non-cancelled orders</small>
              </div>
            </div>

          </div>

          {/* MAIN CONTENT */}

          <div className="admin-dashboard-grid">

            {/* RECENT ORDERS */}

            <section className="recent-orders-section">

              <div className="section-header">
                <div>
                  <h2>Recent Orders</h2>
                  <p>Latest customer orders</p>
                </div>

                <button
                  onClick={() => navigate("/admin/orders")}
                >
                  View All
                  <FaArrowRight />
                </button>
              </div>

              {loading ? (

                <div className="dashboard-empty">
                  <FaSync className="loading-icon spin" />
                  <h3>Loading orders...</h3>
                </div>

              ) : recentOrders.length === 0 ? (

                <div className="dashboard-empty">
                  <FaBoxOpen />
                  <h3>No Orders Yet</h3>

                  <p>
                    Customer orders will appear here.
                  </p>
                </div>

              ) : (

                <div className="recent-orders-list">

                  {recentOrders.map((order) => {

                    const status =
                      order.status || "Confirmed";

                    const customerName =
                      order.customer?.fullName ||
                      "Customer";

                    return (
                      <div
                        className="recent-order-card"
                        key={order._id}
                        onClick={() =>
                          navigate(
                            `/order-details/${order.orderId}`
                          )
                        }
                      >

                        <div className="recent-order-avatar">
                          {customerName
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div className="recent-order-info">

                          <span>
                            {order.orderId}
                          </span>

                          <strong>
                            {customerName}
                          </strong>

                          <small>
                            {formatDate(order.createdAt)}
                          </small>

                        </div>

                        <div className="recent-order-right">

                          <strong>
                            {formatMoney(order.total)}
                          </strong>

                          <div
                            className={`recent-order-status ${getStatusClass(
                              status
                            )}`}
                          >
                            {getStatusIcon(status)}

                            <span>
                              {status}
                            </span>
                          </div>

                        </div>

                      </div>
                    );
                  })}

                </div>
              )}

            </section>

            {/* ORDER OVERVIEW */}

            <aside className="order-overview-card">

              <div className="overview-header">

                <div>
                  <h2>Order Overview</h2>
                  <p>Current order status</p>
                </div>

                <FaShoppingBag />

              </div>

              <div className="overview-item">

                <div>
                  <span>Confirmed</span>

                  <strong>
                    {statistics.confirmedOrders || 0}
                  </strong>
                </div>

                <div className="overview-progress">
                  <span
                    style={{
                      width: `${percentage(
                        statistics.confirmedOrders
                      )}%`,
                    }}
                  />
                </div>

              </div>

              <div className="overview-item">

                <div>
                  <span>Processing</span>

                  <strong>
                    {statistics.processingOrders || 0}
                  </strong>
                </div>

                <div className="overview-progress">
                  <span
                    style={{
                      width: `${percentage(
                        statistics.processingOrders
                      )}%`,
                    }}
                  />
                </div>

              </div>

              <div className="overview-item">

                <div>
                  <span>In Delivery</span>

                  <strong>
                    {statistics.shippedOrders || 0}
                  </strong>
                </div>

                <div className="overview-progress">
                  <span
                    style={{
                      width: `${percentage(
                        statistics.shippedOrders
                      )}%`,
                    }}
                  />
                </div>

              </div>

              <div className="overview-item">

                <div>
                  <span>Delivered</span>

                  <strong>
                    {statistics.deliveredOrders || 0}
                  </strong>
                </div>

                <div className="overview-progress">
                  <span
                    style={{
                      width: `${percentage(
                        statistics.deliveredOrders
                      )}%`,
                    }}
                  />
                </div>

              </div>

              <div className="overview-item">

                <div>
                  <span>Cancelled</span>

                  <strong>
                    {statistics.cancelledOrders || 0}
                  </strong>
                </div>

                <div className="overview-progress">
                  <span
                    style={{
                      width: `${percentage(
                        statistics.cancelledOrders
                      )}%`,
                    }}
                  />
                </div>

              </div>

              <button
                className="view-all-orders-btn"
                onClick={() => navigate("/admin/orders")}
              >
                View All Orders
                <FaArrowRight />
              </button>

            </aside>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}

export default AdminDashboard;
