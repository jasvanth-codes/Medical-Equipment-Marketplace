import API from "./api";

export const searchProducts = (keyword) =>
  API.get(`/products?search=${keyword}`);