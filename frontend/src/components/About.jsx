import "./About.css";

function About() {
  return (
    <section className="about">

      <h1>About Us</h1>

      <div className="about-content">

        <div className="about-text">

          <h2>Medical Equipment Marketplace</h2>

          <p>
            Medical Equipment Marketplace is a full-stack MERN web application
            designed to help hospitals, clinics, and individuals buy quality
            medical equipment online.
          </p>

          <p>
            The platform provides secure authentication, product management,
            shopping cart, wishlist, order management, search, filtering,
            responsive design, and a user-friendly interface.
          </p>

        </div>

        <div className="about-image">

          <img
            src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=900"
            alt="About"
          />

        </div>

      </div>

    </section>
  );
}

export default About;