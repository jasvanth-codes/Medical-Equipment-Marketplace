import "./Testimonials.css";

function Testimonials() {
  const testimonials = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Cardiologist",
      review:
        "Excellent platform to purchase medical equipment. Fast delivery and genuine products.",
    },
    {
      name: "Priya Hospitals",
      role: "Hospital",
      review:
        "Easy to manage bulk purchases with affordable pricing and great support.",
    },
    {
      name: "Dr. Meena",
      role: "General Physician",
      review:
        "The marketplace is simple, secure, and offers a wide range of medical products.",
    },
  ];

  return (
    <section className="testimonials">

      <h1>What Our Customers Say</h1>

      <div className="testimonial-grid">

        {testimonials.map((item, index) => (
          <div className="testimonial-card" key={index}>

            <h2>{item.name}</h2>

            <h4>{item.role}</h4>

            <p>"{item.review}"</p>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Testimonials;