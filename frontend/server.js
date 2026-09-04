const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");

app.use("/api/orders", orderRoutes);

// Product API routes
app.use("/products", productRoutes);
app.use("/api/products", productRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Medical Equipment Marketplace API is running");
});

// MongoDB Connection
mongoose
  .connect(
    process.env.MONGO_URI ||
      "mongodb://127.0.0.1:27017/medical_marketplace"
  )
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error(
      "MongoDB Connection Error:",
      err.message
    );
  });

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
