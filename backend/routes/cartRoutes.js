const express = require("express");

const router = express.Router();

const {
  addToCart,
  getCart,
  removeFromCart,
} = require("../controllers/cartController");

// Add item to cart
router.post("/", addToCart);

// Get all cart items
router.get("/", getCart);

// Remove item from cart
router.delete("/:id", removeFromCart);

module.exports = router;