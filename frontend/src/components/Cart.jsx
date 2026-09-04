import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">

      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <h2>Your Cart is Empty</h2>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className="cart-item" key={item._id}>

              <img
                src={item.image}
                alt={item.name}
                className="cart-image"
              />

              <div className="cart-details">

                <h3>{item.name}</h3>

                <p>₹{item.price}</p>

                <div className="quantity">

                  <button
                    onClick={() => decreaseQuantity(item._id)}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increaseQuantity(item._id)}
                  >
                    +
                  </button>

                </div>

                <h4>
                  Total: ₹{item.price * item.quantity}
                </h4>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>

              </div>

            </div>
          ))}

          <div className="grand-total">
            Grand Total : ₹{totalPrice}
          </div>

          <button className="checkout-btn">
            Proceed to Checkout
          </button>

        </>
      )}

    </div>
  );
}

export default Cart;