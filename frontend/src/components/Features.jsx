import "./Features.css";

function Features() {
  const features = [
    {
      title: "100% Genuine Products",
      description: "Certified medical equipment from trusted suppliers.",
    },
    {
      title: "Fast Delivery",
      description: "Quick and secure delivery across India.",
    },
    {
      title: "Secure Payment",
      description: "Safe online payment with encrypted transactions.",
    },
    {
      title: "24/7 Support",
      description: "Dedicated customer support anytime.",
    },
    {
      title: "Easy Returns",
      description: "Simple return and replacement policy.",
    },
    {
      title: "Affordable Pricing",
      description: "Competitive prices for hospitals and individuals.",
    },
  ];

  return (
    <section className="features">

      <h1>Why Choose Us?</h1>

      <div className="feature-grid">

        {features.map((item, index) => (
          <div className="feature-card" key={index}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        ))}

      </div>

    </section>
  );
}

export default Features;