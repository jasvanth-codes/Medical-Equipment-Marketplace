import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";
import {
  FaArrowLeft,
  FaPlus,
  FaSave,
  FaBoxOpen,
  FaRupeeSign,
} from "react-icons/fa";

import "./AddProduct.css";

function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    image: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProduct((previousProduct) => ({
      ...previousProduct,
      [name]: value,
    }));
  };

  const addProduct = async (event) => {
    event.preventDefault();

    if (!product.name.trim()) {
      alert("Please enter product name.");
      return;
    }

    if (!product.category.trim()) {
      alert("Please enter product category.");
      return;
    }

    if (!product.price || Number(product.price) <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    if (product.stock === "" || Number(product.stock) < 0) {
      alert("Please enter a valid stock quantity.");
      return;
    }

    if (!product.description.trim()) {
      alert("Please enter product description.");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/products", {
        name: product.name.trim(),
        price: Number(product.price),
        category: product.category.trim(),
        stock: Number(product.stock),
        image: product.image.trim(),
        description: product.description.trim(),
      });

      console.log("ADD PRODUCT RESPONSE:", response.data);

      alert("Product added successfully!");

      setProduct({
        name: "",
        price: "",
        category: "",
        stock: "",
        image: "",
        description: "",
      });

      navigate("/admin/products");
    } catch (error) {
      console.error(
        "ADD PRODUCT ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to add product."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="add-product-page">
      <div className="add-product-container">

        <button
          type="button"
          className="add-product-back"
          onClick={() => navigate("/admin/products")}
        >
          <FaArrowLeft />
          Back to Products
        </button>

        <section className="add-product-header">
          <div>
            <span className="add-product-label">
              ADMIN PANEL
            </span>

            <h1>Add Product</h1>

            <p>
              Add a new medical equipment product
              to your marketplace inventory.
            </p>
          </div>

          <div className="add-product-header-icon">
            <FaBoxOpen />
          </div>
        </section>

        <form
          className="add-product-form"
          onSubmit={addProduct}
        >

          <div className="form-section">

            <div className="form-section-title">
              <h2>Product Information</h2>
              <p>
                Enter the basic details of your
                medical equipment.
              </p>
            </div>

            <div className="form-grid">

              <div className="form-group form-group-full">
                <label htmlFor="name">
                  Product Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  placeholder="Example: Digital Thermometer"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">
                  Category
                </label>

                <input
                  id="category"
                  type="text"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  placeholder="Example: Diagnostics"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">
                  Price
                </label>

                <div className="input-with-icon">
                  <FaRupeeSign />

                  <input
                    id="price"
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    placeholder="499"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="stock">
                  Stock Quantity
                </label>

                <input
                  id="stock"
                  type="number"
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                  placeholder="50"
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">
                  Image URL
                </label>

                <input
                  id="image"
                  type="text"
                  name="image"
                  value={product.image}
                  onChange={handleChange}
                  placeholder="/images/thermometer.jpg"
                />
              </div>

              <div className="form-group form-group-full">
                <label htmlFor="description">
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  placeholder="Enter a short description of the medical equipment..."
                  rows="5"
                  required
                />
              </div>

            </div>
          </div>

          <div className="form-actions">

            <button
              type="button"
              className="cancel-product-button"
              onClick={() =>
                navigate("/admin/products")
              }
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-product-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <FaSave />
                  Saving...
                </>
              ) : (
                <>
                  <FaPlus />
                  Add Product
                </>
              )}
            </button>

          </div>

        </form>

      </div>
    </main>
  );
}

export default AddProduct;
