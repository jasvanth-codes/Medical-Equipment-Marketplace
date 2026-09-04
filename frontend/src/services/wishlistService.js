import API from "./api";

export const getWishlist = () => {
  return API.get("/wishlist");
};

export const addWishlist = (data) => {
  return API.post("/wishlist", data);
};

export const removeWishlist = (id) => {
  return API.delete(`/wishlist/${id}`);
};