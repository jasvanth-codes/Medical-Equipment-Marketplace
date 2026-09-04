import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBox,
  FaCheckCircle,
  FaTruck,
  FaRupeeSign,
  FaClipboardList,
  FaArrowRight
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Admin.css";

function Admin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(savedOrders);
  }, []);

  const totalOrders = orders.length;

  const confirmedOrders = orders.filter(
    (order) =>
      order.status === "Confirmed" ||
      !order.status
  ).length;

  const processingOrders = orders.filter(
    (order) =>
      order.status === "Processing" ||
      order.status === "Shipped" ||
      order.status === "Out for Delivery"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.status === "Cancelled"
  ).length;

  const totalRevenue = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce(
      (total, order) =>
        total + Number(order.total || 0),
      0
    );

  const recentOrders = [...orders]
    .reverse()
    .slice(0, 5);

  const getStatusClass = (status) => {
    if (status === "Delivered") {
      return "status-delivered";
    }

    if (status === "Cancelled") {
      return "status-cancelled";
    }

    if (
      status === "Processing" ||
      status === "Shipped" ||
      status === "Out for Delivery"
    ) {
      return "status-processing";
    }

    return "status-confirmed";
  };

  return (
    <>
      <Navbar />

      <main className="admin-page">
        <div className="admin-container">

          <section className="admin-header">
            <div>
              <span className="admin-label">
                ADMIN PANEL
              </span>

              <h1>Admin Dashboard</h1>

              <p>
                Monitor orders, revenue and delivery activity.
              </p>
            </div>

            <Link
              to="/admin/orders"
              className="manage-orders-btn"
            >
              <FaClipboardList />
              Manage Orders
            </Link>
          </section>

          <section className="admin-stats-grid">

            <div className="admin-stat-card">
              <div className="admin-stat-icon blue">
                <FaBox />
              </div>

              <div>
                <span>Total Orders</span>
                <h2>{totalOrders}</h2>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon green">
                <FaCheckCircle />
              </div>

              <div>
                <span>Confirmed</span>
                <h2>{confirmedOrders}</h2>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon orange">
                <FaTruck />
              </div>

              <div>
                <span>In Delivery</span>
                <h2>{processingOrders}</h2>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon purple">
                <FaRupeeSign />
              </div>

              <div>
                <span>Total Revenue</span>
                <h2>
                  ₹{totalRevenue.toLocaleString("en-IN")}
                </h2>
              </div>
            </div>

          </section>

          <section className="admin-content-grid">

            <div className="admin-recent-orders">

              <div className="section-header">
                <div>
                  <h2>Recent Orders</h2>
                  <p>Latest customer orders</p>
                </div>

                <Link to="/admin/orders">
                  View All
                  <FaArrowRight />
                </Link>
              </div>

              {recentOrders.length === 0 ? (
                <div className="admin-empty-state">
                  <FaBox />

                  <h3>No Orders Yet</h3>

                  <p>
                    Customer orders will appear here.
                  </p>
                </div>
              ) : (
                <div className="recent-orders-list">

                  {recentOrders.map((order) => (
                    <div
                      className="recent-order-item"
                      key={order.orderId}
                    >

                      <div className="recent-order-icon">
                        <FaBox />
                      </div>

                      <div className="recent-order-info">
                        <h3>
                          {order.orderId}
                        </h3>

                        <span>
                          {order.customer?.name ||
                            order.customer?.fullName ||
                            order.address?.name ||
                            "Customer"}
                        </span>
                      </div>

                      <div className="recent-order-right">
                        <strong>
                          ₹
                          {Number(
                            order.total || 0
                          ).toLocaleString("en-IN")}
                        </strong>

                        <span
                          className={
                            "order-status-badge " +
                            getStatusClass(
                              order.status || "Confirmed"
                            )
                          }
                        >
                          {order.status || "Confirmed"}
                        </span>
                      </div>

                    </div>
                  ))}

                </div>
              )}

            </div>

            <aside className="admin-order-summary">

              <h2>Order Overview</h2>

              <div className="overview-item">
                <div>
                  <span className="overview-dot confirmed"></span>
                  Confirmed
                </div>

                <strong>
                  {confirmedOrders}
                </strong>
              </div>

              <div className="overview-item">
                <div>
                  <span className="overview-dot processing"></span>
                  In Delivery
                </div>

                <strong>
                  {processingOrders}
                </strong>
              </div>

              <div className="overview-item">
                <div>
                  <span className="overview-dot delivered"></span>
                  Delivered
                </div>

                <strong>
                  {deliveredOrders}
                </strong>
              </div>

              <div className="overview-item">
                <div>
                  <span className="overview-dot cancelled"></span>
                  Cancelled
                </div>

                <strong>
                  {cancelledOrders}
                </strong>
              </div>

              <Link
                to="/admin/orders"
                className="overview-button"
              >
                View All Orders
                <FaArrowRight />
              </Link>

            </aside>

          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}

export default Admin;
