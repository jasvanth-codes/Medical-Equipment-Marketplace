import API from "../utils/api";

// Create a new order
export const createOrder = async (orderData) => {
  const response = await API.post("/orders", orderData);

  return response.data;
};

// Get all orders of the logged-in user
export const getUserOrders = async (userId) => {
  const response = await API.get(`/orders/user/${userId}`);

  return response.data.orders || [];
};

// Get one order by MongoDB ID
export const getOrderById = async (id) => {
  const response = await API.get(`/orders/id/${id}`);

  return response.data.order;
};

// Get one order by order ID such as MED1788342248426
export const getOrderByOrderId = async (orderId) => {
  const response = await API.get(`/orders/order/${orderId}`);

  return response.data.order;
};

// Cancel an order
export const cancelOrder = async (id) => {
  const response = await API.put(`/orders/${id}/cancel`);

  return response.data.order;
};

export default {
  createOrder,
  getUserOrders,
  getOrderById,
  getOrderByOrderId,
  cancelOrder,
};
