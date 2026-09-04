export const getWishlist = () => {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
};

export const addToWishlist = (product) => {
  const wishlist = getWishlist();

  const exists = wishlist.find((item) => item._id === product._id);

  if (exists) {
    alert("Already in Wishlist");
    return;
  }

  wishlist.push(product);

  localStorage.setItem(
    "wishlist",
    JSON.stringify(wishlist)
  );

  alert("Added to Wishlist");
};

export const removeWishlist = (id) => {
  const wishlist = getWishlist().filter(
    (item) => item._id !== id
  );

  localStorage.setItem(
    "wishlist",
    JSON.stringify(wishlist)
  );
};