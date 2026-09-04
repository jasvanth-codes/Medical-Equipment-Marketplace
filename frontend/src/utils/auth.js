export const loginUser = (user, token) => {

  localStorage.setItem("user", JSON.stringify(user));

  localStorage.setItem("token", token);

};

export const logoutUser = () => {

  localStorage.removeItem("user");

  localStorage.removeItem("token");

};

export const getCurrentUser = () => {

  return JSON.parse(localStorage.getItem("user"));

};

export const isLoggedIn = () => {

  return !!localStorage.getItem("token");

};