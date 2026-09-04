import API from "./api";

export const getProductById = (id) =>
  API.get(`/products/${id}`);