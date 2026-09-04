const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Order = require("../models/Order");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

/*
==================================================
CREATE ORDER
POST /api/orders
LOGGED-IN USER
==================================================
*/

router.post("/", protect, async (req, res) => {
  try {
    const {
      orderId,
      customer,
      paymentMethod,
      items,
      subtotal,
      delivery,
      total,
    } = req.body;

    // User ID comes from JWT, NOT frontend
    const userId = req.user.id;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }

    if (!customer) {
      return res.status(400).json({
        success: false,
        message: "Customer information is required",
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order items are required",
      });
    }

    const order = new Order({
      userId,
      orderId,
      customer,
      paymentMethod: paymentMethod || "Cash on Delivery",
      items,
      subtotal: Number(subtotal || 0),
      delivery: Number(delivery || 0),
      total: Number(total || 0),
      status: "Confirmed",
    });

    const savedOrder = await order.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to create order",
    });
  }
});


/*
==================================================
GET ALL ORDERS
ADMIN ONLY
GET /api/orders
==================================================
*/

router.get("/", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("GET ALL ORDERS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
});


/*
==================================================
GET ORDERS FOR ONE USER
GET /api/orders/user/:userId

USER CAN ONLY VIEW THEIR OWN ORDERS
ADMIN CAN VIEW ANY USER'S ORDERS
==================================================
*/

router.get("/user/:userId", protect, async (req, res) => {
  try {
    const requestedUserId = req.params.userId;
    const loggedInUserId = req.user.id;

    // Validate MongoDB IDs
    if (!mongoose.Types.ObjectId.isValid(requestedUserId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    // Normal user cannot request another user's orders
    if (
      req.user.role !== "admin" &&
      requestedUserId !== loggedInUserId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only access your own orders",
      });
    }

    const orders = await Order.find({
      userId: requestedUserId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("GET USER ORDERS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch user orders",
      error: error.message,
    });
  }
});


/*
==================================================
GET SINGLE ORDER
BY ORDER ID
GET /api/orders/order/:orderId

USER CAN ONLY VIEW THEIR OWN ORDER
ADMIN CAN VIEW ANY ORDER
==================================================
*/

router.get("/order/:orderId", protect, async (req, res) => {
  try {
    const order = await Order.findOne({
      orderId: req.params.orderId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check ownership
    if (
      req.user.role !== "admin" &&
      order.userId.toString() !== req.user.id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this order",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("GET ORDER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
});


/*
==================================================
GET SINGLE ORDER
BY MONGODB ID
GET /api/orders/id/:id

USER CAN ONLY VIEW THEIR OWN ORDER
ADMIN CAN VIEW ANY ORDER
==================================================
*/

router.get("/id/:id", protect, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Order ID",
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check ownership
    if (
      req.user.role !== "admin" &&
      order.userId.toString() !== req.user.id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this order",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("GET ORDER BY ID ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
});


/*
==================================================
UPDATE ORDER STATUS
ADMIN ONLY
PUT /api/orders/:id/status
==================================================
*/

router.put("/:id/status", protect, admin, async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Confirmed",
      "Processing",
      "Shipped",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Order ID",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("UPDATE ORDER STATUS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message,
    });
  }
});


/*
==================================================
CANCEL ORDER
USER CAN CANCEL OWN ORDER
ADMIN CAN CANCEL ANY ORDER
PUT /api/orders/:id/cancel
==================================================
*/

router.put("/:id/cancel", protect, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Order ID",
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Normal user can cancel only their own order
    if (
      req.user.role !== "admin" &&
      order.userId.toString() !== req.user.id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to cancel this order",
      });
    }

    // Do not cancel already delivered orders
    if (order.status === "Delivered") {
      return res.status(400).json({
        success: false,
        message: "Delivered orders cannot be cancelled",
      });
    }

    // Do not cancel already cancelled orders
    if (order.status === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Order is already cancelled",
      });
    }

    order.status = "Cancelled";

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    console.error("CANCEL ORDER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to cancel order",
      error: error.message,
    });
  }
});


module.exports = router;