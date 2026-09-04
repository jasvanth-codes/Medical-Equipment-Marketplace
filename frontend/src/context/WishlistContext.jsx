import { createContext, useEffect, useState } from "react";

export const WishlistContext = createContext();

function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const items =
      JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(items);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  const addWishlist = (product) => {
    const exist = wishlist.find(
      (item) => item._id === product._id
    );

    if (exist) {
      alert("Already in Wishlist");
      return;
    }

    setWishlist([...wishlist, product]);
  };

  const removeWishlist = (id) => {
    setWishlist(
      wishlist.filter((item) => item._id !== id)
    );
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addWishlist,
        removeWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;