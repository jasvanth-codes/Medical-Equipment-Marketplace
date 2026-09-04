import { useState, useEffect } from "react";
import "./ProductForm.css";

function ProductForm({ addProduct, updateProduct, editingProduct }) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });

  useEffect(() => {
    if (editingProduct) {
      setProduct(editingProduct);
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingProduct) {
      updateProduct(product);
    } else {
      addProduct(product);
    }

    setProduct({
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      image: "",
    });
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={product.category}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={product.stock}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={product.image}
        onChange={handleChange}
      />

      <button type="submit">
        {editingProduct ? "Update Product" : "Add Product"}
      </button>

    </form>
  );
}

export default ProductForm;