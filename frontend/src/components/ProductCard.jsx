import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaShoppingCart,
  FaEye,
} from "react-icons/fa";

import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

import "./ProductCard.css";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const { addCart } = useContext(CartContext);

  const {
    wishlist = [],
    addWishlist,
    removeWishlist,
  } = useContext(WishlistContext);

  if (!product) {
    return null;
  }

  const productId = product._id;

  const isWishlisted = wishlist.some(
    (item) => item._id === productId
  );

  // =========================
  // OPEN PRODUCT DETAILS
  // =========================

  const handleProductClick = () => {
    if (!productId) {
      console.error("Product ID is missing:", product);
      return;
    }

    navigate(`/products/${productId}`);
  };

  // =========================
  // ADD TO CART
  // =========================

  const handleAddToCart = (event) => {
    event.stopPropagation();

    addCart(product);

    alert(`${product.name} added to cart`);
  };

  // =========================
  // WISHLIST
  // =========================

  const handleWishlist = (event) => {
    event.stopPropagation();

    if (isWishlisted) {
      removeWishlist(productId);
    } else {
      addWishlist(product);
    }
  };

  // =========================
  // VIEW PRODUCT
  // =========================

  const handleViewProduct = (event) => {
    event.stopPropagation();

    handleProductClick();
  };

  return (
    <div className="product-card">

      {/* PRODUCT IMAGE */}

      <div
        className="product-image-container"
        onClick={handleProductClick}
      >
        <img
          src={
            product.image ||
            "https://via.placeholder.com/400x300?text=Medical+Equipment"
          }
          alt={product.name || "Medical Equipment"}
          className="product-image"
        />

        {/* WISHLIST BUTTON */}

        <button
          className={`wishlist-button ${
            isWishlisted ? "active" : ""
          }`}
          onClick={handleWishlist}
          title={
            isWishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
        >
          <FaHeart />
        </button>

        {/* VIEW BUTTON */}

        <button
          className="quick-view-button"
          onClick={handleViewProduct}
          title="View Product"
        >
          <FaEye />
        </button>
      </div>


      {/* PRODUCT INFORMATION */}

      <div className="product-info">

        <span className="product-category">
          {product.category || "Medical Equipment"}
        </span>

        <h3
          className="product-name"
          onClick={handleProductClick}
        >
          {product.name}
        </h3>

        <p className="product-description">
          {product.description
            ? product.description.length > 80
              ? `${product.description.substring(0, 80)}...`
              : product.description
            : "Quality medical equipment for healthcare needs."}
        </p>


        {/* PRICE + CART */}

        <div className="product-bottom">

          <div className="product-price">
            ₹{Number(product.price || 0).toLocaleString("en-IN")}
          </div>

          <button
            className="add-cart-button"
            onClick={handleAddToCart}
          >
            <FaShoppingCart />
            Add to Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;