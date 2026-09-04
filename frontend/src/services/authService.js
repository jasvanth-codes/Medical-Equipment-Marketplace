import API from "../utils/api";

export const registerUser = async (user) => {
  const res = await API.post("/auth/register", user);
  return res.data;
};

export const loginUser = async (user) => {
  const res = await API.post("/auth/login", user);
  return res.data;
};

export const getProfile = async () => {
  const res = await API.get("/auth/profile");
  return res.data;
};