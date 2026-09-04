import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBoxOpen,
  FaPlus,
  FaSync,
  FaEdit,
  FaTrash,
  FaRupeeSign,
  FaTag,
  FaWarehouse,
  FaArrowLeft,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../utils/api";

import "./AdminProducts.css";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/products");

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.products || [];

      setProducts(data);
    } catch (err) {
      console.error("LOAD PRODUCTS ERROR:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load products."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const deleteProduct = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts((oldProducts) =>
        oldProducts.filter(
          (product) =>
            product._id !== id &&
            product.id !== id
        )
      );

      alert("Product deleted successfully.");
    } catch (err) {
      console.error("DELETE PRODUCT ERROR:", err);

      alert(
        err.response?.data?.message ||
          "Unable to delete product."
      );
    }
  };

  return (
    <>
      <Navbar />

      <main className="admin-products-page">
        <div className="admin-products-container">

          {/* BACK */}
          <Link
            to="/admin"
            className="admin-products-back"
          >
            <FaArrowLeft />
            Back to Dashboard
          </Link>

          {/* HEADER */}
          <section className="admin-products-header">

            <div className="admin-products-title">
              <span className="admin-products-label">
                ADMIN PANEL
              </span>

              <h1>Manage Products</h1>

              <p>
                Manage your medical equipment inventory,
                pricing and product information.
              </p>
            </div>

            <div className="admin-products-actions">

              <button
                type="button"
                className="admin-products-refresh"
                onClick={loadProducts}
                disabled={loading}
              >
                <FaSync
                  className={
                    loading
                      ? "admin-products-spin"
                      : ""
                  }
                />
                Refresh
              </button>

              <Link
                to="/admin/add-product"
                className="admin-products-add"
              >
                <FaPlus />
                Add Product
              </Link>

            </div>

          </section>

          {/* SUMMARY */}
          {!loading && !error && (
            <section className="admin-products-summary">

              <div className="admin-product-summary-card">
                <div className="summary-icon products-icon">
                  <FaBoxOpen />
                </div>

                <div>
                  <span>Total Products</span>
                  <strong>{products.length}</strong>
                </div>
              </div>

              <div className="admin-product-summary-card">
                <div className="summary-icon category-icon">
                  <FaTag />
                </div>

                <div>
                  <span>Categories</span>
                  <strong>
                    {
                      new Set(
                        products.map(
                          (product) =>
                            product.category || "Medical"
                        )
                      ).size
                    }
                  </strong>
                </div>
              </div>

              <div className="admin-product-summary-card">
                <div className="summary-icon stock-icon">
                  <FaWarehouse />
                </div>

                <div>
                  <span>Total Stock</span>
                  <strong>
                    {products.reduce(
                      (total, product) =>
                        total +
                        Number(product.stock || 0),
                      0
                    )}
                  </strong>
                </div>
              </div>

            </section>
          )}

          {/* ERROR */}
          {error && (
            <div className="admin-products-error">
              <strong>Unable to load products</strong>
              <span>{error}</span>

              <button
                type="button"
                onClick={loadProducts}
              >
                Try Again
              </button>
            </div>
          )}

          {/* LOADING */}
          {loading && (
            <div className="admin-products-loading">
              <FaSync className="admin-products-spin" />

              <h2>Loading Products</h2>

              <p>
                Please wait while we fetch your inventory.
              </p>
            </div>
          )}

          {/* EMPTY */}
          {!loading &&
            !error &&
            products.length === 0 && (
              <div className="admin-products-empty">

                <div className="admin-products-empty-icon">
                  <FaBoxOpen />
                </div>

                <h2>No Products Found</h2>

                <p>
                  Add your first medical equipment
                  product to the marketplace.
                </p>

                <Link
                  to="/admin/add-product"
                  className="admin-products-empty-button"
                >
                  <FaPlus />
                  Add Product
                </Link>

              </div>
            )}

          {/* PRODUCTS */}
          {!loading &&
            !error &&
            products.length > 0 && (
              <section className="admin-products-card">

                <div className="admin-products-card-header">

                  <div>
                    <h2>Product Inventory</h2>

                    <p>
                      {products.length} products
                      currently available
                    </p>
                  </div>

                </div>

                <div className="admin-products-table-wrapper">

                  <table className="admin-products-table">

                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Status</th>
                        <th className="actions-heading">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody>

                      {products.map((product) => {

                        const productId =
                          product._id || product.id;

                        const stock =
                          Number(product.stock || 0);

                        return (
                          <tr key={productId}>

                            {/* PRODUCT */}
                            <td>
                              <div className="admin-product-info">

                                <div className="admin-product-image">
                                  <img
                                    src={
                                      product.image ||
                                      "/images/placeholder.jpg"
                                    }
                                    alt={
                                      product.name ||
                                      "Medical product"
                                    }
                                  />
                                </div>

                                <div className="admin-product-name">

                                  <strong>
                                    {product.name ||
                                      "Unnamed Product"}
                                  </strong>

                                  <span>
                                    ID: {productId}
                                  </span>

                                </div>

                              </div>
                            </td>

                            {/* CATEGORY */}
                            <td>
                              <span className="admin-product-category">
                                {product.category ||
                                  "Medical"}
                              </span>
                            </td>

                            {/* PRICE */}
                            <td>
                              <div className="admin-product-price">
                                <FaRupeeSign />

                                {Number(
                                  product.price || 0
                                ).toLocaleString("en-IN")}
                              </div>
                            </td>

                            {/* STOCK */}
                            <td>
                              <span className="admin-product-stock">
                                {stock}
                              </span>
                            </td>

                            {/* STATUS */}
                            <td>
                              <span
                                className={`admin-stock-status ${
                                  stock > 0
                                    ? "in-stock"
                                    : "out-stock"
                                }`}
                              >
                                <span></span>

                                {stock > 0
                                  ? "In Stock"
                                  : "Out of Stock"}
                              </span>
                            </td>

                            {/* ACTIONS */}
                            <td>

                              <div className="admin-product-actions">

                                <Link
                                  to={`/admin/edit-product/${productId}`}
                                  className="admin-product-edit"
                                >
                                  <FaEdit />
                                  Edit
                                </Link>

                                <button
                                  type="button"
                                  className="admin-product-delete"
                                  onClick={() =>
                                    deleteProduct(
                                      productId
                                    )
                                  }
                                >
                                  <FaTrash />
                                  Delete
                                </button>

                              </div>

                            </td>

                          </tr>
                        );
                      })}

                    </tbody>

                  </table>

                </div>

              </section>
            )}

        </div>
      </main>

      <Footer />
    </>
  );
}

export default AdminProducts;
