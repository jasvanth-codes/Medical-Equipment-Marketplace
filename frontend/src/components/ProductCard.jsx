import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../context/CartContext";

import "./ProductCard.css";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addCart } = useContext(CartContext);

  const openProduct = () => {
    navigate(`/products/${product._id}`);
  };

  const handleAddToCart = (event) => {
    event.stopPropagation();

    addCart(product);
  };

  const fallbackImage = "/images/thermometer.jpg";

  return (
    <div className="product-card" onClick={openProduct}>
      {/* Product Image */}
      <div className="product-image-wrapper">
        <img
          src={product.image || fallbackImage}
          alt={product.name || "Medical Equipment"}
          className="product-image"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = fallbackImage;
          }}
        />
      </div>

      {/* Product Information */}
      <div className="product-info">
        <h2 className="product-name">{product.name}</h2>

        <div className="product-price">
          ₹{Number(product.price || 0).toLocaleString("en-IN")}
        </div>

        <p className="product-category">
          <strong>Category:</strong>{" "}
          {product.category || "Medical Equipment"}
        </p>

        <p className="product-stock">
          {Number(product.stock || 0) > 0
            ? `${product.stock} available`
            : "Out of stock"}
        </p>

        <div className="product-actions">
          <button
            type="button"
            className="add-cart-btn"
            onClick={handleAddToCart}
            disabled={Number(product.stock || 0) <= 0}
          >
            {Number(product.stock || 0) > 0
              ? "Add to Cart"
              : "Out of Stock"}
          </button>

          <button
            type="button"
            className="view-details-btn"
            onClick={(event) => {
              event.stopPropagation();
              openProduct();
            }}
          >
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;