import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
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

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import AdminUsers from "./pages/AdminUsers";
import AdminOrders from "./pages/AdminOrders";

function App() {
  return (
    <Routes>

      {/* ================= CUSTOMER ================= */}

      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* All Products */}
      <Route path="/products" element={<Products />} />

      {/* Product Details */}
      <Route
        path="/products/:id"
        element={<ProductDetails />}
      />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />
      <Route
        path="/reset-password/:token"
        element={<ResetPassword />}
      />

      {/* Shopping */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />

      {/* User */}
      <Route path="/profile" element={<Profile />} />

      {/* Checkout */}
      <Route path="/checkout" element={<Checkout />} />

      {/* Orders */}
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/orders" element={<Orders />} />
      <Route
        path="/orders/:id"
        element={<OrderDetails />}
      />
      <Route
        path="/orders/:id/track"
        element={<TrackOrder />}
      />

      {/* ================= ADMIN ================= */}

      <Route
        path="/admin"
        element={<AdminDashboard />}
      />

      <Route
        path="/admin/products"
        element={<AdminProducts />}
      />

      <Route
        path="/admin/add-product"
        element={<AddProduct />}
      />

      <Route
        path="/admin/edit-product/:id"
        element={<EditProduct />}
      />

      <Route
        path="/admin/users"
        element={<AdminUsers />}
      />

      <Route
        path="/admin/orders"
        element={<AdminOrders />}
      />

      {/* ================= INVALID URL ================= */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}

export default App;