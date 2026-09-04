import { useContext } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { WishlistContext } from "../context/WishlistContext";

import "./Wishlist.css";

function Wishlist() {

  const {
    wishlist,
    removeWishlist,
  } = useContext(WishlistContext);

  return (
    <>
      <Navbar />

      <div className="wishlist-page">

        <h1>My Wishlist</h1>

        {wishlist.length === 0 ? (

          <h2>No Wishlist Items</h2>

        ) : (

          wishlist.map((item) => (

            <div
              className="wishlist-item"
              key={item._id}
            >

              <img
                src={
                  item.image ||
                  "https://via.placeholder.com/120"
                }
                alt={item.name}
              />

              <div>

                <h2>{item.name}</h2>

                <p>{item.category}</p>

                <h3>₹{item.price}</h3>

              </div>

              <button
                onClick={() =>
                  removeWishlist(item._id)
                }
              >
                Remove
              </button>

            </div>

          ))

        )}

      </div>

      <Footer />

    </>
  );
}

export default Wishlist;