import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaBoxOpen,
  FaSearch,
  FaSyncAlt,
  FaRupeeSign,
  FaShoppingBag,
  FaUser,
  FaCreditCard,
} from "react-icons/fa";

import API from "../../utils/api";
import "./ManageOrders.css";

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const response = await API.get("/orders");

      console.log("ORDERS RESPONSE:", response.data);

      if (Array.isArray(response.data?.orders)) {
        setOrders(response.data.orders);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error(
        "FETCH ORDERS ERROR:",
        error.response?.data || error.message
      );

      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);

      const response = await API.put(
        `/orders/${id}/status`,
        { status }
      );

      console.log(
        "STATUS UPDATE RESPONSE:",
        response.data
      );

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order._id === id
            ? {
                ...order,
                status:
                  response.data?.order?.status || status,
              }
            : order
        )
      );
    } catch (error) {
      console.error(
        "UPDATE ORDER STATUS ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to update order status."
      );
    } finally {
      setUpdatingId("");
    }
  };

  const filteredOrders = orders.filter((order) => {
    const orderId = String(order.orderId || "");
    const customerName = String(
      order.customer?.name ||
        order.customer?.fullName ||
        ""
    );

    const email = String(
      order.customer?.email || ""
    );

    const search = searchTerm.toLowerCase();

    return (
      orderId.toLowerCase().includes(search) ||
      customerName.toLowerCase().includes(search) ||
      email.toLowerCase().includes(search)
    );
  });

  const getStatusClass = (status) => {
    return `status-${String(
      status || "Confirmed"
    )
      .toLowerCase()
      .replaceAll(" ", "-")}`;
  };

  const getItemCount = (items) => {
    if (!Array.isArray(items)) {
      return 0;
    }

    return items.reduce((total, item) => {
      return (
        total +
        Number(
          item.quantity ||
            item.qty ||
            1
        )
      );
    }, 0);
  };

  return (
    <main className="manage-orders-page">
      <div className="manage-orders-container">

        <Link
          to="/admin"
          className="manage-orders-back"
        >
          <FaArrowLeft />
          Back to Dashboard
        </Link>

        <section className="manage-orders-header">

          <div>
            <span className="manage-orders-label">
              ADMIN PANEL
            </span>

            <h1>Manage Orders</h1>

            <p>
              View customer orders and manage
              delivery status.
            </p>
          </div>

          <button
            type="button"
            className="refresh-orders-button"
            onClick={fetchOrders}
            disabled={loading}
          >
            <FaSyncAlt
              className={
                loading
                  ? "refresh-spinning"
                  : ""
              }
            />

            {loading
              ? "Refreshing..."
              : "Refresh Orders"}
          </button>

        </section>

        <section className="orders-summary">

          <div className="orders-summary-card">
            <div className="summary-icon">
              <FaShoppingBag />
            </div>

            <div>
              <span>Total Orders</span>
              <strong>{orders.length}</strong>
            </div>
          </div>

          <div className="orders-summary-card">
            <div className="summary-icon">
              <FaBoxOpen />
            </div>

            <div>
              <span>Processing</span>

              <strong>
                {
                  orders.filter(
                    (order) =>
                      order.status ===
                      "Processing"
                  ).length
                }
              </strong>
            </div>
          </div>

          <div className="orders-summary-card">
            <div className="summary-icon">
              <FaUser />
            </div>

            <div>
              <span>Delivered</span>

              <strong>
                {
                  orders.filter(
                    (order) =>
                      order.status ===
                      "Delivered"
                  ).length
                }
              </strong>
            </div>
          </div>

          <div className="orders-summary-card">
            <div className="summary-icon">
              <FaCreditCard />
            </div>

            <div>
              <span>Active Orders</span>

              <strong>
                {
                  orders.filter(
                    (order) =>
                      order.status !==
                        "Delivered" &&
                      order.status !==
                        "Cancelled"
                  ).length
                }
              </strong>
            </div>
          </div>

        </section>

        <section className="manage-orders-toolbar">

          <div className="orders-count">
            <FaBoxOpen />

            <span>
              Showing{" "}
              <strong>
                {filteredOrders.length}
              </strong>{" "}
              of{" "}
              <strong>{orders.length}</strong>{" "}
              orders
            </span>
          </div>

          <div className="orders-search">

            <FaSearch />

            <input
              type="text"
              placeholder="Search order ID, customer or email..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value
                )
              }
            />

          </div>

        </section>

        {loading ? (

          <section className="orders-empty-state">

            <FaSyncAlt className="loading-icon" />

            <h2>Loading Orders...</h2>

            <p>
              Please wait while orders are loading.
            </p>

          </section>

        ) : filteredOrders.length === 0 ? (

          <section className="orders-empty-state">

            <FaBoxOpen />

            <h2>
              {orders.length === 0
                ? "No Orders Yet"
                : "No Orders Found"}
            </h2>

            <p>
              {orders.length === 0
                ? "Customer orders will appear here."
                : "Try searching with another order ID or customer name."}
            </p>

          </section>

        ) : (

          <section className="orders-table-card">

            <div className="orders-table-header">

              <div>
                <h2>Recent Orders</h2>

                <p>
                  Manage customer orders and
                  update their status.
                </p>
              </div>

            </div>

            <div className="orders-table-wrapper">

              <table className="orders-table">

                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Update</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredOrders.map(
                    (order) => (

                    <tr key={order._id}>

                      <td>
                        <div className="order-id-box">

                          <span className="order-id-icon">
                            <FaShoppingBag />
                          </span>

                          <div>
                            <strong>
                              {order.orderId ||
                                "N/A"}
                            </strong>

                            <small>
                              {order.createdAt
                                ? new Date(
                                    order.createdAt
                                  ).toLocaleDateString(
                                    "en-IN"
                                  )
                                : "Date unavailable"}
                            </small>
                          </div>

                        </div>
                      </td>

                      <td>

                        <div className="customer-info">

                          <div className="customer-avatar">
                            <FaUser />
                          </div>

                          <div>
                            <strong>
                              {order.customer
                                ?.name ||
                                order.customer
                                  ?.fullName ||
                                "Customer"}
                            </strong>

                            <span>
                              {order.customer
                                ?.email ||
                                "No email"}
                            </span>
                          </div>

                        </div>

                      </td>

                      <td>

                        <span className="items-count">
                          <FaBoxOpen />

                          {getItemCount(
                            order.items
                          )}

                          {" "}
                          item
                          {getItemCount(
                            order.items
                          ) !== 1
                            ? "s"
                            : ""}
                        </span>

                      </td>

                      <td>

                        <strong className="order-total">

                          <FaRupeeSign />

                          {Number(
                            order.total || 0
                          ).toLocaleString(
                            "en-IN"
                          )}

                        </strong>

                      </td>

                      <td>

                        <span className="payment-method">
                          {order.paymentMethod ||
                            "Cash on Delivery"}
                        </span>

                      </td>

                      <td>

                        <span
                          className={`order-status ${getStatusClass(
                            order.status
                          )}`}
                        >
                          {order.status ||
                            "Confirmed"}
                        </span>

                      </td>

                      <td>

                        <select
                          className="status-select"
                          value={
                            order.status ||
                            "Confirmed"
                          }
                          disabled={
                            updatingId ===
                            order._id
                          }
                          onChange={(event) =>
                            updateStatus(
                              order._id,
                              event.target
                                .value
                            )
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

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </section>

        )}

      </div>
    </main>
  );
}

export default ManageOrders;
