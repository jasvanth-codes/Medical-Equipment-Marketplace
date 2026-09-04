import "./Services.css";

function Services() {

  const services = [
    {
      title: "Medical Equipment Sales",
      description: "Buy certified medical equipment online."
    },
    {
      title: "Home Delivery",
      description: "Fast and secure delivery across India."
    },
    {
      title: "Equipment Maintenance",
      description: "Professional maintenance and servicing."
    },
    {
      title: "24/7 Customer Support",
      description: "Quick support whenever you need help."
    }
  ];

  return (
    <section className="services">

      <h1>Our Services</h1>

      <div className="service-grid">

        {services.map((service,index)=>(
          <div className="service-card" key={index}>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </div>
        ))}

      </div>

    </section>
  );
}

export default Services;