const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Product = require("./models/Product");

dotenv.config();

const updateProductImages = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    const imageUpdates = [
      {
        name: "Digital Thermometer",
        image: "/images/thermometer.jpg",
      },
      {
        name: "Pulse Oximeter",
        image: "/images/oximeter.jpg",
      },
      {
        name: "Blood Pressure Monitor",
        image: "/images/bp-monitor.jpg",
      },
      {
        name: "Nebulizer Machine",
        image: "/images/nebulizer.jpg",
      },
      {
        name: "Blood Glucose Meter",
        image: "/images/glucometer.jpg",
      },
      {
        name: "Manual Wheelchair",
        image: "/images/wheelchair.jpg",
      },
      {
        name: "Surgical Face Mask",
        image: "/images/mask.jpg",
      },
      {
        name: "Stethoscope",
        image: "/images/stethoscope.jpg",
      },
      {
        name: "Digital Weighing Scale",
        image: "/images/bp-monitor.jpg",
      },
      {
        name: "Infrared Thermometer",
        image: "/images/thermometer.jpg",
      },
      {
        name: "First Aid Kit",
        image: "/images/gloves.jpg",
      },
      {
        name: "Hospital Bed",
        image: "/images/hospital-bed.jpg",
      },
      {
        name: "Oxygen Concentrator",
        image: "/images/oxygen-concentrator.jpg",
      },
      {
        name: "Suction Machine",
        image: "/images/infusion-pump.jpg",
      },
      {
        name: "ECG Machine",
        image: "/images/ecg.jpg",
      },
      {
        name: "Patient Monitor",
        image: "/images/defibrillator.jpg",
      },
      {
        name: "Walking Stick",
        image: "/images/wheelchair.jpg",
      },
      {
        name: "Medical Gloves",
        image: "/images/gloves.jpg",
      },
      {
        name: "Portable Nebulizer",
        image: "/images/nebulizer.jpg",
      },
      {
        name: "Medical Examination Table",
        image: "/images/examination-table.jpg",
      },
    ];

    for (const item of imageUpdates) {
      const result = await Product.updateOne(
        { name: item.name },
        { $set: { image: item.image } }
      );

      if (result.matchedCount > 0) {
        console.log(`Updated: ${item.name}`);
      } else {
        console.log(`Product not found: ${item.name}`);
      }
    }

    console.log("All product images updated successfully!");

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("Update Error:", error.message);

    process.exit(1);
  }
};

updateProductImages();