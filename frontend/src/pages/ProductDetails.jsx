import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import API from "../utils/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

import {
  FaArrowLeft,
  FaShoppingCart,
  FaHeart,
  FaBolt,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaBoxOpen,
  FaStore,
  FaStar,
  FaRupeeSign,
} from "react-icons/fa";

import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { addCart } = useContext(CartContext);
  const { addWishlist } = useContext(WishlistContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await API.get(`/products/${id}`);

        setProduct(response.data);
      } catch (err) {
        console.error(
          "FETCH PRODUCT ERROR:",
          err.response?.data || err.message
        );

        if (err.response?.status === 404) {
          setError("Product not found");
        } else {
          setError("Unable to load product");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    addCart(product);

    alert(`${product.name} added to cart`);

    navigate("/cart");
  };

  const handleBuyNow = () => {
    if (!product) return;

    addCart(product);

    navigate("/checkout");
  };

  const handleWishlist = () => {
    if (!product) return;

    addWishlist(product);

    alert(`${product.name} added to wishlist`);
  };

  const handleEdit = () => {
    if (!product) return;

    navigate(`/admin/edit-product/${product._id}`);
  };

  const handleDelete = async () => {
    if (!product) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${product.name}?`
    );

    if (!confirmed) return;

    try {
      await API.delete(`/products/${product._id}`);

      alert("Product deleted successfully");

      navigate("/admin/products");
    } catch (err) {
      console.error(
        "DELETE PRODUCT ERROR:",
        err.response?.data || err.message
      );

      alert(
        err.response?.data?.message ||
          "Failed to delete product"
      );
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="product-details-loading">
          <div className="loading-spinner"></div>

          <h2>Loading product...</h2>

          <p>
            Please wait while we load the product details.
          </p>
        </div>

        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar />

        <div className="product-details-error">

          <div className="product-error-icon">
            <FaBoxOpen />
          </div>

          <h2>
            {error || "Product not found"}
          </h2>

          <p>
            Sorry, this product could not be found.
          </p>

          <button
            className="back-home-btn"
            onClick={() => navigate("/products")}
          >
            <FaArrowLeft />
            Back to Products
          </button>

        </div>

        <Footer />
      </>
    );
  }

  const stock = Number(product.stock ?? 0);
  const isAdmin = user?.role === "admin";

  return (
    <>
      <Navbar />

      <main className="product-details-page">

        <div className="product-details-top">

          <button
            className="details-back-btn"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
            Back to Products
          </button>

        </div>

        <section className="product-details-container">

          <div className="product-image-section">

            <div className="product-image-box">

              <img
                src={
                  product.image ||
                  "/images/thermometer.jpg"
                }
                alt={
                  product.name ||
                  "Medical Equipment"
                }
                className="product-details-image"
                onError={(event) => {
                  event.currentTarget.src =
                    "/images/thermometer.jpg";
                }}
              />

            </div>

            <div className="image-caption">
              <FaCheckCircle />
              Genuine Product
            </div>

          </div>

          <div className="product-information">

            <span className="product-category">
              {product.category ||
                "Medical Equipment"}
            </span>

            <h1 className="product-title">
              {product.name}
            </h1>

            <div className="product-rating">

              <span className="rating-stars">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </span>

              <span className="rating-text">
                Trusted Medical Equipment
              </span>

            </div>

            <div className="product-price-section">

              <span className="price-label">
                Price
              </span>

              <h2 className="product-price">
                <FaRupeeSign />

                {Number(
                  product.price || 0
                ).toLocaleString("en-IN")}
              </h2>

            </div>

            <div className="product-divider"></div>

            <div className="product-description-section">

              <h3>
                About this product
              </h3>

              <p>
                {product.description ||
                  "High-quality medical equipment designed for reliable use in hospitals, clinics and home healthcare."}
              </p>

            </div>

            <div className="product-meta">

              <div className="meta-item">

                <FaBoxOpen />

                <div>

                  <span>
                    Stock
                  </span>

                  <strong
                    className={
                      stock > 0
                        ? "stock-available"
                        : "stock-out"
                    }
                  >
                    {stock > 0
                      ? `${stock} available`
                      : "Out of stock"}
                  </strong>

                </div>

              </div>

              <div className="meta-item">

                <FaStore />

                <div>

                  <span>
                    Seller
                  </span>

                  <strong>
                    {product.seller ||
                      "MedEquip"}
                  </strong>

                </div>

              </div>

            </div>

            <div className="product-action-buttons">

              <button
                className="add-cart-btn"
                onClick={handleAddToCart}
                disabled={stock <= 0}
              >
                <FaShoppingCart />
                Add to Cart
              </button>

              <button
                className="buy-now-btn"
                onClick={handleBuyNow}
                disabled={stock <= 0}
              >
                <FaBolt />
                Buy Now
              </button>

              <button
                className="wishlist-btn"
                onClick={handleWishlist}
              >
                <FaHeart />
                Wishlist
              </button>

            </div>

            {isAdmin && (
              <div className="admin-actions">

                <button
                  className="edit-product-btn"
                  onClick={handleEdit}
                >
                  <FaEdit />
                  Edit Product
                </button>

                <button
                  className="delete-product-btn"
                  onClick={handleDelete}
                >
                  <FaTrash />
                  Delete Product
                </button>

              </div>
            )}

            <div className="product-trust-section">

              <div>
                <FaCheckCircle />
                <span>
                  100% Genuine
                </span>
              </div>

              <div>
                <FaCheckCircle />
                <span>
                  Secure Purchase
                </span>
              </div>

              <div>
                <FaCheckCircle />
                <span>
                  Fast Delivery
                </span>
              </div>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default ProductDetails;
