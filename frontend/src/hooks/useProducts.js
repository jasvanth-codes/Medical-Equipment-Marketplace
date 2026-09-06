import { useEffect, useState } from "react";
import axios from "axios";

function useProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://medical-equipment-marketplace.onrender.com/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return products;
}

export default useProducts;
