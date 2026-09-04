const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

// ==========================================
// ADMIN DASHBOARD
// GET /api/admin/dashboard
// ==========================================

const getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalProducts = await Product.countDocuments();

    const totalOrders = await Order.countDocuments();

    const confirmedOrders = await Order.countDocuments({
      status: "Confirmed",
    });

    const processingOrders = await Order.countDocuments({
      status: "Processing",
    });

    const shippedOrders = await Order.countDocuments({
      status: {
        $in: ["Shipped", "Out for Delivery"],
      },
    });

    const deliveredOrders = await Order.countDocuments({
      status: "Delivered",
    });

    const cancelledOrders = await Order.countDocuments({
      status: "Cancelled",
    });

    const salesResult = await Order.aggregate([
      {
        $match: {
          status: {
            $ne: "Cancelled",
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: {
            $sum: "$total",
          },
        },
      },
    ]);

    const totalSales =
      salesResult.length > 0
        ? salesResult[0].totalSales
        : 0;

    const recentOrders = await Order.find()
      .sort({
        createdAt: -1,
      })
      .limit(5)
      .select(
        "orderId customer items total status paymentMethod createdAt"
      );

    res.status(200).json({
      success: true,
      message: "Admin dashboard data fetched successfully",

      statistics: {
        totalUsers,
        totalProducts,
        totalOrders,
        confirmedOrders,
        processingOrders,
        shippedOrders,
        deliveredOrders,
        cancelledOrders,
        totalSales,
      },

      recentOrders,
    });
  } catch (error) {
    console.error("ADMIN DASHBOARD ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch admin dashboard data",
      error: error.message,
    });
  }
};

// ==========================================
// GET ALL USERS
// GET /api/admin/users
// ==========================================

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("GET ALL USERS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

// ==========================================
// EXPORT
// ==========================================

module.exports = {
  getDashboard,
  getAllUsers,
};