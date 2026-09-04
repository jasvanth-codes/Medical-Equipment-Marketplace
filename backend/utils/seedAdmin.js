const bcrypt = require("bcryptjs");
const User = require("../models/User");

const seedAdmin = async () => {
  try {
    const exists = await User.findOne({
      email: "admin@gmail.com",
    });

    if (exists) {
      console.log("Admin Already Exists");
      return;
    }

    const password = await bcrypt.hash(
      "admin123",
      10
    );

    await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password,
      isAdmin: true,
    });

    console.log("Admin Created Successfully");
  } catch (err) {
    console.log(err);
  }
};

module.exports = seedAdmin;