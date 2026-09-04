const express = require("express");

const router = express.Router();

const {
  getWishlist,
  addWishlist,
} = require("../controllers/wishlistController");

router.get("/", getWishlist);

router.post("/", addWishlist);

module.exports = router;