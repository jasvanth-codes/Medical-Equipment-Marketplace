import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaBoxOpen,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaArrowLeft,
  FaRupeeSign,
  FaSync,
} from "react-icons/fa";

import API from "../../utils/api";
import "./ManageProducts.css";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH PRODUCTS
  // ==========================================

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/products");

      console.log("PRODUCT API RESPONSE:", response.data);

      let data = response.data;

      // Backend may return:
      // 1. Array
      // 2. { products: [] }
      // 3. { data: [] }

      if (Array.isArray(data)) {
        setProducts(data);
      } else if (Array.isArray(data.products)) {
        setProducts(data.products);
      } else if (Array.isArray(data.data)) {
        setProducts(data.data);
      } else {
        console.error("Unexpected product response:", data);

        setProducts([]);

        setError("Invalid product data received from server.");
      }
    } catch (err) {
      console.error(
        "FETCH PRODUCTS ERROR:",
        err.response?.data || err.message
      );

      setProducts([]);

      setError(
        err.response?.data?.message ||
          "Unable to load products. Please check the backend server."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ==========================================
  // SEARCH
  // ==========================================

  const filteredProducts = products.filter((product) => {
    const name = String(product.name || "").toLowerCase();

    const category = String(
      product.category || ""
    ).toLowerCase();

    const search = searchTerm.toLowerCase();

    return (
      name.includes(search) ||
      category.includes(search)
    );
  });

  // ==========================================
  // DELETE
  // ==========================================

  const deleteProduct = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await API.delete(`/products/${id}`);

      setProducts((previousProducts) =>
        previousProducts.filter(
          (product) => product._id !== id
        )
      );

      alert("Product deleted successfully.");
    } catch (err) {
      console.error(
        "DELETE PRODUCT ERROR:",
        err.response?.data || err.message
      );

      alert(
        err.response?.data?.message ||
          "Failed to delete product."
      );
    }
  };

  // ==========================================
  // IMAGE
  // ==========================================

  const getImage = (image) => {
    if (!image) {
      return "/images/thermometer.jpg";
    }

    // Already a full URL
    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    // Local image path
    if (image.startsWith("/")) {
      return image;
    }

    return `/${image}`;
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <main className="manage-products-page">

      <div className="manage-products-container">

        {/* BACK */}

        <Link
          to="/admin"
          className="manage-products-back"
        >
          <FaArrowLeft />
          Back to Dashboard
        </Link>

        {/* HEADER */}

        <section className="manage-products-header">

          <div>

            <span className="manage-products-label">
              ADMIN PANEL
            </span>

            <h1>Manage Products</h1>

            <p>
              Add, update and manage your medical
              equipment inventory.
            </p>

          </div>

          <Link
            to="/admin/add-product"
            className="add-product-button"
          >
            <FaPlus />
            Add Product
          </Link>

        </section>

        {/* TOOLBAR */}

        <section className="manage-products-toolbar">

          <div className="products-count">

            <FaBoxOpen />

            <span>
              Total Products:{" "}
              <strong>
                {products.length}
              </strong>
            </span>

          </div>

          <div className="products-search">

            <FaSearch />

            <input
              type="text"
              placeholder="Search products or categories..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />

          </div>

        </section>

        {/* ERROR */}

        {error && !loading && (

          <section className="products-error">

            <FaBoxOpen />

            <h2>
              Unable to Load Products
            </h2>

            <p>
              {error}
            </p>

            <button
              type="button"
              onClick={fetchProducts}
            >
              <FaSync />
              Try Again
            </button>

          </section>

        )}

        {/* LOADING */}

        {loading && (

          <section className="products-empty-state">

            <FaSync className="spin" />

            <h2>
              Loading Products...
            </h2>

            <p>
              Please wait while products are loading.
            </p>

          </section>

        )}

        {/* EMPTY */}

        {!loading &&
          !error &&
          filteredProducts.length === 0 && (

            <section className="products-empty-state">

              <FaBoxOpen />

              <h2>
                {products.length === 0
                  ? "No Products Yet"
                  : "No Products Found"}
              </h2>

              <p>
                {products.length === 0
                  ? "Start building your medical equipment catalog by adding your first product."
                  : "Try searching with a different product name or category."}
              </p>

              {products.length === 0 && (

                <Link
                  to="/admin/add-product"
                  className="empty-add-product-button"
                >
                  <FaPlus />
                  Add Your First Product
                </Link>

              )}

            </section>

          )}

        {/* PRODUCTS */}

        {!loading &&
          !error &&
          filteredProducts.length > 0 && (

            <section className="products-grid">

              {filteredProducts.map((product) => {

                const stock =
                  product.stock ??
                  product.quantity ??
                  0;

                const price =
                  Number(product.price || 0);

                return (

                  <article
                    className="admin-product-card"
                    key={product._id}
                  >

                    {/* IMAGE */}

                    <div className="admin-product-image">

                      <img
                        src={getImage(product.image)}
                        alt={
                          product.name ||
                          "Medical equipment"
                        }
                        onError={(event) => {
                          event.currentTarget.src =
                            "/images/thermometer.jpg";
                        }}
                      />

                    </div>

                    {/* CONTENT */}

                    <div className="admin-product-content">

                      <span className="admin-product-category">

                        {product.category ||
                          "Medical Equipment"}

                      </span>

                      <h2>

                        {product.name ||
                          "Unnamed Product"}

                      </h2>

                      <p className="admin-product-description">

                        {product.description ||
                          "No product description available."}

                      </p>

                      {/* DETAILS */}

                      <div className="admin-product-details">

                        <div>

                          <span>
                            Price
                          </span>

                          <strong>

                            <FaRupeeSign />

                            {price.toLocaleString(
                              "en-IN"
                            )}

                          </strong>

                        </div>

                        <div>

                          <span>
                            Stock
                          </span>

                          <strong>
                            {stock}
                          </strong>

                        </div>

                      </div>

                      {/* ACTIONS */}

                      <div className="admin-product-actions">

                        <Link
                          to={`/admin/edit-product/${product._id}`}
                          className="edit-product-button"
                        >
                          <FaEdit />
                          Edit
                        </Link>

                        <button
                          type="button"
                          className="delete-product-button"
                          onClick={() =>
                            deleteProduct(
                              product._id
                            )
                          }
                        >
                          <FaTrash />
                          Delete
                        </button>

                      </div>

                    </div>

                  </article>

                );
              })}

            </section>

          )}

      </div>

    </main>
  );
}

export default ManageProducts;