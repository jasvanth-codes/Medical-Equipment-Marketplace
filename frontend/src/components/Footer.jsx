import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-section">
          <h2>Medical Equipment Marketplace</h2>

          <p>
            A complete platform to buy and manage
            medical equipment securely.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>

          <ul>
            <li>Home</li>
            <li>Products</li>
            <li>Cart</li>
            <li>Wishlist</li>
            <li>Orders</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>

          <p>Email : support@medicalmarket.com</p>
          <p>Phone : +91 9876543210</p>
          <p>Location : Chennai, India</p>
        </div>

      </div>

      <hr />

      <p className="copyright">
        © 2026 Medical Equipment Marketplace. All Rights Reserved.
      </p>

    </footer>
  );
}

export default Footer;