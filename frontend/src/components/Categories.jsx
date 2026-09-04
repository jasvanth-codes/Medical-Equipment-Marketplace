import CategoryCard from "./CategoryCard";
import "./Categories.css";

function Categories() {

  const categories = [
    {
      title: "Diagnostics",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500",
    },
    {
      title: "Monitoring",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500",
    },
    {
      title: "Respiratory",
      image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=500",
    },
    {
      title: "Hospital Furniture",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500",
    },
    {
      title: "Laboratory Equipment",
      image: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?w=500",
    },
    {
      title: "Medical Consumables",
      image: "https://images.unsplash.com/photo-1580281657527-47f249e8f4df?w=500",
    },
  ];

  return (
    <section className="categories">

      <h1>Browse Categories</h1>

      <div className="categories-grid">

        {categories.map((item, index) => (
          <CategoryCard
            key={index}
            title={item.title}
            image={item.image}
          />
        ))}

      </div>

    </section>
  );
}

export default Categories;