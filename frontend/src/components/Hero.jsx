import { useNavigate } from "react-router-dom";
import "./Hero.css";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">

      <div className="hero-container">

        <div className="hero-content">

          <div className="hero-badge">
            <span>✓</span>
            Trusted Medical Equipment Store
          </div>

          <h1>
            Professional Healthcare
            <span> Equipment You Can Trust</span>
          </h1>

          <p>
            Discover reliable medical equipment, diagnostic devices,
            respiratory care products and healthcare essentials —
            delivered safely across India.
          </p>

          <div className="hero-buttons">

            <button
              className="hero-primary-btn"
              onClick={() => navigate("/products")}
            >
              Shop Medical Equipment
              <span>→</span>
            </button>

            <button
              className="hero-secondary-btn"
              onClick={() => {
                document
                  .querySelector(".categories-section")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore Categories
            </button>

          </div>

          <div className="hero-trust">

            <div>
              <strong>100%</strong>
              <small>Genuine Products</small>
            </div>

            <div>
              <strong>24/7</strong>
              <small>Customer Support</small>
            </div>

            <div>
              <strong>Pan India</strong>
              <small>Secure Delivery</small>
            </div>

          </div>

        </div>

        <div className="hero-visual">

          <div className="hero-image-card">

            <img
              src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1000"
              alt="Medical equipment"
            />

            <div className="hero-floating-card">
              <div className="floating-check">✓</div>
              <div>
                <strong>Healthcare You Can Trust</strong>
                <span>Quality equipment & secure delivery</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;
