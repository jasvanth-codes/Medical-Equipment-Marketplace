export const placeOrder = (product) => {

  const orders =
    JSON.parse(localStorage.getItem("orders")) || [];

  orders.push(product);

  localStorage.setItem(
    "orders",
    JSON.stringify(orders)
  );

  localStorage.removeItem("cart");

  alert("Order Placed Successfully");
};

export const getOrders = () => {
  return JSON.parse(localStorage.getItem("orders")) || [];
};