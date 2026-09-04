import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  FaArrowLeft,
  FaBox,
  FaCheckCircle,
  FaClock,
  FaTruck,
  FaMapMarkerAlt,
  FaTimesCircle,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../utils/api";

import "./OrderDetails.css";

function TrackOrder() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================
  // FETCH ORDER
  // ============================
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("Tracking order:", id);

        const response = await API.get(`/orders/id/${id}`);

        console.log("TRACK ORDER RESPONSE:", response.data);

        if (response.data?.success && response.data?.order) {
          setOrder(response.data.order);
        } else if (response.data?.order) {
          setOrder(response.data.order);
        } else {
          setError("Order details could not be found.");
        }
      } catch (err) {
        console.error("Track order error:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load tracking information."
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

  // ============================
  // ORDER STATUSES
  // ============================
  const statuses = [
    {
      name: "Confirmed",
      icon: <FaCheckCircle />,
      description: "Your order has been confirmed",
    },
    {
      name: "Processing",
      icon: <FaBox />,
      description: "Your order is being prepared",
    },
    {
      name: "Shipped",
      icon: <FaTruck />,
      description: "Your order has left our facility",
    },
    {
      name: "Out for Delivery",
      icon: <FaMapMarkerAlt />,
      description: "Your order is on the way",
    },
    {
      name: "Delivered",
      icon: <FaCheckCircle />,
      description: "Your order has been delivered",
    },
  ];

  // ============================
  // GET CURRENT STATUS INDEX
  // ============================
  const getStatusIndex = (status) => {
    return statuses.findIndex(
      (item) => item.name === status
    );
  };

  // ============================
  // LOADING
  // ============================
  if (loading) {
    return (
      <>
        <Navbar />

        <main className="order-details-page">
          <div className="order-details-container">
            <div className="order-loading">
              <div className="loading-spinner"></div>

              <h3>
                Loading tracking information...
              </h3>

              <p>
                Please wait while we fetch your order
                details.
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  // ============================
  // ERROR
  // ============================
  if (error || !order) {
    return (
      <>
        <Navbar />

        <main className="order-details-page">
          <div className="order-details-container">
            <div className="order-error">
              <FaTimesCircle className="error-icon" />

              <h2>Unable to Track Order</h2>

              <p>
                {error || "Order not found."}
              </p>

              <button
                className="back-button"
                onClick={() => navigate("/orders")}
              >
                <FaArrowLeft />
                Back to My Orders
              </button>
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  // ============================
  // ORDER DATA
  // ============================
  const currentStatus = order.status || "Confirmed";

  const currentIndex =
    getStatusIndex(currentStatus);

  const customer = order.customer || {};

  // ============================
  // ORDER DATE
  // ============================
  const orderDate = order.createdAt
    ? new Date(
        order.createdAt
      ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A";

  // ============================
  // EXPECTED DELIVERY
  // ============================
  const expectedDelivery = order.createdAt
    ? new Date(
        new Date(order.createdAt).getTime() +
          5 * 24 * 60 * 60 * 1000
      ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A";

  // ============================
  // TOTAL ITEMS
  // ============================
  const totalItems =
    order.items?.reduce(
      (total, item) =>
        total + Number(item.quantity || 1),
      0
    ) || 0;

  return (
    <>
      <Navbar />

      <main className="order-details-page">
        <div className="order-details-container">

          {/* ==================================
              BACK BUTTON
          ================================== */}
          <button
            className="order-back-button"
            onClick={() =>
              navigate(`/orders/${order._id}`)
            }
          >
            <FaArrowLeft />
            Back to Order Details
          </button>

          {/* ==================================
              HEADER
          ================================== */}
          <div className="tracking-header">

            <div className="tracking-header-content">
              <span className="tracking-label">
                ORDER TRACKING
              </span>

              <h1>Track Your Order</h1>

              <p>
                Order ID:{" "}
                <strong>
                  {order.orderId || order._id}
                </strong>
              </p>
            </div>

            <div className="current-status">
              <span>Current Status</span>

              <strong>
                {currentStatus}
              </strong>
            </div>

          </div>

          {/* ==================================
              ORDER INFORMATION
          ================================== */}
          <div className="tracking-info-grid">

            {/* Order Date */}
            <div className="tracking-info-card">

              <div className="tracking-info-icon">
                <FaClock />
              </div>

              <div>
                <span>Order Date</span>

                <strong>
                  {orderDate}
                </strong>
              </div>

            </div>

            {/* Delivery */}
            <div className="tracking-info-card">

              <div className="tracking-info-icon">
                <FaTruck />
              </div>

              <div>
                <span>Expected Delivery</span>

                <strong>
                  {expectedDelivery}
                </strong>
              </div>

            </div>

            {/* Items */}
            <div className="tracking-info-card">

              <div className="tracking-info-icon">
                <FaBox />
              </div>

              <div>
                <span>Items</span>

                <strong>
                  {totalItems}
                </strong>
              </div>

            </div>

            {/* City */}
            <div className="tracking-info-card">

              <div className="tracking-info-icon">
                <FaMapMarkerAlt />
              </div>

              <div>
                <span>Delivery City</span>

                <strong>
                  {customer.city || "N/A"}
                </strong>
              </div>

            </div>

          </div>

          {/* ==================================
              CANCELLED ORDER
          ================================== */}
          {currentStatus === "Cancelled" ? (

            <div className="cancelled-order-card">

              <FaTimesCircle />

              <div>
                <h2>
                  Order Cancelled
                </h2>

                <p>
                  This order has been cancelled and
                  will not be delivered.
                </p>
              </div>

            </div>

          ) : (

            /* ==================================
               TRACKING TIMELINE
            ================================== */
            <section className="tracking-card">

              <div className="tracking-card-header">

                <div>
                  <span className="section-label">
                    DELIVERY JOURNEY
                  </span>

                  <h2>
                    Order Status
                  </h2>
                </div>

                <div className="tracking-progress-text">
                  {currentIndex >= 0
                    ? `${currentIndex + 1} of ${statuses.length}`
                    : "1 of 5"}
                </div>

              </div>

              <div className="tracking-timeline">

                {statuses.map(
                  (status, index) => {

                    const isCompleted =
                      currentIndex >= index;

                    const isCurrent =
                      currentIndex === index;

                    return (
                      <div
                        className={`tracking-step ${
                          isCompleted
                            ? "completed"
                            : ""
                        } ${
                          isCurrent
                            ? "current"
                            : ""
                        }`}
                        key={status.name}
                      >

                        {/* Icon */}
                        <div className="tracking-step-icon">
                          {status.icon}
                        </div>

                        {/* Content */}
                        <div className="tracking-step-content">

                          <h3>
                            {status.name}
                          </h3>

                          <p>
                            {status.description}
                          </p>

                          {isCurrent && (
                            <span className="status-current-badge">
                              Current Status
                            </span>
                          )}

                        </div>

                        {/* Connecting Line */}
                        {index <
                          statuses.length - 1 && (
                          <div
                            className={`tracking-line ${
                              currentIndex > index
                                ? "completed"
                                : ""
                            }`}
                          ></div>
                        )}

                      </div>
                    );
                  }
                )}

              </div>

            </section>
          )}

          {/* ==================================
              DELIVERY ADDRESS
          ================================== */}
          <section className="delivery-address-card">

            <div className="delivery-address-header">

              <div className="delivery-address-icon">
                <FaMapMarkerAlt />
              </div>

              <div>

                <span className="section-label">
                  DELIVERY ADDRESS
                </span>

                <h2>
                  Delivering To
                </h2>

              </div>

            </div>

            <div className="delivery-address-content">

              <h3>
                {customer.fullName ||
                  customer.name ||
                  "Customer"}
              </h3>

              {customer.address && (
                <p>
                  {customer.address}
                </p>
              )}

              <p>
                {customer.city &&
                  `${customer.city}, `}

                {customer.state &&
                  `${customer.state} - `}

                {customer.pincode}
              </p>

              {customer.phone && (
                <p className="customer-phone">
                  Phone: {customer.phone}
                </p>
              )}

            </div>

          </section>

          {/* ==================================
              PRODUCTS
          ================================== */}
          {order.items &&
            order.items.length > 0 && (

              <section className="tracking-products-card">

                <div className="tracking-card-header">

                  <div>
                    <span className="section-label">
                      ORDER ITEMS
                    </span>

                    <h2>
                      Products in This Order
                    </h2>
                  </div>

                </div>

                <div className="tracking-products-list">

                  {order.items.map(
                    (item, index) => (

                      <div
                        className="tracking-product"
                        key={
                          item._id || index
                        }
                      >

                        {/* Product Image */}
                        <div className="tracking-product-image">

                          {item.image ? (

                            <img
                              src={item.image}
                              alt={
                                item.name ||
                                "Medical Equipment"
                              }
                            />

                          ) : (

                            <FaBox />

                          )}

                        </div>

                        {/* Product Details */}
                        <div className="tracking-product-details">

                          <h3>
                            {item.name ||
                              item.productName ||
                              "Medical Equipment"}
                          </h3>

                          <p>
                            Quantity:{" "}
                            {item.quantity || 1}
                          </p>

                        </div>

                        {/* Product Price */}
                        <strong className="tracking-product-price">

                          ₹
                          {(
                            Number(
                              item.price || 0
                            ) *
                            Number(
                              item.quantity || 1
                            )
                          ).toLocaleString(
                            "en-IN"
                          )}

                        </strong>

                      </div>
                    )
                  )}

                </div>

                {/* Total */}
                <div className="tracking-total">

                  <span>
                    Total Amount
                  </span>

                  <strong>
                    ₹
                    {Number(
                      order.total || 0
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                </div>

              </section>
            )}

          {/* ==================================
              ACTION BUTTONS
          ================================== */}
          <div className="tracking-actions">

            <button
              className="secondary-action-button"
              onClick={() =>
                navigate(
                  `/orders/${order._id}`
                )
              }
            >
              <FaArrowLeft />
              Order Details
            </button>

            <button
              className="primary-action-button"
              onClick={() =>
                navigate("/products")
              }
            >
              Continue Shopping
            </button>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}

export default TrackOrder;