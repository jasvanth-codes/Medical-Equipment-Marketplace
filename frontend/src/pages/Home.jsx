import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import Features from "../components/Features";
import Services from "../components/Services";
import About from "../components/About";
import FAQ from "../components/FAQ";
import Newsletter from "../components/Newsletter";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

import { getProducts } from "../services/productService";

import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const data = await getProducts();

      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let data = [...products];

    if (search.trim()) {
      const searchTerm = search.toLowerCase();

      data = data.filter(
        (product) =>
          product.name?.toLowerCase().includes(searchTerm) ||
          product.category?.toLowerCase().includes(searchTerm)
      );
    }

    if (category) {
      data = data.filter(
        (product) => product.category === category
      );
    }

    if (sort === "low") {
      data.sort(
        (a, b) => Number(a.price) - Number(b.price)
      );
    }

    if (sort === "high") {
      data.sort(
        (a, b) => Number(b.price) - Number(a.price)
      );
    }

    if (sort === "name") {
      data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    setFilteredProducts(data);
  }, [products, search, category, sort]);

  return (
    <div className="home-page">

      <Navbar />

      <Hero />

      <Categories />

      <SearchBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
      />

      <section className="products-section">

        <div className="products-heading">

          <div>
            <span className="section-label">
              OUR COLLECTION
            </span>

            <h2>Medical Equipment</h2>

            <p>
              Quality healthcare equipment for hospitals,
              clinics and home care.
            </p>
          </div>

          {!loading && (
            <div className="product-count">
              {filteredProducts.length} Products
            </div>
          )}

        </div>

        {loading && (
          <div className="products-message loading-state">
            <div className="loading-spinner"></div>

            <h3>Loading Products...</h3>

            <p>
              Please wait while we prepare our medical equipment.
            </p>
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="products-message empty-state">

            <div className="empty-icon">
              ??
            </div>

            <h3>No Products Found</h3>

            <p>
              Try changing your search, category or filters.
            </p>

            <button
              className="reset-products-btn"
              onClick={() => {
                setSearch("");
                setCategory("");
                setSort("");
              }}
            >
              Clear Filters
            </button>

          </div>
        )}

        {!loading && filteredProducts.length > 0 && (
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

      </section>

      <Features />

      <Services />

      <About />

      <FAQ />

      <Newsletter />

      <Contact />

      <Footer />

    </div>
  );
}

export default Home;
