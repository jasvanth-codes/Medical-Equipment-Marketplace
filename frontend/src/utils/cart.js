export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

export const addToCart = (product) => {
  const cart = getCart();

  const exists = cart.find((item) => item._id === product._id);

  if (exists) {
    alert("Product already exists in cart.");
    return;
  }

  cart.push(product);

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Product Added to Cart");
};

export const removeFromCart = (id) => {
  const cart = getCart().filter((item) => item._id !== id);

  localStorage.setItem("cart", JSON.stringify(cart));
};

export const clearCart = () => {
  localStorage.removeItem("cart");
};