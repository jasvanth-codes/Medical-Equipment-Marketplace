import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaBox,
  FaMapMarkerAlt,
  FaCreditCard,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../utils/api";

import "./OrderDetails.css";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await API.get(`/orders/id/${id}`);

        if (response.data?.order) {
          setOrder(response.data.order);
        } else {
          setError("Order details could not be found.");
        }
      } catch (err) {
        console.error("Order details error:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load order details."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    } else {
      setLoading(false);
      setError("Invalid order ID.");
    }
  }, [id]);

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusClass = (status) => {
    if (!status) return "confirmed";

    return status
      .toLowerCase()
      .replace(/\s+/g, "-");
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="order-details-page">
          <div className="order-details-container">
            <div className="order-loading">
              <div className="loading-spinner"></div>

              <h3>Loading order details...</h3>

              <p>
                Please wait while we fetch your order information.
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  if (error || !order) {
    return (
      <>
        <Navbar />

        <main className="order-details-page">
          <div className="order-details-container">
            <div className="order-error">
              <FaTimesCircle className="error-icon" />

              <h2>Unable to Load Order</h2>

              <p>{error || "Order not found."}</p>

              <button
                type="button"
                className="back-button"
                onClick={() => navigate("/admin/orders")}
              >
                <FaArrowLeft />
                Back to Orders
              </button>
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  const customer = order.customer || {};
  const items = order.items || [];
  const status = order.status || "Confirmed";

  const totalItems = items.reduce(
    (total, item) => total + Number(item.quantity || 1),
    0
  );

  return (
    <>
      <Navbar />

      <main className="order-details-page">
        <div className="order-details-container">

          <button
            type="button"
            className="order-back-button"
            onClick={() => navigate("/admin/orders")}
          >
            <FaArrowLeft />
            Back to Orders
          </button>

          <section className="order-details-header">
            <div>
              <span className="section-label">
                ORDER DETAILS
              </span>

              <h1>
                {order.orderId || "Order"}
              </h1>

              <p>
                Ordered on{" "}
                <strong>
                  {formatDate(order.createdAt)}
                </strong>
              </p>
            </div>

            <div
              className={`order-status-badge ${getStatusClass(status)}`}
            >
              {status === "Cancelled" ? (
                <FaTimesCircle />
              ) : (
                <FaCheckCircle />
              )}

              {status}
            </div>
          </section>

          <section className="order-details-card">
            <div className="order-details-card-header">
              <div className="order-details-card-icon">
                <FaMapMarkerAlt />
              </div>

              <div>
                <span className="section-label">
                  CUSTOMER DETAILS
                </span>

                <h2>Customer Information</h2>
              </div>
            </div>

            <div className="customer-details-grid">

              <div className="customer-detail-item">
                <span>Customer Name</span>

                <strong>
                  {customer.fullName ||
                    customer.name ||
                    "N/A"}
                </strong>
              </div>

              <div className="customer-detail-item">
                <span>Email</span>

                <strong>
                  {customer.email || "N/A"}
                </strong>
              </div>

              <div className="customer-detail-item">
                <span>Phone</span>

                <strong>
                  {customer.phone || "N/A"}
                </strong>
              </div>

              <div className="customer-detail-item">
                <span>Delivery Address</span>

                <strong>
                  {customer.address || "N/A"}
                </strong>
              </div>

              <div className="customer-detail-item">
                <span>City</span>

                <strong>
                  {customer.city || "N/A"}
                </strong>
              </div>

              <div className="customer-detail-item">
                <span>State</span>

                <strong>
                  {customer.state || "N/A"}
                </strong>
              </div>

              <div className="customer-detail-item">
                <span>PIN Code</span>

                <strong>
                  {customer.pincode ||
                    customer.pinCode ||
                    "N/A"}
                </strong>
              </div>

            </div>
          </section>

          <section className="order-details-card">

            <div className="order-details-card-header">
              <div className="order-details-card-icon">
                <FaBox />
              </div>

              <div>
                <span className="section-label">
                  PRODUCTS ORDERED
                </span>

                <h2>Order Items</h2>
              </div>
            </div>

            <div className="order-items-list">

              {items.length > 0 ? (
                items.map((item, index) => {
                  const quantity =
                    Number(item.quantity || 1);

                  const price =
                    Number(item.price || 0);

                  const itemTotal =
                    price * quantity;

                  return (
                    <div
                      className="order-item"
                      key={item._id || index}
                    >

                      <div className="order-item-image">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={
                              item.name ||
                              "Medical Equipment"
                            }
                            onError={(event) => {
                              event.currentTarget.style.display =
                                "none";
                            }}
                          />
                        ) : (
                          <FaBox />
                        )}
                      </div>

                      <div className="order-item-info">
                        <h3>
                          {item.name ||
                            item.productName ||
                            "Medical Equipment"}
                        </h3>

                        <p>
                          Quantity:{" "}
                          <strong>
                            {quantity}
                          </strong>
                        </p>
                      </div>

                      <div className="order-item-price">
                        <span>
                          ₹{price.toLocaleString("en-IN")}
                        </span>

                        <strong>
                          ₹{itemTotal.toLocaleString("en-IN")}
                        </strong>
                      </div>

                    </div>
                  );
                })
              ) : (
                <p className="no-order-items">
                  No products found for this order.
                </p>
              )}

            </div>

            <div className="order-summary">

              <div>
                <span>Total Items</span>

                <strong>
                  {totalItems}
                </strong>
              </div>

              <div>
                <span>Total Amount</span>

                <strong className="order-total-amount">
                  ₹
                  {Number(
                    order.total || 0
                  ).toLocaleString("en-IN")}
                </strong>
              </div>

            </div>
          </section>

          <section className="order-details-card">

            <div className="order-details-card-header">
              <div className="order-details-card-icon">
                <FaCreditCard />
              </div>

              <div>
                <span className="section-label">
                  PAYMENT
                </span>

                <h2>Payment Information</h2>
              </div>
            </div>

            <div className="payment-information">

              <div>
                <span>Payment Method</span>

                <strong>
                  {order.paymentMethod ||
                    order.paymentType ||
                    "Cash on Delivery"}
                </strong>
              </div>

              <div>
                <span>Payment Status</span>

                <strong>
                  {order.paymentStatus ||
                    "Pending"}
                </strong>
              </div>

            </div>
          </section>

          <div className="order-details-actions">

            <button
              type="button"
              className="secondary-action-button"
              onClick={() =>
                navigate(`/orders/${order._id}/track`)
              }
            >
              <FaTruck />
              Track Order
            </button>

            <button
              type="button"
              className="primary-action-button"
              onClick={() =>
                navigate("/admin/orders")
              }
            >
              <FaArrowLeft />
              Back to Manage Orders
            </button>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}

export default OrderDetails;
