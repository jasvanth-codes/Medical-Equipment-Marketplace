const express = require("express");

const router = express.Router();

const {
  getDashboard,
  getAllUsers,
} = require("../controllers/adminController");

// ADMIN DASHBOARD
// GET /api/admin/dashboard
router.get("/dashboard", getDashboard);

// MANAGE USERS
// GET /api/admin/users
router.get("/users", getAllUsers);

module.exports = router;
