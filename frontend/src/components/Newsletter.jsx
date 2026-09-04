import { useState } from "react";
import "./Newsletter.css";

function Newsletter() {
  const [email, setEmail] = useState("");

  const subscribe = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Enter your email");
      return;
    }

    alert("Subscribed Successfully!");

    setEmail("");
  };

  return (
    <section className="newsletter">

      <h1>Subscribe to our Newsletter</h1>

      <p>
        Get updates on new medical products and offers.
      </p>

      <form onSubmit={subscribe}>

        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">
          Subscribe
        </button>

      </form>

    </section>
  );
}

export default Newsletter;