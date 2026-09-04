const Review = require("../models/Review");

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user")
      .populate("product");

    res.json(reviews);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const addReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getReviews,
  addReview,
};