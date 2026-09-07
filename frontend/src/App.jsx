import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import TrackOrder from "./pages/TrackOrder";

import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import AdminUsers from "./pages/AdminUsers";
import AdminOrders from "./pages/AdminOrders";

function App() {
  return (
    <Routes>
      {/* =========================
          CUSTOMER ROUTES
      ========================= */}
      <Route path="/" element={<Home />} />

      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/profile" element={<Profile />} />

      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-success" element={<OrderSuccess />} />

      <Route path="/orders" element={<Orders />} />

      {/* IMPORTANT:
          /orders/:id = FULL ORDER DETAILS
      */}
      <Route path="/orders/:id" element={<OrderDetails />} />

      {/* IMPORTANT:
          /orders/:id/track = ORDER TRACKING
      */}
      <Route path="/orders/:id/track" element={<TrackOrder />} />

      {/* =========================
          ADMIN ROUTES
      ========================= */}
      <Route path="/admin" element={<AdminDashboard />} />

      <Route path="/admin/products" element={<AdminProducts />} />

      <Route path="/admin/add-product" element={<AddProduct />} />

      <Route
        path="/admin/edit-product/:id"
        element={<EditProduct />}
      />

      <Route path="/admin/users" element={<AdminUsers />} />

      <Route path="/admin/orders" element={<AdminOrders />} />

      {/* =========================
          FALLBACK
      ========================= */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
