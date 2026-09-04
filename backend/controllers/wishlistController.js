const Wishlist = require("../models/Wishlist");

const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find()
      .populate("user")
      .populate("product");

    res.json(wishlist);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const addWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.create(req.body);

    res.status(201).json(wishlist);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getWishlist,
  addWishlist,
};