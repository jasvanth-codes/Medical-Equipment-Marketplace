import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";
import { FaBoxOpen } from "react-icons/fa";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("PRODUCTS ERROR:", err);
        setError("Unable to load products.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    /* SEARCH */

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();

      result = result.filter((product) => {
        return (
          product.name?.toLowerCase().includes(search) ||
          product.category?.toLowerCase().includes(search) ||
          product.description?.toLowerCase().includes(search)
        );
      });
    }

    /* CATEGORY */

    if (selectedCategory !== "all") {
      result = result.filter(
        (product) =>
          product.category?.toLowerCase() ===
          selectedCategory.toLowerCase()
      );
    }

    /* SORT */

    if (sortBy === "price-low") {
      result.sort(
        (a, b) => Number(a.price || 0) - Number(b.price || 0)
      );
    }

    if (sortBy === "price-high") {
      result.sort(
        (a, b) => Number(b.price || 0) - Number(a.price || 0)
      );
    }

    if (sortBy === "name") {
      result.sort((a, b) =>
        (a.name || "").localeCompare(b.name || "")
      );
    }

    return result;
  }, [products, searchTerm, selectedCategory, sortBy]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSortBy("default");
  };

  return (
    <div className="products-page">

      <Navbar />

      {/* SEARCH */}

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* HEADER */}

      <section className="products-hero">
        <div className="products-hero-container">

          <div className="products-eyebrow">
            Our Collection
          </div>

          <div className="products-title-row">

            <div>
              <h1 className="products-title">
                Medical Equipment
              </h1>

              <p className="products-subtitle">
                Quality healthcare equipment for hospitals,
                clinics and home care.
              </p>
            </div>

            <div className="products-count">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "Product"
                : "Products"}
            </div>

          </div>

        </div>
      </section>

      {/* PRODUCTS */}

      <main className="products-container">

        {loading && (
          <div className="loading-state">
            <div className="loading-spinner"></div>

            <p>
              Loading medical equipment...
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="products-message">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <div className="empty-state">

            <div className="empty-icon">
              <FaBoxOpen />
            </div>

            <h3>
              No products found
            </h3>

            <p>
              Try changing your search or filter.
            </p>

            <button
              className="reset-products-btn"
              onClick={resetFilters}
            >
              Reset Filters
            </button>

          </div>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <div className="products-grid">

            {filteredProducts.map((product) => (
              <div
                className="product-wrapper"
                key={product._id}
              >
                <ProductCard product={product} />
              </div>
            ))}

          </div>
        )}

      </main>

      <Footer />

    </div>
  );
}

export default Products;
