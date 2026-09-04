import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";

import "./Wishlist.css";

function Wishlist() {
  const navigate = useNavigate();

  const {
    wishlist,
    removeWishlist,
    clearWishlist,
  } = useContext(WishlistContext);

  const { addCart } = useContext(CartContext);

  const moveToCart = (product) => {
    addCart(product);
    removeWishlist(product._id);
    alert("Moved to Cart");
  };

  return (
    <>
      <Navbar />

      <div className="wishlist-page">

        <h1>❤️ My Wishlist</h1>

        {wishlist.length === 0 ? (

          <div className="empty-wishlist">

            <h2>Your Wishlist is Empty</h2>

            <button
              className="continue-btn"
              onClick={() => navigate("/home")}
            >
              Continue Shopping
            </button>

          </div>

        ) : (

          <>
            {wishlist.map((item) => (

              <div
                className="wishlist-item"
                key={item._id}
              >

                <img
                  src={
                    item.image ||
                    "https://via.placeholder.com/150"
                  }
                  alt={item.name}
                />

                <div className="wishlist-details">

                  <h2>{item.name}</h2>

                  <p>{item.category}</p>

                  <h3>₹{item.price}</h3>

                </div>

                <div className="wishlist-buttons">

                  <button
                    className="cart-btn"
                    onClick={() => moveToCart(item)}
                  >
                    Move To Cart
                  </button>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeWishlist(item._id)
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

            <div className="wishlist-actions">

              <button
                className="continue-btn"
                onClick={() => navigate("/home")}
              >
                Continue Shopping
              </button>

              <button
                className="clear-btn"
                onClick={clearWishlist}
              >
                Clear Wishlist
              </button>

            </div>

          </>

        )}

      </div>

      <Footer />
    </>
  );
}

export default Wishlist;