import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaBoxOpen,
  FaEye,
  FaTimesCircle,
  FaCheckCircle,
  FaTruck,
  FaClock,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { AuthContext } from "../context/AuthContext";
import { getUserOrders, cancelOrder } from "../services/orderService";

import "./Orders.css";

function Orders() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?._id) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const data = await getUserOrders(user._id);

      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <FaCheckCircle />;

      case "Shipped":
      case "Out for Delivery":
        return <FaTruck />;

      case "Cancelled":
        return <FaTimesCircle />;

      case "Processing":
        return <FaClock />;

      default:
        return <FaBoxOpen />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered":
        return "status-delivered";

      case "Cancelled":
        return "status-cancelled";

      case "Processing":
        return "status-processing";

      case "Shipped":
      case "Out for Delivery":
        return "status-shipped";

      default:
        return "status-confirmed";
    }
  };

  const handleViewOrder = (id) => {
    navigate(`/orders/${id}`);
  };

  const handleCancelOrder = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) return;

    try {
      await cancelOrder(id);

      alert("Order cancelled successfully.");

      fetchOrders();
    } catch (error) {
      console.error("Cancel order error:", error);

      alert(
        error.response?.data?.message ||
          "Something went wrong while cancelling the order."
      );
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="orders-page">
          <div className="orders-loading">
            <div className="orders-spinner"></div>

            <h2>Loading Your Orders...</h2>

            <p>
              Please wait while we retrieve your orders.
            </p>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="orders-page">

        <button
          className="back-home-btn"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft />
          Back to Home
        </button>

        <div className="orders-header">

          <div className="orders-header-icon">
            <FaBoxOpen />
          </div>

          <div>
            <h1>My Orders</h1>

            <p>
              View and manage your medical equipment orders.
            </p>
          </div>

        </div>

        {user && (
          <div className="orders-user">
            <span>Hi, {user.name || "User"}</span>
          </div>
        )}

        {orders.length === 0 ? (
          <section className="empty-orders">

            <div className="empty-orders-icon">
              <FaBoxOpen />
            </div>

            <h2>No Orders Yet</h2>

            <p>
              You haven't placed any medical equipment
              orders yet.
            </p>

            <button
              className="shop-orders-btn"
              onClick={() => navigate("/products")}
            >
              Start Shopping
            </button>

          </section>
        ) : (
          <>
            <div className="orders-count">
              <strong>{orders.length}</strong>

              <span>
                {orders.length === 1 ? "Order" : "Orders"}
              </span>
            </div>

            <div className="orders-list">

              {orders.map((order) => (

                <article
                  className="order-card"
                  key={order._id}
                >

                  <div className="order-card-header">

                    <div className="order-basic">

                      <span className="order-label">
                        Order ID
                      </span>

                      <strong>
                        {order.orderId || order._id}
                      </strong>

                    </div>

                    <div
                      className={`order-status ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}

                      <span>
                        {order.status || "Confirmed"}
                      </span>
                    </div>

                  </div>

                  <div className="order-meta">

                    <div>
                      <span>Items</span>

                      <strong>
                        {order.items?.length || 0}{" "}
                        {order.items?.length === 1
                          ? "product"
                          : "products"}
                      </strong>
                    </div>

                    <div>
                      <span>Ordered On</span>

                      <strong>
                        {formatDate(
                          order.createdAt ||
                            order.orderDate
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>Payment</span>

                      <strong>
                        {order.paymentMethod ||
                          "Cash on Delivery"}
                      </strong>
                    </div>

                  </div>

                  <div className="order-items">

                    <h3>Order Items</h3>

                    {order.items?.map((item, index) => {

                      const product =
                        item.product || item;

                      return (
                        <div
                          className="order-item"
                          key={
                            item._id ||
                            product._id ||
                            index
                          }
                        >

                          <img
                            src={
                              product.image ||
                              "https://via.placeholder.com/100x100?text=Medical"
                            }
                            alt={
                              product.name ||
                              "Medical Equipment"
                            }
                          />

                          <div className="order-item-info">

                            <h4>
                              {product.name ||
                                "Medical Equipment"}
                            </h4>

                            <span>
                              {product.category ||
                                "Medical Equipment"}
                            </span>

                            <p>
                              Qty: {item.quantity || 1}
                            </p>

                          </div>

                          <strong className="order-item-price">
                            ₹
                            {Number(
                              product.price ||
                                item.price ||
                                0
                            ).toLocaleString("en-IN")}
                          </strong>

                        </div>
                      );
                    })}

                  </div>

                  <div className="order-card-footer">

                    <div className="order-total">

                      <span>Total</span>

                      <strong>
                        ₹
                        {Number(
                          order.totalPrice ||
                            order.total ||
                            0
                        ).toLocaleString("en-IN")}
                      </strong>

                    </div>

                    <div className="order-actions">

                      <button
                        className="view-order-btn"
                        onClick={() =>
                          handleViewOrder(order._id)
                        }
                      >
                        <FaEye />
                        View Order
                      </button>

                      {order.status !== "Delivered" &&
                        order.status !== "Cancelled" && (
                          <button
                            className="cancel-order-btn"
                            onClick={() =>
                              handleCancelOrder(order._id)
                            }
                          >
                            <FaTimesCircle />
                            Cancel Order
                          </button>
                        )}

                    </div>

                  </div>

                </article>

              ))}

            </div>
          </>
        )}

      </main>

      <Footer />
    </>
  );
}

export default Orders;
