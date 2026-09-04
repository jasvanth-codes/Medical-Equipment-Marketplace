const Product = require("../models/Product");

const products = [
  {
    name: "Digital Thermometer",
    description: "Fast temperature measurement",
    price: 499,
    category: "Diagnostics",
    stock: 50,
  },
  {
    name: "Pulse Oximeter",
    description: "Blood oxygen monitor",
    price: 999,
    category: "Monitoring",
    stock: 35,
  },
  {
    name: "Blood Pressure Monitor",
    description: "Automatic BP monitor",
    price: 1999,
    category: "Monitoring",
    stock: 20,
  },
  {
    name: "Nebulizer",
    description: "Respiratory treatment device",
    price: 2499,
    category: "Respiratory",
    stock: 15,
  },
];

const seedProducts = async () => {
  try {
    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Products Seeded Successfully");

    process.exit();
  } catch (err) {
    console.log(err);

    process.exit(1);
  }
};

module.exports = seedProducts;