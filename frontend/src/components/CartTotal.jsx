import { useEffect, useState } from "react";
import { getCart } from "../services/cartService";

export default function useCart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getCart().then((res) => {
      setCart(res.data);
    });
  }, []);

  return cart;
}