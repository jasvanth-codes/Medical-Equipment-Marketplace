require("dotenv").config();

const mongoose = require("mongoose");

const seedProducts = require("./utils/seedProducts");
const seedAdmin = require("./utils/seedAdmin");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {

    console.log("MongoDB Connected");

    await seedAdmin();

    await seedProducts();

    console.log("Database Seeded Successfully");

    process.exit();

  })
  .catch((err) => {

    console.log(err);

    process.exit(1);

  });