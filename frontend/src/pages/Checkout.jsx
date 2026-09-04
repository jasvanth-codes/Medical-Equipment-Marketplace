import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaShieldAlt,
  FaMoneyBillWave,
  FaCreditCard,
  FaShoppingCart,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { CartContext } from "../context/CartContext";
import API from "../utils/api";

import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const { cartItems = [], clearCart } = useContext(CartContext);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] =
    useState("Cash on Delivery");

  const [loading, setLoading] = useState(false);

  // Load logged-in user information
  useEffect(() => {
    try {
      const savedUser =
        JSON.parse(localStorage.getItem("user")) || {};

      const user = savedUser.user || savedUser;

      setFormData((prev) => ({
        ...prev,
        fullName: user.name || user.fullName || "",
        email: user.email || "",
      }));
    } catch (error) {
      console.error("USER LOAD ERROR:", error);
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  );

  const delivery = 0;
  const total = subtotal + delivery;

  // Place order
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    // Get logged-in user
    let savedUser = {};

    try {
      savedUser =
        JSON.parse(localStorage.getItem("user")) || {};
    } catch (error) {
      console.error("USER DATA ERROR:", error);
    }

    const user = savedUser.user || savedUser;

    const userId =
      user._id ||
      user.id ||
      savedUser._id ||
      savedUser.id;

    // Check login
    if (!userId) {
      alert(
        "User information not found. Please login again."
      );

      navigate("/login");
      return;
    }

    // Check cart
    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty.");
      navigate("/cart");
      return;
    }

    // Check delivery information
    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.state.trim() ||
      !formData.pincode.trim()
    ) {
      alert("Please fill all delivery information.");
      return;
    }

    // Basic phone validation
    if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    // Basic PIN validation
    if (!/^[0-9]{6}$/.test(formData.pincode.trim())) {
      alert("Please enter a valid 6-digit PIN code.");
      return;
    }

    try {
      setLoading(true);

      // Create order data
      const orderData = {
        userId: userId,

        orderId: `MED${Date.now()}`,

        customer: {
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          pincode: formData.pincode.trim(),
        },

        paymentMethod: paymentMethod,

        items: cartItems.map((item) => ({
          productId:
            item.productId ||
            item._id ||
            "",

          name: item.name || "Medical Equipment",

          category:
            item.category ||
            "Medical Equipment",

          price: Number(item.price || 0),

          quantity: Number(item.quantity || 1),

          image: item.image || "",
        })),

        subtotal: subtotal,

        delivery: delivery,

        total: total,
      };

      console.log("ORDER DATA:", orderData);

      // Send order to backend
      const response = await API.post(
        "/orders",
        orderData
      );

      console.log("ORDER RESPONSE:", response.data);

      if (response.data && response.data.success) {
        const createdOrder =
          response.data.order || orderData;

        const createdOrderId =
          createdOrder.orderId ||
          orderData.orderId;

        // Save last order ID
        localStorage.setItem(
          "lastOrderId",
          createdOrderId
        );

        // Save complete order temporarily
        localStorage.setItem(
          "lastOrder",
          JSON.stringify(createdOrder)
        );

        // Clear cart
        if (typeof clearCart === "function") {
          clearCart();
        }

        localStorage.removeItem("cart");

        // Go to success page
        navigate("/order-success", {
          state: {
            order: createdOrder,
            orderId: createdOrderId,
          },
        });
      } else {
        alert(
          response.data?.message ||
            "Order could not be placed."
        );
      }
    } catch (error) {
      console.error(
        "ORDER ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to place order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="checkout-page">
        <div className="checkout-container">

          {/* Back Button */}
          <button
            type="button"
            className="checkout-back-btn"
            onClick={() => navigate("/cart")}
          >
            <FaArrowLeft />
            Back to Cart
          </button>

          {/* Header */}
          <div className="checkout-header">
            <div>
              <h1>Secure Checkout</h1>

              <p>
                Complete your order securely and safely.
              </p>
            </div>

            <div className="secure-checkout">
              <FaShieldAlt />

              <span>
                Secure Checkout
              </span>
            </div>
          </div>

          {/* Empty Cart */}
          {cartItems.length === 0 ? (
            <div className="checkout-empty">

              <FaShoppingCart />

              <h2>Your cart is empty</h2>

              <p>
                Add some medical equipment before
                proceeding to checkout.
              </p>

              <button
                type="button"
                onClick={() => navigate("/products")}
              >
                Continue Shopping
              </button>

            </div>
          ) : (

            <div className="checkout-grid">

              {/* Checkout Form */}
              <form
                className="checkout-form"
                onSubmit={handlePlaceOrder}
              >

                {/* Delivery Information */}
                <section className="checkout-section">

                  <div className="checkout-section-title">

                    <span className="checkout-step">
                      1
                    </span>

                    <div>
                      <h2>
                        Delivery Information
                      </h2>

                      <p>
                        Enter your delivery details.
                      </p>
                    </div>

                  </div>

                  <div className="checkout-fields">

                    {/* Full Name */}
                    <div className="checkout-field full-width">

                      <label htmlFor="fullName">
                        Full Name
                      </label>

                      <input
                        id="fullName"
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                      />

                    </div>

                    {/* Email */}
                    <div className="checkout-field">

                      <label htmlFor="email">
                        Email Address
                      </label>

                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                      />

                    </div>

                    {/* Phone */}
                    <div className="checkout-field">

                      <label htmlFor="phone">
                        Phone Number
                      </label>

                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter 10-digit phone number"
                        maxLength="10"
                        required
                      />

                    </div>

                    {/* Address */}
                    <div className="checkout-field full-width">

                      <label htmlFor="address">
                        Address
                      </label>

                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your complete address"
                        rows="4"
                        required
                      />

                    </div>

                    {/* City */}
                    <div className="checkout-field">

                      <label htmlFor="city">
                        City
                      </label>

                      <input
                        id="city"
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter city"
                        required
                      />

                    </div>

                    {/* State */}
                    <div className="checkout-field">

                      <label htmlFor="state">
                        State
                      </label>

                      <input
                        id="state"
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="Enter state"
                        required
                      />

                    </div>

                    {/* PIN */}
                    <div className="checkout-field">

                      <label htmlFor="pincode">
                        PIN Code
                      </label>

                      <input
                        id="pincode"
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="Enter 6-digit PIN"
                        maxLength="6"
                        required
                      />

                    </div>

                  </div>

                </section>

                {/* Payment Method */}
                <section className="checkout-section">

                  <div className="checkout-section-title">

                    <span className="checkout-step">
                      2
                    </span>

                    <div>
                      <h2>
                        Payment Method
                      </h2>

                      <p>
                        Choose your preferred payment method.
                      </p>
                    </div>

                  </div>

                  <div className="payment-options">

                    {/* Cash On Delivery */}
                    <label
                      className={`payment-option ${
                        paymentMethod ===
                        "Cash on Delivery"
                          ? "active"
                          : ""
                      }`}
                    >

                      <input
                        type="radio"
                        name="payment"
                        value="Cash on Delivery"
                        checked={
                          paymentMethod ===
                          "Cash on Delivery"
                        }
                        onChange={(e) =>
                          setPaymentMethod(
                            e.target.value
                          )
                        }
                      />

                      <FaMoneyBillWave />

                      <div>
                        <strong>
                          Cash on Delivery
                        </strong>

                        <span>
                          Pay when your order arrives.
                        </span>
                      </div>

                    </label>

                    {/* Online Payment */}
                    <label
                      className={`payment-option ${
                        paymentMethod ===
                        "Online Payment"
                          ? "active"
                          : ""
                      }`}
                    >

                      <input
                        type="radio"
                        name="payment"
                        value="Online Payment"
                        checked={
                          paymentMethod ===
                          "Online Payment"
                        }
                        onChange={(e) =>
                          setPaymentMethod(
                            e.target.value
                          )
                        }
                      />

                      <FaCreditCard />

                      <div>
                        <strong>
                          Online Payment
                        </strong>

                        <span>
                          Pay securely using card or UPI.
                        </span>
                      </div>

                    </label>

                  </div>

                  <div className="checkout-security">

                    <FaShieldAlt />

                    <span>
                      Your information is securely protected.
                    </span>

                  </div>

                </section>

                {/* Place Order */}
                <button
                  type="submit"
                  className="place-order-btn"
                  disabled={loading}
                >
                  {loading
                    ? "Placing Order..."
                    : `Place Order • ₹${total.toLocaleString(
                        "en-IN"
                      )}`}
                </button>

              </form>

              {/* Order Summary */}
              <aside className="order-summary">

                <h2>
                  Order Summary
                </h2>

                <div className="order-items">

                  {cartItems.map((item, index) => (

                    <div
                      className="order-item"
                      key={
                        item._id ||
                        item.productId ||
                        `${item.name}-${index}`
                      }
                    >

                      <img
                        src={
                          item.image ||
                          "/images/thermometer.jpg"
                        }
                        alt={
                          item.name ||
                          "Medical Equipment"
                        }
                      />

                      <div className="order-item-info">

                        <h3>
                          {item.name ||
                            "Medical Equipment"}
                        </h3>

                        <p>
                          {item.category ||
                            "Medical Equipment"}
                        </p>

                        <span>
                          Quantity:{" "}
                          {item.quantity || 1}
                        </span>

                      </div>

                      <strong>
                        ₹
                        {(
                          Number(item.price || 0) *
                          Number(item.quantity || 1)
                        ).toLocaleString("en-IN")}
                      </strong>

                    </div>

                  ))}

                </div>

                {/* Subtotal */}
                <div className="summary-row">

                  <span>
                    Subtotal
                  </span>

                  <strong>
                    ₹
                    {subtotal.toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                </div>

                {/* Delivery */}
                <div className="summary-row">

                  <span>
                    Delivery
                  </span>

                  <strong className="free">
                    FREE
                  </strong>

                </div>

                {/* Tax */}
                <div className="summary-row">

                  <span>
                    Tax
                  </span>

                  <strong>
                    Included
                  </strong>

                </div>

                <hr />

                {/* Total */}
                <div className="summary-total">

                  <span>
                    Total
                  </span>

                  <strong>
                    ₹
                    {total.toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                </div>

              </aside>

            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}

export default Checkout;
