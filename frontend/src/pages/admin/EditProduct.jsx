import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaSave,
  FaBoxOpen,
  FaTag,
  FaRupeeSign,
  FaWarehouse,
  FaImage,
  FaAlignLeft,
} from "react-icons/fa";

import API from "../../utils/api";
import "./EditProduct.css";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
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

        const data = response.data;

        setProduct({
          name: data.name || "",
          category: data.category || "",
          price: data.price ?? "",
          stock: data.stock ?? data.quantity ?? "",
          image: data.image || "",
          description: data.description || "",
        });
      } catch (err) {
        console.error(
          "FETCH PRODUCT ERROR:",
          err.response?.data || err.message
        );

        setError(
          err.response?.data?.message ||
            "Failed to load product details."
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

    setProduct((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      const updatedProduct = {
        name: product.name.trim(),
        category: product.category,
        price: Number(product.price),
        stock: Number(product.stock),
        image: product.image.trim(),
        description: product.description.trim(),
      };

      await API.put(
        `/products/${id}`,
        updatedProduct
      );

      alert("Product updated successfully!");

      navigate("/admin/products");
    } catch (err) {
      console.error(
        "UPDATE PRODUCT ERROR:",
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.message ||
          "Failed to update product."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="edit-product-page">
        <div className="edit-product-container">
          <section className="edit-product-card">
            <div className="edit-product-loading">
              <FaBoxOpen />
              <h2>Loading Product...</h2>
              <p>
                Please wait while the product details are loading.
              </p>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="edit-product-page">
      <div className="edit-product-container">

        <Link
          to="/admin/products"
          className="edit-product-back"
        >
          <FaArrowLeft />
          Back to Products
        </Link>

        <section className="edit-product-header">

          <div className="edit-product-title-icon">
            <FaBoxOpen />
          </div>

          <div>
            <span>ADMIN PANEL</span>

            <h1>Edit Product</h1>

            <p>
              Update your medical equipment details.
            </p>
          </div>

        </section>

        {error && (
          <div className="edit-product-error">
            <strong>Unable to process request</strong>
            <span>{error}</span>
          </div>
        )}

        <section className="edit-product-card">

          <div className="edit-product-card-title">
            <h2>Product Information</h2>

            <p>
              Modify the details below and save your changes.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="edit-product-row">

              <div className="edit-product-field">
                <label>
                  <FaTag />
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="edit-product-field">
                <label>
                  <FaBoxOpen />
                  Category
                </label>

                <select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select category
                  </option>

                  <option value="Diagnostics">
                    Diagnostics
                  </option>

                  <option value="Monitoring">
                    Monitoring
                  </option>

                  <option value="Respiratory Care">
                    Respiratory Care
                  </option>

                  <option value="Mobility">
                    Mobility
                  </option>

                  <option value="Safety">
                    Safety
                  </option>

                  <option value="Emergency Care">
                    Emergency Care
                  </option>

                  <option value="Hospital Furniture">
                    Hospital Furniture
                  </option>
                </select>
              </div>

            </div>

            <div className="edit-product-row">

              <div className="edit-product-field">
                <label>
                  <FaRupeeSign />
                  Price
                </label>

                <div className="input-with-icon">
                  <FaRupeeSign />

                  <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="edit-product-field">
                <label>
                  <FaWarehouse />
                  Stock
                </label>

                <input
                  type="number"
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                  placeholder="Enter stock quantity"
                  min="0"
                  required
                />
              </div>

            </div>

            <div className="edit-product-field">

              <label>
                <FaImage />
                Image URL
              </label>

              <input
                type="text"
                name="image"
                value={product.image}
                onChange={handleChange}
                placeholder="/images/product.jpg"
              />

              {product.image && (
                <div className="edit-product-preview">
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}

            </div>

            <div className="edit-product-field">

              <label>
                <FaAlignLeft />
                Description
              </label>

              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows="5"
                required
              />

            </div>

            <div className="edit-product-actions">

              <Link
                to="/admin/products"
                className="edit-product-cancel"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="edit-product-save"
                disabled={saving}
              >
                <FaSave />

                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>

            </div>

          </form>

        </section>

      </div>
    </main>
  );
}

export default EditProduct;