const Cart = require("../models/Cart");

// Add To Cart
const addToCart = async (req, res) => {
  try {
    const cart = await Cart.create({
      product: req.body.product,
      quantity: req.body.quantity || 1,
    });

    res.status(201).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get Cart Items
const getCart = async (req, res) => {
  try {
    const items = await Cart.find().populate("product");

    res.status(200).json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

// Remove Cart Item
const removeFromCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Item Removed Successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
};