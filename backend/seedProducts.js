const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Product = require("./models/Product");

dotenv.config();

const products = [
  {
    name: "Surgical Face Mask",
    description:
      "Comfortable disposable surgical face masks for everyday medical protection.",
    price: 299,
    category: "Safety",
    image: "/images/face-mask.jpg",
    stock: 100,
    seller: "MedEquip",
  },
  {
    name: "Stethoscope",
    description:
      "Professional stethoscope for doctors, nurses and medical students.",
    price: 899,
    category: "Diagnostics",
    image: "/images/stethoscope.jpg",
    stock: 45,
    seller: "MedEquip",
  },
  {
    name: "Digital Weighing Scale",
    description:
      "Accurate digital weighing scale for monitoring body weight.",
    price: 1199,
    category: "Monitoring",
    image: "/images/weighing-scale.jpg",
    stock: 30,
    seller: "MedEquip",
  },
  {
    name: "Infrared Thermometer",
    description:
      "Contactless infrared thermometer for quick temperature measurement.",
    price: 1499,
    category: "Diagnostics",
    image: "/images/infrared-thermometer.jpg",
    stock: 40,
    seller: "MedEquip",
  },
  {
    name: "First Aid Kit",
    description:
      "Complete first aid kit containing essential emergency medical supplies.",
    price: 799,
    category: "Emergency Care",
    image: "/images/first-aid-kit.jpg",
    stock: 50,
    seller: "MedEquip",
  },
  {
    name: "Hospital Bed",
    description:
      "Adjustable hospital bed designed for patient comfort and medical care.",
    price: 24999,
    category: "Hospital Furniture",
    image: "/images/hospital-bed.jpg",
    stock: 10,
    seller: "MedEquip",
  },
  {
    name: "Oxygen Concentrator",
    description:
      "Reliable oxygen concentrator for home and clinical respiratory support.",
    price: 35999,
    category: "Respiratory Care",
    image: "/images/oxygen-concentrator.jpg",
    stock: 12,
    seller: "MedEquip",
  },
  {
    name: "Suction Machine",
    description:
      "Portable suction machine designed for effective medical suction.",
    price: 6499,
    category: "Respiratory Care",
    image: "/images/suction-machine.jpg",
    stock: 20,
    seller: "MedEquip",
  },
  {
    name: "ECG Machine",
    description:
      "Professional ECG machine for monitoring and recording heart activity.",
    price: 18999,
    category: "Diagnostics",
    image: "/images/ecg-machine.jpg",
    stock: 8,
    seller: "MedEquip",
  },
  {
    name: "Patient Monitor",
    description:
      "Multi-parameter patient monitor for continuous vital sign monitoring.",
    price: 29999,
    category: "Monitoring",
    image: "/images/patient-monitor.jpg",
    stock: 10,
    seller: "MedEquip",
  },
  {
    name: "Walking Stick",
    description:
      "Lightweight and durable walking stick for mobility support.",
    price: 699,
    category: "Mobility",
    image: "/images/walking-stick.jpg",
    stock: 60,
    seller: "MedEquip",
  },
  {
    name: "Medical Gloves",
    description:
      "Disposable medical examination gloves for hygiene and protection.",
    price: 399,
    category: "Safety",
    image: "/images/medical-gloves.jpg",
    stock: 150,
    seller: "MedEquip",
  },
  {
    name: "Portable Nebulizer",
    description:
      "Compact portable nebulizer for convenient respiratory treatment.",
    price: 1799,
    category: "Respiratory Care",
    image: "/images/portable-nebulizer.jpg",
    stock: 25,
    seller: "MedEquip",
  },
  {
    name: "Medical Examination Table",
    description:
      "Strong and comfortable examination table suitable for clinics and hospitals.",
    price: 15999,
    category: "Hospital Furniture",
    image: "/images/examination-table.jpg",
    stock: 10,
    seller: "MedEquip",
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    await Product.insertMany(products);

    console.log(`${products.length} new products added successfully!`);

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("Seeding Error:", error.message);

    process.exit(1);
  }
};

seedProducts();