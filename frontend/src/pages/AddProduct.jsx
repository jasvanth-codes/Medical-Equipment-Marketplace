import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaBoxOpen,
  FaTag,
  FaRupeeSign,
  FaWarehouse,
  FaUser,
  FaImage,
  FaCheckCircle,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import { addProduct } from "../services/adminService";
import ImageUploader from "../components/ImageUploader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./AddProduct.css";

function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    seller: "",
    image: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (imageUrl) => {
    setForm((prev) => ({
      ...prev,
      image: imageUrl,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Please enter a product name.");
      return;
    }

    if (!form.price || Number(form.price) <= 0) {
      alert("Please enter a valid product price.");
      return;
    }

    if (!form.category.trim()) {
      alert("Please enter a product category.");
      return;
    }

    if (form.stock === "" || Number(form.stock) < 0) {
      alert("Please enter a valid stock quantity.");
      return;
    }

    if (!form.seller.trim()) {
      alert("Please enter the seller name.");
      return;
    }

    try {
      setSubmitting(true);

      const productData = {
        name: form.name.trim(),
        price: Number(form.price),
        category: form.category.trim(),
        stock: Number(form.stock),
        seller: form.seller.trim(),
        image: form.image,
      };

      await addProduct(productData);

      alert("Product added successfully!");

      setForm({
        name: "",
        price: "",
        category: "",
        stock: "",
        seller: "",
        image: "",
      });

      navigate("/admin/products");
    } catch (error) {
      console.error("Add product error:", error);

      const message =
        error?.response?.data?.message ||
        "Unable to add product. Please try again.";

      alert(message);
    } finally {
      setSubmitting(false);
    }
  };

  const cancelHandler = () => {
    navigate("/admin/products");
  };

  return (
    <>
      <Navbar />

      <main className="add-product-page">
        <div className="add-product-container">

          <div className="add-product-header">
            <div>
              <button
                type="button"
                className="add-product-back"
                onClick={() => navigate("/admin")}
              >
                <FaArrowLeft />
                Back to Dashboard
              </button>

              <div className="add-product-heading">
                <span className="add-product-label">ADMIN PANEL</span>
                <h1>Add New Product</h1>
                <p>
                  Add medical equipment and healthcare products to your
                  marketplace.
                </p>
              </div>
            </div>
          </div>

          <form
            className="add-product-form"
            onSubmit={submitHandler}
          >
            <div className="add-product-main-grid">

              <section className="add-product-card product-information-card">
                <div className="add-product-card-header">
                  <div className="add-product-card-icon">
                    <FaBoxOpen />
                  </div>

                  <div>
                    <h2>Product Information</h2>
                    <p>Enter the basic details of your product.</p>
                  </div>
                </div>

                <div className="add-product-fields">

                  <div className="add-product-field full-width">
                    <label htmlFor="name">
                      Product Name
                      <span>*</span>
                    </label>

                    <div className="add-product-input-wrapper">
                      <FaBoxOpen className="add-product-input-icon" />

                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="e.g. Digital Thermometer"
                        required
                      />
                    </div>
                  </div>

                  <div className="add-product-field">
                    <label htmlFor="price">
                      Price
                      <span>*</span>
                    </label>

                    <div className="add-product-input-wrapper">
                      <FaRupeeSign className="add-product-input-icon" />

                      <input
                        id="price"
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="Enter price"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>

                  <div className="add-product-field">
                    <label htmlFor="stock">
                      Stock Quantity
                      <span>*</span>
                    </label>

                    <div className="add-product-input-wrapper">
                      <FaWarehouse className="add-product-input-icon" />

                      <input
                        id="stock"
                        type="number"
                        name="stock"
                        value={form.stock}
                        onChange={handleChange}
                        placeholder="Enter quantity"
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  <div className="add-product-field">
                    <label htmlFor="category">
                      Category
                      <span>*</span>
                    </label>

                    <div className="add-product-input-wrapper">
                      <FaTag className="add-product-input-icon" />

                      <input
                        id="category"
                        type="text"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        placeholder="e.g. Diagnostic Equipment"
                        list="product-categories"
                        required
                      />
                    </div>

                    <datalist id="product-categories">
                      <option value="Diagnostic Equipment" />
                      <option value="Monitoring Equipment" />
                      <option value="Respiratory Care" />
                      <option value="Hospital Equipment" />
                      <option value="Mobility Equipment" />
                      <option value="Surgical Supplies" />
                      <option value="PPE" />
                      <option value="Home Healthcare" />
                    </datalist>
                  </div>

                  <div className="add-product-field">
                    <label htmlFor="seller">
                      Seller
                      <span>*</span>
                    </label>

                    <div className="add-product-input-wrapper">
                      <FaUser className="add-product-input-icon" />

                      <input
                        id="seller"
                        type="text"
                        name="seller"
                        value={form.seller}
                        onChange={handleChange}
                        placeholder="Enter seller name"
                        required
                      />
                    </div>
                  </div>

                </div>
              </section>

              <section className="add-product-card image-card">
                <div className="add-product-card-header">
                  <div className="add-product-card-icon">
                    <FaImage />
                  </div>

                  <div>
                    <h2>Product Image</h2>
                    <p>Upload an image for your product.</p>
                  </div>
                </div>

                <div className="product-image-upload-area">

                  {form.image ? (
                    <div className="uploaded-image-preview">
                      <img
                        src={form.image}
                        alt="Product preview"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />

                      <div className="uploaded-image-success">
                        <FaCheckCircle />
                        <span>Image uploaded successfully</span>
                      </div>

                      <button
                        type="button"
                        className="remove-product-image"
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            image: "",
                          }))
                        }
                      >
                        <FaTimes />
                        Remove Image
                      </button>
                    </div>
                  ) : (
                    <div className="image-upload-placeholder">
                      <div className="image-upload-icon">
                        <FaImage />
                      </div>

                      <h3>Upload Product Image</h3>

                      <p>
                        Choose a clear image of the medical equipment.
                      </p>

                      <div className="image-uploader-wrapper">
                        <ImageUploader
                          onUpload={handleImageUpload}
                        />
                      </div>

                      <small>
                        JPG, PNG or WEBP images are recommended.
                      </small>
                    </div>
                  )}

                </div>
              </section>

            </div>

            <section className="add-product-card product-review-card">

              <div className="product-review-header">
                <div>
                  <span className="review-label">FINAL STEP</span>
                  <h2>Ready to add this product?</h2>
                  <p>
                    Check the information above before adding the product
                    to your marketplace.
                  </p>
                </div>

                <div className="review-status">
                  <FaCheckCircle />
                  <span>Admin Product Entry</span>
                </div>
              </div>

              <div className="add-product-actions">

                <button
                  type="button"
                  className="add-product-cancel"
                  onClick={cancelHandler}
                  disabled={submitting}
                >
                  <FaTimes />
                  Cancel
                </button>

                <button
                  type="submit"
                  className="add-product-submit"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <span className="add-product-spinner"></span>
                      Adding Product...
                    </>
                  ) : (
                    <>
                      <FaPlus />
                      Add Product
                    </>
                  )}
                </button>

              </div>

            </section>

          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default AddProduct;
