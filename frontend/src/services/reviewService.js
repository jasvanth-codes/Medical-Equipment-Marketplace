import API from "./api";

// Add Review
export const addReview = (data) =>
  API.post("/reviews", data);

// Get Reviews
export const getReviews = (productId) =>
  API.get(`/reviews/${productId}`);

// Delete Review
export const deleteReview = (id) =>
  API.delete(`/reviews/${id}`);