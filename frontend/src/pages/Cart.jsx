import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaShoppingCart,
  FaTrash,
  FaMinus,
  FaPlus,
  FaArrowLeft,
  FaLock,
  FaCheckCircle,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { CartContext } from "../context/CartContext";

import "./Cart.css";

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems = [],
    removeCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const total = cartItems.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  );

  const totalItems = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.quantity || 1),
    0
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    navigate("/checkout");
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      <Navbar />

      <main className="cart-page">
        <div className="cart-header">
          <div>
            <h1>Your Shopping Cart</h1>

            <p>
              Review your medical equipment before checkout.
            </p>
          </div>

          <div className="cart-header-icon">
            <FaShoppingCart />
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <FaShoppingCart />
            </div>

            <h2>Your cart is empty</h2>

            <p>
              You haven't added any products to your cart yet.
            </p>

            <button
              className="continue-shopping-btn"
              onClick={() => navigate("/home")}
            >
              <FaArrowLeft />
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-layout">
            <section className="cart-items-section">
              <div className="cart-items-header">
                <div>
                  <h2>Cart Items</h2>

                  <p>
                    {totalItems} item
                    {totalItems !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {cartItems.map((item) => (
                <div
                  className="cart-item"
                  key={item._id}
                >
                  <div
                    className="cart-image-wrapper"
                    onClick={() =>
                      handleProductClick(item._id)
                    }
                  >
                    <img
                      className="cart-product-image"
                      src={
                        item.image ||
                        "/images/thermometer.jpg"
                      }
                      alt={item.name}
                      onError={(e) => {
                        e.currentTarget.src =
                          "/images/thermometer.jpg";
                      }}
                    />
                  </div>

                  <div className="cart-product-info">
                    <h3
                      onClick={() =>
                        handleProductClick(item._id)
                      }
                    >
                      {item.name}
                    </h3>

                    <p className="cart-category">
                      {item.category || "Medical Equipment"}
                    </p>

                    <p className="cart-price">
                      ₹
                      {Number(
                        item.price || 0
                      ).toLocaleString("en-IN")}
                    </p>

                    <div className="quantity-control">
                      <button
                        type="button"
                        onClick={() =>
                          decreaseQuantity(item._id)
                        }
                        aria-label="Decrease quantity"
                      >
                        <FaMinus />
                      </button>

                      <span>
                        {item.quantity || 1}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          increaseQuantity(item._id)
                        }
                        aria-label="Increase quantity"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-right">
                    <strong>
                      ₹
                      {(
                        Number(item.price || 0) *
                        Number(item.quantity || 1)
                      ).toLocaleString("en-IN")}
                    </strong>

                    <button
                      type="button"
                      className="remove-cart-btn"
                      onClick={() =>
                        removeCart(item._id)
                      }
                    >
                      <FaTrash />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </section>

            <aside className="cart-summary">
              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Subtotal</span>

                <strong>
                  ₹{total.toLocaleString("en-IN")}
                </strong>
              </div>

              <div className="summary-row">
                <span>Delivery</span>

                <strong className="free">
                  FREE
                </strong>
              </div>

              <div className="summary-row">
                <span>Tax</span>

                <strong>Included</strong>
              </div>

              <hr />

              <div className="cart-total">
                <span>Total</span>

                <strong>
                  ₹{total.toLocaleString("en-IN")}
                </strong>
              </div>

              <button
                type="button"
                className="checkout-btn"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>

              <button
                type="button"
                className="continue-shopping-link"
                onClick={() => navigate("/home")}
              >
                <FaArrowLeft />
                Continue Shopping
              </button>

              <div className="cart-security">
                <div className="security-title">
                  <FaLock />

                  <span>
                    Secure Checkout
                  </span>
                </div>

                <p>
                  Your information is protected and
                  securely processed.
                </p>
              </div>

              <div className="cart-benefits">
                <div>
                  <FaCheckCircle />
                  Genuine medical equipment
                </div>

                <div>
                  <FaCheckCircle />
                  Secure payment
                </div>

                <div>
                  <FaCheckCircle />
                  Fast delivery
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default Cart;