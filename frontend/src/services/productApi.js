import axios from "axios";

const API = axios.create({
  baseURL: "https://medical-equipment-marketplace.onrender.com/api",
});

export default API;
