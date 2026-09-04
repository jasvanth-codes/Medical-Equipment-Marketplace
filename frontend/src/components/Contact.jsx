import "./Contact.css";

function Contact() {
  return (
    <section className="contact">

      <h1>Contact Us</h1>

      <div className="contact-container">

        <div className="contact-info">

          <h2>Medical Equipment Marketplace</h2>

          <p>Email : support@medicalmarketplace.com</p>

          <p>Phone : +91 9876543210</p>

          <p>Address : Chennai, Tamil Nadu, India</p>

          <p>Working Hours : Monday - Saturday (9 AM - 7 PM)</p>

        </div>

        <form className="contact-form">

          <input type="text" placeholder="Your Name" required />

          <input type="email" placeholder="Your Email" required />

          <textarea
            rows="6"
            placeholder="Enter your message"
            required
          ></textarea>

          <button type="submit">
            Send Message
          </button>

        </form>

      </div>

    </section>
  );
}

export default Contact;