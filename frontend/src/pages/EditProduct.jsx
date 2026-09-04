import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaSave,
  FaBoxOpen,
  FaImage,
  FaTag,
  FaRupeeSign,
  FaWarehouse,
  FaStore,
  FaFileAlt,
  FaSpinner,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../utils/api";

import "./EditProduct.css";

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    seller: "",
    image: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await API.get(`/products/${id}`);

        const product =
          response.data?.product || response.data;

        if (!product) {
          throw new Error("Product not found");
        }

        setForm({
          name: product.name || "",
          category: product.category || "",
          price: product.price ?? "",
          stock: product.stock ?? "",
          seller: product.seller || "",
          image: product.image || "",
          description: product.description || "",
        });
      } catch (err) {
        console.error(
          "FETCH PRODUCT ERROR:",
          err.response?.data || err.message
        );

        setError(
          err.response?.data?.message ||
            "Failed to load product."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      alert("Please enter product name.");
      return;
    }

    if (!form.category.trim()) {
      alert("Please enter product category.");
      return;
    }

    if (form.price === "" || Number(form.price) < 0) {
      alert("Please enter a valid price.");
      return;
    }

    if (form.stock === "" || Number(form.stock) < 0) {
      alert("Please enter a valid stock quantity.");
      return;
    }

    try {
      setSaving(true);

      const response = await API.put(
        `/products/${id}`,
        {
          name: form.name.trim(),
          category: form.category.trim(),
          price: Number(form.price),
          stock: Number(form.stock),
          seller: form.seller.trim(),
          image: form.image.trim(),
          description: form.description.trim(),
        }
      );

      console.log(
        "UPDATE PRODUCT RESPONSE:",
        response.data
      );

      alert("Product updated successfully!");

      navigate("/admin/products");
    } catch (err) {
      console.error(
        "UPDATE PRODUCT ERROR:",
        err.response?.data || err.message
      );

      alert(
        err.response?.data?.message ||
          "Failed to update product."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="edit-product-page">
          <div className="edit-product-loading">
            <FaSpinner className="edit-loading-icon" />
            <h2>Loading Product...</h2>
            <p>Please wait while we load the product details.</p>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />

        <main className="edit-product-page">
          <div className="edit-product-error">
            <FaBoxOpen />
            <h2>Unable to Load Product</h2>
            <p>{error}</p>

            <button
              type="button"
              onClick={() => navigate("/admin/products")}
            >
              <FaArrowLeft />
              Back to Products
            </button>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="edit-product-page">
        <div className="edit-product-container">

          <button
            type="button"
            className="edit-product-back"
            onClick={() => navigate("/admin/products")}
          >
            <FaArrowLeft />
            Back to Products
          </button>

          <div className="edit-product-heading">
            <div>
              <span className="edit-product-label">
                ADMIN PANEL
              </span>

              <h1>Edit Product</h1>

              <p>
                Update the information of your medical
                equipment product.
              </p>
            </div>
          </div>

          <form
            className="edit-product-form"
            onSubmit={handleSubmit}
          >

            <div className="edit-product-grid">

              <section className="edit-product-card">
                <div className="edit-card-header">
                  <div className="edit-card-icon">
                    <FaBoxOpen />
                  </div>

                  <div>
                    <h2>Product Information</h2>
                    <p>Update the basic product details.</p>
                  </div>
                </div>

                <div className="edit-product-fields">

                  <div className="edit-field">
                    <label htmlFor="name">
                      <FaTag />
                      Product Name
                    </label>

                    <div className="edit-input-wrapper">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter product name"
                      />
                    </div>
                  </div>

                  <div className="edit-field">
                    <label htmlFor="category">
                      <FaBoxOpen />
                      Category
                    </label>

                    <div className="edit-input-wrapper">
                      <input
                        id="category"
                        name="category"
                        type="text"
                        value={form.category}
                        onChange={handleChange}
                        placeholder="Enter category"
                      />
                    </div>
                  </div>

                  <div className="edit-two-column">

                    <div className="edit-field">
                      <label htmlFor="price">
                        <FaRupeeSign />
                        Price
                      </label>

                      <div className="edit-input-wrapper">
                        <input
                          id="price"
                          name="price"
                          type="number"
                          min="0"
                          value={form.price}
                          onChange={handleChange}
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="edit-field">
                      <label htmlFor="stock">
                        <FaWarehouse />
                        Stock
                      </label>

                      <div className="edit-input-wrapper">
                        <input
                          id="stock"
                          name="stock"
                          type="number"
                          min="0"
                          value={form.stock}
                          onChange={handleChange}
                          placeholder="0"
                        />
                      </div>
                    </div>

                  </div>

                  <div className="edit-field">
                    <label htmlFor="seller">
                      <FaStore />
                      Seller
                    </label>

                    <div className="edit-input-wrapper">
                      <input
                        id="seller"
                        name="seller"
                        type="text"
                        value={form.seller}
                        onChange={handleChange}
                        placeholder="Enter seller name"
                      />
                    </div>
                  </div>

                  <div className="edit-field">
                    <label htmlFor="description">
                      <FaFileAlt />
                      Description
                    </label>

                    <div className="edit-textarea-wrapper">
                      <textarea
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Enter product description"
                        rows="6"
                      />
                    </div>
                  </div>

                </div>
              </section>

              <section className="edit-product-card edit-image-card">

                <div className="edit-card-header">
                  <div className="edit-card-icon">
                    <FaImage />
                  </div>

                  <div>
                    <h2>Product Image</h2>
                    <p>Update the product image URL.</p>
                  </div>
                </div>

                <div className="edit-image-preview">

                  {form.image ? (
                    <img
                      src={form.image}
                      alt={form.name || "Product"}
                      onError={(event) => {
                        event.currentTarget.style.display =
                          "none";
                      }}
                    />
                  ) : (
                    <div className="edit-image-placeholder">
                      <FaImage />
                      <span>No image available</span>
                    </div>
                  )}

                </div>

                <div className="edit-field">
                  <label htmlFor="image">
                    <FaImage />
                    Image URL
                  </label>

                  <div className="edit-input-wrapper">
                    <input
                      id="image"
                      name="image"
                      type="text"
                      value={form.image}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>

                <div className="edit-preview-info">
                  <FaImage />
                  <span>
                    Use a valid image URL. The preview will
                    update automatically.
                  </span>
                </div>

              </section>

            </div>

            <div className="edit-product-actions">

              <button
                type="button"
                className="edit-cancel-btn"
                onClick={() =>
                  navigate("/admin/products")
                }
                disabled={saving}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="edit-save-btn"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <FaSpinner className="edit-button-spinner" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave />
                    Save Changes
                  </>
                )}
              </button>

            </div>

          </form>

        </div>
      </main>

      <Footer />
    </>
  );
}

export default EditProduct;
