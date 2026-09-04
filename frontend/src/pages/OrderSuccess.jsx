import { useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaBoxOpen,
  FaTruck,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./OrderSuccess.css";

function OrderSuccess() {
  const navigate = useNavigate();

  const orderId =
    sessionStorage.getItem("lastOrderId") ||
    localStorage.getItem("lastOrderId") ||
    "Your Order";

  return (
    <>
      <Navbar />

      <main className="order-success-page">

        {/* SUCCESS ICON */}

        <div className="success-icon">
          <FaCheckCircle />
        </div>

        {/* TITLE */}

        <h1>Order Placed Successfully!</h1>

        <p className="success-message">
          Thank you for your order. Your medical equipment
          order has been confirmed successfully.
        </p>

        {/* ORDER ID */}

        <div className="order-id-card">
          <span>Order ID</span>
          <strong>{orderId}</strong>
        </div>

        {/* ORDER STATUS */}

        <div className="success-info-card">

          <div className="info-icon">
            <FaBoxOpen />
          </div>

          <div>
            <h3>Order Confirmed</h3>

            <p>
              Your order has been received and is being
              prepared for delivery.
            </p>
          </div>

        </div>

        {/* DELIVERY */}

        <div className="success-info-card">

          <div className="info-icon">
            <FaTruck />
          </div>

          <div>
            <h3>Estimated Delivery</h3>

            <p>
              Your order will be delivered within{" "}
              <strong>3–5 business days</strong>.
            </p>
          </div>

        </div>

        {/* BUTTON */}

        <button
          className="continue-shopping-btn"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>

      </main>

      <Footer />
    </>
  );
}

export default OrderSuccess;