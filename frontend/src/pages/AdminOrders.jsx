import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaBoxOpen,
  FaShoppingBag,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaSync,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaRupeeSign,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import API from "../utils/api";

import "./AdminOrders.css";

function AdminOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState("");

  // ==========================================
  // FETCH ALL ORDERS
  // ==========================================

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const response = await API.get("/orders");

      console.log("ADMIN ORDERS RESPONSE:", response.data);

      if (Array.isArray(response.data)) {
        setOrders(response.data);
      } else if (Array.isArray(response.data.orders)) {
        setOrders(response.data.orders);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error(
        "FETCH ADMIN ORDERS ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to fetch orders"
      );

      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD ORDERS
  // ==========================================

  useEffect(() => {
    fetchOrders();
  }, []);

  // ==========================================
  // UPDATE ORDER STATUS
  // ==========================================

  const handleStatusChange = async (mongoId, newStatus) => {
    try {
      setUpdatingOrderId(mongoId);

      const response = await API.put(
        `/orders/${mongoId}/status`,
        {
          status: newStatus,
        }
      );

      console.log(
        "UPDATE STATUS RESPONSE:",
        response.data
      );

      const updatedOrder =
        response.data.order || response.data;

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order._id === mongoId
            ? updatedOrder
            : order
        )
      );

      alert(
        `Order status updated to ${newStatus}`
      );
    } catch (error) {
      console.error(
        "UPDATE STATUS ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to update order status"
      );
    } finally {
      setUpdatingOrderId("");
    }
  };

  // ==========================================
  // STATUS ICON
  // ==========================================

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <FaCheckCircle />;

      case "Cancelled":
        return <FaTimesCircle />;

      case "Shipped":
      case "Out for Delivery":
        return <FaTruck />;

      case "Processing":
        return <FaBoxOpen />;

      default:
        return <FaClock />;
    }
  };

  // ==========================================
  // STATUS CLASS
  // ==========================================

  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered":
        return "status-delivered";

      case "Cancelled":
        return "status-cancelled";

      case "Shipped":
      case "Out for Delivery":
        return "status-shipped";

      case "Processing":
        return "status-processing";

      default:
        return "status-confirmed";
    }
  };

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) {
      return "Date not available";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ==========================================
  // GET CUSTOMER NAME
  // ==========================================

  const getCustomerName = (order) => {
    return (
      order.customer?.fullName ||
      order.customer?.name ||
      order.user?.name ||
      order.userName ||
      "Customer"
    );
  };

  // ==========================================
  // GET CUSTOMER EMAIL
  // ==========================================

  const getCustomerEmail = (order) => {
    return (
      order.customer?.email ||
      order.user?.email ||
      order.email ||
      "Email not available"
    );
  };

  // ==========================================
  // GET CUSTOMER PHONE
  // ==========================================

  const getCustomerPhone = (order) => {
    return (
      order.customer?.phone ||
      order.customer?.mobile ||
      order.phone ||
      "Phone not available"
    );
  };

  // ==========================================
  // GET ADDRESS
  // ==========================================

  const getCustomerAddress = (order) => {
    const address = order.customer?.address;

    if (typeof address === "string") {
      return address;
    }

    if (address && typeof address === "object") {
      return [
        address.address,
        address.city,
        address.state,
        address.pincode,
      ]
        .filter(Boolean)
        .join(", ");
    }

    return (
      order.shippingAddress ||
      "Address not available"
    );
  };

  // ==========================================
  // GET ITEM COUNT
  // ==========================================

  const getItemCount = (order) => {
    return (order.items || []).reduce(
      (total, item) =>
        total + Number(item.quantity || 1),
      0
    );
  };

  // ==========================================
  // VIEW ORDER
  // ==========================================

  const handleViewOrder = (order) => {
    if (!order._id) {
      return;
    }

    navigate(`/orders/${order._id}`);
  };

  // ==========================================
  // REFRESH
  // ==========================================

  const handleRefresh = () => {
    fetchOrders();
  };

  return (
    <>
      <Navbar />

      <main className="admin-orders-page">
        <div className="admin-orders-container">

          {/* =================================
              BACK
          ================================= */}

          <button
            type="button"
            className="admin-orders-back"
            onClick={() => navigate("/admin")}
          >
            <FaArrowLeft />
            Back to Dashboard
          </button>

          {/* =================================
              HEADER
          ================================= */}

          <div className="admin-orders-header">
            <div>
              <span className="admin-orders-label">
                ADMIN PANEL
              </span>

              <h1>Manage Orders</h1>

              <p>
                View customers who ordered your
                medical equipment and manage
                their orders.
              </p>
            </div>

            <div className="admin-orders-header-right">

              <button
                type="button"
                className="refresh-orders-btn"
                onClick={handleRefresh}
                disabled={loading}
              >
                <FaSync />
                Refresh
              </button>

              <div className="admin-orders-count">
                <FaShoppingBag />

                <div>
                  <strong>
                    {orders.length}
                  </strong>

                  <span>
                    Total Orders
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* =================================
              LOADING
          ================================= */}

          {loading && (
            <div className="admin-orders-empty">

              <FaSync className="loading-icon" />

              <h2>
                Loading Orders...
              </h2>

              <p>
                Please wait while we fetch
                customer orders.
              </p>

            </div>
          )}

          {/* =================================
              NO ORDERS
          ================================= */}

          {!loading &&
            orders.length === 0 && (
              <div className="admin-orders-empty">

                <FaBoxOpen />

                <h2>
                  No Orders Yet
                </h2>

                <p>
                  When customers purchase your
                  products, their orders will
                  appear here.
                </p>

              </div>
            )}

          {/* =================================
              ORDERS
          ================================= */}

          {!loading &&
            orders.length > 0 && (

              <div className="admin-orders-list">

                {orders.map((order) => {

                  const status =
                    order.status ||
                    "Confirmed";

                  const customerName =
                    getCustomerName(order);

                  const customerEmail =
                    getCustomerEmail(order);

                  const customerPhone =
                    getCustomerPhone(order);

                  const customerAddress =
                    getCustomerAddress(order);

                  const itemCount =
                    getItemCount(order);

                  return (
                    <article
                      className="admin-order-card"
                      key={order._id}
                    >

                      {/* =========================
                          ORDER HEADER
                      ========================= */}

                      <div className="admin-order-top">

                        <div>

                          <span className="admin-order-label">
                            ORDER ID
                          </span>

                          <h2>
                            {order.orderId ||
                              order._id}
                          </h2>

                          <p>
                            Ordered on{" "}
                            <strong>
                              {formatDate(
                                order.createdAt
                              )}
                            </strong>
                          </p>

                        </div>

                        <div
                          className={`admin-status ${getStatusClass(
                            status
                          )}`}
                        >
                          {getStatusIcon(status)}

                          <span>
                            {status}
                          </span>
                        </div>

                      </div>

                      {/* =========================
                          CUSTOMER DETAILS
                      ========================= */}

                      <div className="admin-customer-section">

                        <h3>
                          <FaUser />
                          Customer Details
                        </h3>

                        <div className="admin-customer-grid">

                          <div className="customer-detail">

                            <FaUser />

                            <div>
                              <span>
                                Customer Name
                              </span>

                              <strong>
                                {customerName}
                              </strong>
                            </div>

                          </div>

                          <div className="customer-detail">

                            <FaEnvelope />

                            <div>
                              <span>
                                Email
                              </span>

                              <strong>
                                {customerEmail}
                              </strong>
                            </div>

                          </div>

                          <div className="customer-detail">

                            <FaPhone />

                            <div>
                              <span>
                                Phone
                              </span>

                              <strong>
                                {customerPhone}
                              </strong>
                            </div>

                          </div>

                          <div className="customer-detail">

                            <FaMapMarkerAlt />

                            <div>
                              <span>
                                Delivery Address
                              </span>

                              <strong>
                                {customerAddress}
                              </strong>
                            </div>

                          </div>

                        </div>

                      </div>

                      {/* =========================
                          PRODUCTS ORDERED
                      ========================= */}

                      <div className="admin-ordered-products">

                        <h3>
                          <FaShoppingBag />
                          Products Ordered
                        </h3>

                        {(order.items || []).map(
                          (item, index) => (

                            <div
                              className="admin-ordered-product"
                              key={
                                item._id ||
                                item.product?._id ||
                                index
                              }
                            >

                              <div className="ordered-product-image">

                                {item.image ||
                                item.product?.image ? (
                                  <img
                                    src={
                                      item.image ||
                                      item.product
                                        ?.image
                                    }
                                    alt={
                                      item.name ||
                                      item.product
                                        ?.name ||
                                      "Product"
                                    }
                                  />
                                ) : (
                                  <FaBoxOpen />
                                )}

                              </div>

                              <div className="ordered-product-info">

                                <strong>
                                  {item.name ||
                                    item.product
                                      ?.name ||
                                    "Medical Equipment"}
                                </strong>

                                <span>
                                  Quantity:{" "}
                                  {item.quantity ||
                                    1}
                                </span>

                                <span>
                                  Price:{" "}
                                  <FaRupeeSign />
                                  {Number(
                                    item.price ||
                                      item.product
                                        ?.price ||
                                      0
                                  ).toLocaleString(
                                    "en-IN"
                                  )}
                                </span>

                              </div>

                              <div className="ordered-product-total">

                                <span>
                                  Item Total
                                </span>

                                <strong>
                                  <FaRupeeSign />
                                  {Number(
                                    item.price ||
                                      item.product
                                        ?.price ||
                                      0
                                  ) *
                                    Number(
                                      item.quantity ||
                                        1
                                    )}
                                </strong>

                              </div>

                            </div>

                          )
                        )}

                      </div>

                      {/* =========================
                          ORDER SUMMARY
                      ========================= */}

                      <div className="admin-order-info">

                        <div>

                          <span>
                            Total Items
                          </span>

                          <strong>
                            {itemCount}
                          </strong>

                        </div>

                        <div>

                          <span>
                            Total Amount
                          </span>

                          <strong>
                            <FaRupeeSign />
                            {Number(
                              order.total || 0
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </strong>

                        </div>

                        <div>

                          <span>
                            Payment
                          </span>

                          <strong>
                            {order.paymentMethod ||
                              "Cash on Delivery"}
                          </strong>

                        </div>

                      </div>

                      {/* =========================
                          ACTIONS
                      ========================= */}

                      <div className="admin-order-actions">

                        <div className="status-select-box">

                          <label>
                            Update Order Status
                          </label>

                          <select
                            value={status}
                            onChange={(event) =>
                              handleStatusChange(
                                order._id,
                                event.target.value
                              )
                            }
                            disabled={
                              status ===
                                "Cancelled" ||
                              updatingOrderId ===
                                order._id
                            }
                          >

                            <option value="Confirmed">
                              Confirmed
                            </option>

                            <option value="Processing">
                              Processing
                            </option>

                            <option value="Shipped">
                              Shipped
                            </option>

                            <option value="Out for Delivery">
                              Out for Delivery
                            </option>

                            <option value="Delivered">
                              Delivered
                            </option>

                            <option value="Cancelled">
                              Cancelled
                            </option>

                          </select>

                        </div>

                        <button
                          type="button"
                          className="admin-view-order-btn"
                          onClick={() =>
                            handleViewOrder(order)
                          }
                        >
                          View Full Order
                        </button>

                      </div>

                    </article>
                  );
                })}

              </div>
            )}

        </div>
      </main>

      <Footer />
    </>
  );
}

export default AdminOrders;