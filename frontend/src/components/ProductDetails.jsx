import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addCart } = useContext(CartContext);
  const { addWishlist } = useContext(WishlistContext);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `https://medical-equipment-marketplace.onrender.com/api/products/${id}`
      );

      setProduct(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  if (!product) {
    return (
      <>
        <Navbar />
        <h2 style={{ textAlign: "center", marginTop: "50px" }}>
          Loading Product...
        </h2>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="details-container">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          â† Back
        </button>

        <div className="details-card">

          <img
            src={
              product.image ||
              "https://via.placeholder.com/500x400"
            }
            alt={product.name}
          />

          <div className="details-info">

            <h1>{product.name}</h1>

            <h2>â‚¹{product.price}</h2>

            <p>
              <strong>Category :</strong>{" "}
              {product.category}
            </p>

            <p>
              <strong>Stock :</strong>{" "}
              {product.stock}
            </p>

            <p className="description">
              {product.description}
            </p>

            <div className="details-buttons">

              <button
                className="cart-btn"
                onClick={() => {
                  addCart(product);
                  alert("Added To Cart");
                }}
              >
                Add To Cart
              </button>

              <button
                className="wish-btn"
                onClick={() => {
                  addWishlist(product);
                  alert("Added To Wishlist");
                }}
              >
                Wishlist
              </button>

              <button
                className="buy-btn"
                onClick={() => navigate("/payment")}
              >
                Buy Now
              </button>

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default ProductDetails;
