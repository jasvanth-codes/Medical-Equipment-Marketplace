const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

/* =========================================
   MIDDLEWARE
========================================= */

app.use(cors());
app.use(express.json());


/* =========================================
   IMPORT ROUTES
========================================= */

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/OrderRoutes");
const authRoutes = require("./routes/AuthRoutes");
const adminRoutes = require("./routes/AdminRoutes");


/* =========================================
   API ROUTES
========================================= */

app.use("/api/products", productRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/admin", adminRoutes);


/* =========================================
   TEST ROUTE
========================================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Medical Equipment Marketplace API is running",
  });
});


/* =========================================
   DATABASE CONNECTION
========================================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.error(
      "MongoDB Connection Error:",
      error.message
    );
  });


/* =========================================
   START SERVER
========================================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}`
  );
});
