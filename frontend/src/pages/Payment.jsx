import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { CartContext } from "../context/CartContext";

import "./Payment.css";

function Payment() {
  const navigate = useNavigate();

  const { cart, clearCart } = useContext(CartContext);

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const order = {
      id: Date.now(),
      items: cart,
      total,
      paymentMethod,
      status: "Order Placed",
      date: new Date().toLocaleString(),
    };

    const orders =
      JSON.parse(localStorage.getItem("orders")) || [];

    orders.push(order);

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    clearCart();

    navigate("/order-success");
  };

  return (
    <>
      <Navbar />

      <div className="payment-page">

        <h1>Payment</h1>

        <div className="payment-card">

          <h2>Order Summary</h2>

          {cart.map((item) => (

            <div
              key={item._id}
              className="payment-item"
            >
              <span>
                {item.name} × {item.quantity}
              </span>

              <span>
                ₹{item.price * item.quantity}
              </span>
            </div>

          ))}

          <hr />

          <h2>Total : ₹{total}</h2>

          <h3>Select Payment Method</h3>

          <label>

            <input
              type="radio"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />

            Cash On Delivery

          </label>

          <label>

            <input
              type="radio"
              value="Online"
              checked={paymentMethod === "Online"}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />

            Online Payment (Demo)

          </label>

          <button
            className="place-order-btn"
            onClick={placeOrder}
          >
            Place Order
          </button>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Payment;