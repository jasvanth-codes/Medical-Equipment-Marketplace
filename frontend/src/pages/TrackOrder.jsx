import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import {
  FaArrowLeft,
  FaCheckCircle,
  FaBoxOpen,
  FaTruck,
  FaMapMarkerAlt,
  FaHome,
  FaClock,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./TrackOrder.css";

function TrackOrder() {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please login to track your order.");
          setLoading(false);
          return;
        }

        console.log("TRACK ORDER ID:", orderId);
        console.log("TOKEN EXISTS:", !!token);

        const response = await axios.get(
          `https://medical-equipment-marketplace.onrender.com/api/orders/order/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("TRACK ORDER RESPONSE:", response.data);

        if (response.data && response.data.order) {
          setOrder(response.data.order);
        } else {
          setError("Order not found");
        }
      } catch (err) {
        console.error("TRACK ORDER ERROR:", err);

        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("role");

          setError("Your login session has expired. Please login again.");
        } else {
          setError(
            err.response?.data?.message || "Unable to load order"
          );
        }
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      getOrder();
    } else {
      setLoading(false);
      setError("Order ID is missing");
    }
  }, [orderId]);

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="track-order-page">
          <div className="track-not-found">
            <FaClock />

            <h2>Loading Order...</h2>

            <p>Please wait while we load your order.</p>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Navbar />

        <main className="track-order-page">
          <div className="track-not-found">
            <FaBoxOpen />

            <h2>Order Not Found</h2>

            <p>{error || "We could not find this order."}</p>

            <button onClick={() => navigate("/orders")}>
              Back to My Orders
            </button>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  const status = order.status || "Confirmed";

  const steps = [
    {
      title: "Order Confirmed",
      description: "Your order has been confirmed.",
      status: "Confirmed",
      icon: <FaCheckCircle />,
    },
    {
      title: "Processing",
      description: "Your medical equipment is being prepared.",
      status: "Processing",
      icon: <FaBoxOpen />,
    },
    {
      title: "Shipped",
      description: "Your order has been shipped.",
      status: "Shipped",
      icon: <FaTruck />,
    },
    {
      title: "Out for Delivery",
      description: "Your order is on the way.",
      status: "Out for Delivery",
      icon: <FaMapMarkerAlt />,
    },
    {
      title: "Delivered",
      description: "Your order has been delivered successfully.",
      status: "Delivered",
      icon: <FaHome />,
    },
  ];

  const currentStep = steps.findIndex(
    (step) => step.status === status
  );

  const orderDate = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Date not available";

  const total = Number(order.total || 0);

  const itemsCount = (order.items || []).reduce(
    (totalItems, item) =>
      totalItems + Number(item.quantity || 1),
    0
  );

  return (
    <>
      <Navbar />

      <main className="track-order-page">
        <div className="track-order-container">

          <button
            className="track-back-btn"
            onClick={() =>
              navigate(`/order-details/${order.orderId}`)
            }
          >
            <FaArrowLeft />
            Back to Order Details
          </button>

          <section className="track-hero">
            <div>
              <span>TRACKING ORDER</span>

              <h1>{order.orderId}</h1>

              <p>
                Track the current progress of your order.
              </p>
            </div>

            <div className="track-current-status">
              <FaClock />

              <span>{status}</span>
            </div>
          </section>

          {status === "Cancelled" ? (
            <section className="track-cancelled">
              <FaClock />

              <div>
                <h2>Order Cancelled</h2>

                <p>
                  This order has been cancelled and will not be
                  delivered.
                </p>
              </div>
            </section>
          ) : (
            <section className="tracking-card">

              <div className="tracking-card-header">
                <div>
                  <h2>Order Status</h2>

                  <p>
                    Follow the progress of your delivery.
                  </p>
                </div>

                <span className="tracking-order-date">
                  Ordered on {orderDate}
                </span>
              </div>

              <div className="tracking-timeline">

                {steps.map((step, index) => {
                  const isCompleted =
                    currentStep >= 0 &&
                    index <= currentStep;

                  const isCurrent =
                    index === currentStep;

                  return (
                    <div
                      key={step.status}
                      className={
                        "tracking-step" +
                        (isCompleted ? " completed" : "") +
                        (isCurrent ? " current" : "")
                      }
                    >

                      <div className="tracking-icon">
                        {step.icon}
                      </div>

                      <div className="tracking-content">
                        <h3>{step.title}</h3>

                        <p>{step.description}</p>

                        {isCurrent && (
                          <span className="current-status-label">
                            Current Status
                          </span>
                        )}
                      </div>

                    </div>
                  );
                })}

              </div>

            </section>
          )}

          <section className="track-summary">

            <div className="track-summary-item">
              <span>Order Total</span>

              <strong>
                {"\u20B9"}
                {total.toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="track-summary-item">
              <span>Payment</span>

              <strong>
                {order.paymentMethod || "Cash on Delivery"}
              </strong>
            </div>

            <div className="track-summary-item">
              <span>Items</span>

              <strong>
                {itemsCount} Product
                {itemsCount !== 1 ? "s" : ""}
              </strong>
            </div>

          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}

export default TrackOrder;

